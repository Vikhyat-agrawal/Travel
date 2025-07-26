import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/travelmate"

// Define Community schema and model
const communitySchema = new mongoose.Schema({
  name: String,
  destination: String,
  members: [{ type: String }], // user IDs or wallet addresses
  maxMembers: Number,
  // ...other fields as needed
})
const Community = mongoose.models.Community || mongoose.model("Community", communitySchema)

async function connectDb() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI)
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const communityId = params.id
    const { userId } = await req.json() // userId could be wallet address or user _id

    if (!communityId || !userId) {
      return NextResponse.json({ error: "Missing communityId or userId" }, { status: 400 })
    }

    await connectDb()

    // Add userId to the community's members array (no duplicates)
    const community = await Community.findByIdAndUpdate(
      communityId,
      { $addToSet: { members: userId } },
      { new: true }
    )

    if (!community) {
      return NextResponse.json({ error: "Community not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, communityId, userId })
  } catch (error) {
    return NextResponse.json({ error: "Failed to join community" }, { status: 500 })
  }
}