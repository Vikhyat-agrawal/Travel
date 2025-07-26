import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/travelmate"

// Define Post schema and model
const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  location: { type: String, required: true },
  tags: { type: [String], default: [] },
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
    if (!body.content || !body.location) {
      return NextResponse.json({ error: "Content and location are required." }, { status: 400 })
    }
    await connectDb()
    const newPost = await Post.create({
      content: body.content,
      location: body.location,
      tags: Array.isArray(body.tags)
        ? body.tags
        : typeof body.tags === "string" && body.tags.length > 0
        ? body.tags.split(",").map((t: string) => t.trim())
        : [],
    })
    return NextResponse.json({ success: true, post: newPost }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post." }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDb()
    const posts = await Post.find().sort({ createdAt: -1 })
    return NextResponse.json({ posts })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts." }, { status: 500 })
  }
}