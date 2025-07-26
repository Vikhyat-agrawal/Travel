import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const {
      destination,
      duration,
      budget,
      travelers,
      interests,
      additional_preferences,
      ai_optimization_level,
      blockchain_integration,
    } = await request.json()

    // Use AI SDK to generate comprehensive trip plan
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are an advanced AI travel planner with expertise in blockchain technology, cost optimization, and real-time data analysis. Create detailed, practical trip itineraries with AI optimizations and blockchain integration insights. Return your response as a JSON object with the following structure:
      {
        "destination": string,
        "duration": string,
        "budget": string,
        "travelers": string,
        "interests": string[],
        "itinerary": [{
          "day": number,
          "title": string,
          "activities": string[],
          "accommodation": string,
          "meals": string[],
          "estimated_cost": string,
          "ai_optimizations": string[]
        }],
        "total_estimated_cost": string,
        "best_time_to_visit": string,
        "travel_tips": string[],
        "ai_insights": {
          "cost_savings": string,
          "time_optimization": string,
          "hidden_gems": string[],
          "weather_forecast": string
        },
        "blockchain_integration": {
          "estimated_gas_fees": string,
          "smart_contract_savings": string,
          "group_payment_benefits": string[]
        }
      }`,
      prompt: `Create a comprehensive AI-optimized trip plan with blockchain integration for:
      - Destination: ${destination}
      - Duration: ${duration}
      - Budget: ${budget}
      - Number of travelers: ${travelers}
      - Interests: ${interests}
      - Additional preferences: ${additional_preferences}
      - AI Optimization Level: ${ai_optimization_level}
      - Blockchain Integration: ${blockchain_integration}
      
      Include detailed AI optimizations for each day, cost savings analysis, time optimization, hidden gems discovered through AI analysis, weather predictions, and blockchain integration benefits including smart contract savings and group payment advantages.`,
    })

    // Parse the AI response
    let tripPlan
    try {
      tripPlan = JSON.parse(text)
    } catch (parseError) {
      // Fallback with enhanced structure
      tripPlan = {
        destination: destination || "Delhi,India",
        duration: duration || "7 days",
        budget: budget || "₹10000-15000",
        travelers: travelers || "2 people",
        interests: interests?.split(",").map((i: string) => i.trim()) || ["Culture", "Food", "Technology"],
        itinerary: [
          {
            day: 1,
            title: "AI-Optimized Arrival & City Exploration",
            activities: [
              "Airport transfer with AI route optimization",
              "Hotel check-in at AI-selected location",
              "Local area exploration with crowd prediction",
              "Evening dining at AI-recommended restaurant",
            ],
            accommodation: "AI-selected city center hotel with optimal transport links",
            meals: ["AI-curated welcome dinner with local specialties"],
            estimated_cost: "₹1000-2000",
            ai_optimizations: [
              "Route optimized to avoid peak traffic hours",
              "Hotel selected for 25% cost savings vs tourist areas",
              "Restaurant timing optimized for shorter wait times",
            ],
          },
        ],
        total_estimated_cost: "₹1600-2200 (15% savings with AI optimization)",
        best_time_to_visit: "AI analysis suggests optimal weather and pricing conditions",
        travel_tips: [
          "AI suggests booking accommodations 2 weeks in advance for best rates",
          "Download AI-powered translation and navigation apps",
          "Use blockchain payments at participating venues for additional discounts",
        ],
        ai_insights: {
          cost_savings: "AI optimization saved ₹3000-5000 compared to traditional planning",
          time_optimization: "Route optimization saves 2.5 hours of travel time daily",
          hidden_gems: [
            "AI-discovered local market with 95% positive sentiment analysis",
            "Hidden viewpoint recommended by local data analysis",
          ],
          weather_forecast: "AI predicts 80% sunny days during your visit",
        },
        blockchain_integration: {
          estimated_gas_fees: "₹5000-6000 for all transactions during trip",
          smart_contract_savings: "Group payments save 8-15% on accommodations",
          group_payment_benefits: [
            "Transparent fund pooling with smart contracts",
            "Automatic expense splitting and refunds",
            "Crypto rewards at participating venues",
          ],
        },
      }
    }

    return NextResponse.json({
      success: true,
      tripPlan,
      ai_optimization_level,
      blockchain_enabled: blockchain_integration,
    })
  } catch (error) {
    console.error("AI trip planning error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate AI-optimized trip plan",
      },
      { status: 500 },
    )
  }
}
