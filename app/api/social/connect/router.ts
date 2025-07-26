import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/travelmate"

// Define Connection schema and model
const connectionSchema = new mongoose.Schema({
  travelerId: { type: String, required: true },
  userId: String, // Optionally add userId if you have authentication
  connectedAt: { type: Date, default: Date.now },
})
const Connection = mongoose.models.Connection || mongoose.model("Connection", connectionSchema)

async function connectDb() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.travelerId) {
      return NextResponse.json({ error: "Traveler ID is required." }, { status: 400 })
    }
    await connectDb()
    const newConnection = await Connection.create({
      travelerId: body.travelerId,
      userId: body.userId || undefined, // Optionally add userId
      connectedAt: new Date(),
    })
    return NextResponse.json({ success: true, connection: newConnection }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to connect with traveler." }, { status: 500 })
  }
}