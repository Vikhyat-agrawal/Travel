import { type NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import { ethers } from "ethers"

import CommunityFactoryABI from "../../../../CommunityFactory.json"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/travelmate"
const COMMUNITY_CONTRACT_ADDRESS = process.env.COMMUNITY_CONTRACT_ADDRESS

// Community schema
const communitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  destination: String,
  type: String,
  maxMembers: Number,
  description: String,
  members: { type: Number, default: 1 },
  pooledFunds: { type: String, default: "0 ETH" },
  communityId: { type: String, required: true },
  admin: String,
  contractAddress: String,
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  tags: [String],
  chatRoomId: String,
  aiSettings: Object,
})
const Community = mongoose.models.Community || mongoose.model("Community", communitySchema)

async function connectDb() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI)
  }
}

/**
 * Interacts with your deployed smart contract to create a new community.
 * This function assumes you have a single contract that manages all communities.
 * @param communityName The name of the new community.
 * @param targetAmount The target funding amount for the community.
 * @returns The ID of the newly created community.
 */
async function createCommunityInContract(communityName: string, targetAmount: number): Promise<string> {
  if (!process.env.RPC_URL || !process.env.PRIVATE_KEY || !COMMUNITY_CONTRACT_ADDRESS) {
    throw new Error("Server environment is not configured for blockchain interaction.")
  }

  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

  const communityContract = new ethers.Contract(COMMUNITY_CONTRACT_ADDRESS, CommunityFactoryABI.abi, signer)

  console.log(`Calling createCommunity for "${communityName}"...`)
  const tx = await communityContract.createCommunity(communityName, targetAmount)

  const receipt = await tx.wait()
  console.log("Transaction mined:", receipt.hash)

  // Find the event log to get the new community's ID.
  // This assumes your contract emits an event like:
  // event CommunityCreated(uint256 indexed communityId, string name, address admin);
  for (const log of receipt.logs ?? []) {
    try {
      const parsedLog = communityContract.interface.parseLog(log)
      if (parsedLog?.name === "CommunityCreated") {
        return parsedLog.args.communityId.toString()
      }
    } catch (e) {
      // Not a log from this contract, ignore.
    }
  }

  throw new Error("Could not find CommunityCreated event in transaction receipt.")
}

// Mock function for chat room creation
async function createChatRoom(communityName: string) {
  // In a real app, integrate with your chat service (e.g., Socket.io, Stream, Firebase)
  return `chat_${communityName.toLowerCase().replace(/\s+/g, "_")}_${Date.now()}`
}

// Mock function for AI settings initialization
async function initializeAISettings(communityType: string) {
  // In a real app, set up AI features (e.g., GPT prompts, recommendations, moderation)
  return {
    enabled: true,
    mode: communityType === "ai-optimized" ? "advanced" : "basic",
    welcomeMessage: "Welcome to your AI-powered travel community!",
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // IMPORTANT: You must get the admin's wallet address from their authenticated session.
    const { name, destination, type, maxMembers, description, adminAddress } = body

    // 1. Create the community on the blockchain via your main smart contract
    const newCommunityId = await createCommunityInContract(name, Number.parseInt(maxMembers))

    // 2. Connect to DB
    await connectDb()

    // 3. Set up real-time chat room
    const chatRoomId = await createChatRoom(name)

    // 4. Initialize AI optimization settings
    const aiSettings = await initializeAISettings(type)

    // 5. Save community data to MongoDB
    const tags =
      type === "blockchain"
        ? ["Crypto", "Smart Contracts"]
        : type === "special"
        ? ["Verified", "Safe"]
        : ["AI-Optimized", "Tech-Enabled"]

    const newCommunity = await Community.create({
      name,
      destination,
      type,
      maxMembers: Number.parseInt(maxMembers),
      description,
      admin: adminAddress,
      contractAddress: COMMUNITY_CONTRACT_ADDRESS, // The address of the main contract
      communityId: newCommunityId,
      tags,
      chatRoomId,
      aiSettings,
    })

    return NextResponse.json({
      success: true,
      community: newCommunity,
      contractAddress: COMMUNITY_CONTRACT_ADDRESS,
      communityId: newCommunityId,
      chatRoomId,
      aiSettings,
      message: "Community created successfully with smart contract, chat room, and AI settings",
    })
  } catch (error: any) {
    console.error("Failed to create community:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create community",
      },
      { status: 500 }
    )
  }
}
