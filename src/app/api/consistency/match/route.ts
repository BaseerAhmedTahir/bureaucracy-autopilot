import { NextRequest, NextResponse } from "next/server"
import { openai } from "@/lib/openai"
import { z } from "zod"
import { zodResponseFormat } from "openai/helpers/zod"

// Schema for the matching result
const MatchResultSchema = z.object({
    matches: z.array(z.object({
        requirementId: z.string(),
        factId: z.string().nullable().describe("The ID of the matching profile fact, or null if no match found"),
        status: z.enum(["MATCHED", "MISSING", "AMBIGUOUS"]).describe("The status of the match"),
        confidence: z.number().describe("Confidence score 0-1"),
        reasoning: z.string().optional().describe("Why this fact was chosen or why it is missing")
    }))
})

export async function POST(req: NextRequest) {
    try {
        const { requirements, facts } = await req.json()

        if (!requirements || !facts) {
            return NextResponse.json({ error: "Missing requirements or facts" }, { status: 400 })
        }

        // We can use a heuristic first (exact string match on keys), 
        // but the LLM is powerful for semantic matching (e.g. "CV" matches "Resume")

        const completion = await openai.beta.chat.completions.parse({
            model: "gpt-4o-2024-08-06",
            messages: [
                { role: "system", content: "You are a consistency engine. Match application requirements to user profile facts. Account for synonyms (e.g. 'DOB' = 'Date of Birth')." },
                { role: "user", content: `Requirements: ${JSON.stringify(requirements)}\n\nUser Facts: ${JSON.stringify(facts)}` },
            ],
            response_format: zodResponseFormat(MatchResultSchema, "matches"),
        })

        const result = completion.choices[0].message.parsed

        return NextResponse.json(result)
    } catch (error) {
        console.error("Matching Error:", error)
        return NextResponse.json({ error: "Failed to match requirements" }, { status: 500 })
    }
}
