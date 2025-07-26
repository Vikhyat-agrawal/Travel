import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/travelmate"

// Define Community schema and model (should match your create endpoint)
const communitySchema = new mongoose.Schema({
  name: String,
  destination: String,
  type: String,
  maxMembers: Number,
  description: String,
  members: { type: Number, default: 1 },
  pooledFunds: { type: String, default: "0 ETH" },
  admin: String,
  contractAddress: String,
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  tags: [String],
  chatRoomId: String,
  aiSettings: Object,
  image: String,
  startDate: String,
})
const Community = mongoose.models.Community || mongoose.model("Community", communitySchema)

async function connectDb() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI)
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDb()
    const communities = await Community.find().sort({ createdAt: -1 })
    return NextResponse.json({ communities })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch communities." }, { status: 500 })
  }
}