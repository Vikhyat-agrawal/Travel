import { type NextRequest, NextResponse } from "next/server"

/**
 * Accepts a JSON body:
 * {
 *   "campaignId": string,
 *   "amount": number | string,
 *   "paymentMethod": "card" | "crypto" | "bank",
 *   "anonymous": boolean
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const { campaignId, amount, paymentMethod, anonymous = false } = await request.json()

    // Basic validation
    if (!campaignId || !amount || !paymentMethod) {
      return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 })
    }

    // Simulate donation processing (replace with real payment logic)
    const donation = {
      id: Date.now(), // mock ID
      campaignId,
      amount: Number.parseFloat(amount),
      paymentMethod,
      anonymous,
      status: "completed",
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ success: true, donation })
  } catch (error) {
    console.error("Donation error:", error)
    return NextResponse.json({ success: false, error: "Donation failed." }, { status: 500 })
  }
}
