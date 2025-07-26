import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get("address")
    const communityId = searchParams.get("communityId")

    // Mock transaction history
    const transactions = [
      {
        id: 1,
        hash: "0x742d35Cc6634C0532925a3b8D404d3aABe5475",
        type: "deposit",
        amount: 2.5,
        currency: "ETH",
        status: "confirmed",
        communityId: 1,
        communityName: "Crypto Nomads Asia",
        gasUsed: "21000",
        gasFee: "0.002",
        blockNumber: 15234567,
        timestamp: "2025-08-15T10:30:00Z",
        description: "Community fund contribution",
      },
      {
        id: 2,
        hash: "0x8f3CF7ad23Cd3CaDbD9735AFf958023239c6A",
        type: "payment",
        amount: 0.8,
        currency: "ETH",
        status: "confirmed",
        communityId: 1,
        communityName: "Crypto Nomads Asia",
        gasUsed: "45000",
        gasFee: "0.003",
        blockNumber: 15234890,
        timestamp: "2025-08-18T14:22:00Z",
        description: "Hotel booking payment",
      },
      {
        id: 3,
        hash: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        type: "refund",
        amount: 0.2,
        currency: "ETH",
        status: "pending",
        communityId: 2,
        communityName: "Women-Only Europe",
        gasUsed: "21000",
        gasFee: "0.002",
        blockNumber: null,
        timestamp: "2025-08-20T09:15:00Z",
        description: "Cancelled activity refund",
      },
    ]

    // Filter by community if specified
    const filteredTransactions = communityId
      ? transactions.filter((tx) => tx.communityId === Number.parseInt(communityId))
      : transactions

    return NextResponse.json({
      success: true,
      transactions: filteredTransactions,
      totalValue: filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0),
      totalGasFees: filteredTransactions.reduce((sum, tx) => sum + Number.parseFloat(tx.gasFee), 0),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch transactions",
      },
      { status: 500 },
    )
  }
}
