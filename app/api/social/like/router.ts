import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/travelmate"

// Define Post schema and model
const postSchema = new mongoose.Schema({
  content: String,
  location: String,
  tags: [String],
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})
const Post = mongoose.models.Post || mongoose.model("Post", postSchema)

async function connectDb() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.storyId) {
      return NextResponse.json({ error: "Story ID is required." }, { status: 400 })
    }
    await connectDb()
    const updated = await Post.findByIdAndUpdate(
      body.storyId,
      { $inc: { likes: 1 } },
      { new: true }
    )
    if (!updated) {
      return NextResponse.json({ error: "Story not found." }, { status: 404 })
    }
    return NextResponse.json({ success: true, storyId: body.storyId })
  } catch (error) {
    return NextResponse.json({ error: "Failed to like story." }, { status: 500 })
  }
}