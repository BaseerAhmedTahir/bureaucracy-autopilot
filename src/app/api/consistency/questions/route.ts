import { NextRequest, NextResponse } from "next/server"
import { openai } from "@/lib/openai"
import { z } from "zod"
import { zodResponseFormat } from "openai/helpers/zod"

const QuestionSchema = z.object({
    questions: z.array(z.object({
        requirementId: z.string(),
        questionText: z.string().describe("A natural language question to ask the user"),
        context: z.string().optional().describe("Why we need this info"),
        suggestedInputType: z.enum(["text", "date", "file", "selection"]).describe("How the user should answer")
    }))
})

export async function POST(req: NextRequest) {
    try {
        const { missingRequirements, applicationContext } = await req.json()

        if (!missingRequirements) {
            return NextResponse.json({ error: "No missing requirements provided" }, { status: 400 })
        }

        const completion = await openai.beta.chat.completions.parse({
            model: "gpt-4o-2024-08-06",
            messages: [
                { role: "system", content: "You are a helpful assistant. Generate polite, concise questions to ask the user for missing application information." },
                { role: "user", content: `Missing Items: ${JSON.stringify(missingRequirements)}\n\nApplication Context: ${JSON.stringify(applicationContext)}` },
            ],
            response_format: zodResponseFormat(QuestionSchema, "questions"),
        })

        const result = completion.choices[0].message.parsed

        return NextResponse.json(result)
    } catch (error) {
        console.error("Question Generation Error:", error)
        return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 })
    }
}
