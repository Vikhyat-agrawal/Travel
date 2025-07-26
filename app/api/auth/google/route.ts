import { type NextRequest, NextResponse } from "next/server"
import { OAuth2Client } from "google-auth-library"
import mongoose from "mongoose"

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/travelmate"

const client = new OAuth2Client(GOOGLE_CLIENT_ID)

// Define User schema and model
const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: String,
  name: String,
  avatar: String,
  createdAt: { type: Date, default: Date.now },
})
const User = mongoose.models.User || mongoose.model("User", userSchema)

async function connectDb() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json()
    if (!idToken) {
      return NextResponse.json({ success: false, error: "Missing Google ID token" }, { status: 400 })
    }

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    })
    const payload = ticket.getPayload()
    if (!payload) {
      return NextResponse.json({ success: false, error: "Invalid Google token" }, { status: 401 })
    }

    await connectDb()

    // Save or update user in MongoDB using Mongoose
    const userData = {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      avatar: payload.picture,
      createdAt: new Date(),
    }
    const user = await User.findOneAndUpdate(
      { googleId: payload.sub },
      { $set: userData },
      { upsert: true, new: true }
    )

    // You can generate a JWT here if needed for your app
    return NextResponse.json({
      success: true,
      user,
      token: idToken, // Replace with your JWT if you generate one
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 500 })
  }
} 