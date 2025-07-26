import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { destination, duration, budget, travelers, interests, additional_preferences } = await request.json()

    // Use AI SDK to generate trip plan
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system:
        'You are a professional travel planner. Create detailed, practical trip itineraries based on user preferences. Return your response as a JSON object with the following structure: { "destination": string, "duration": string, "budget": string, "travelers": string, "interests": string[], "itinerary": [{"day": number, "title": string, "activities": string[], "accommodation": string, "meals": string[], "estimated_cost": string}], "total_estimated_cost": string, "best_time_to_visit": string, "travel_tips": string[] }',
      prompt: `Create a detailed trip plan for:
      - Destination: ${destination}
      - Duration: ${duration}
      - Budget: ${budget}
      - Number of travelers: ${travelers}
      - Interests: ${interests}
      - Additional preferences: ${additional_preferences}
      
      Please provide a comprehensive itinerary with daily activities, accommodation suggestions, meal recommendations, cost estimates, and practical travel tips.`,
    })

    // Parse the AI response
    let tripPlan
    try {
      tripPlan = JSON.parse(text)
    } catch (parseError) {
      // Fallback if AI doesn't return valid JSON
      tripPlan = {
        destination: destination || "Delhi, India",
        duration: duration || "7 days",
        budget: budget || "₹2000-3000",
        travelers: travelers || "2 people",
        interests: interests?.split(",").map((i: string) => i.trim()) || ["Culture", "Food"],
        itinerary: [
          {
            day: 1,
            title: "Arrival & City Exploration",
            activities: ["Airport transfer", "Hotel check-in", "Local area exploration"],
            accommodation: "City center hotel",
            meals: ["Welcome dinner at local restaurant"],
            estimated_cost: "₹1500-2000",
          },
        ],
        total_estimated_cost: "₹4000-5000",
        best_time_to_visit: "Spring or Fall",
        travel_tips: ["Research local customs", "Download translation app", "Carry local currency"],
      }
    }

    return NextResponse.json({
      success: true,
      tripPlan,
    })
  } catch (error) {
    console.error("Trip planning error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate trip plan" }, { status: 500 })
  }
}
