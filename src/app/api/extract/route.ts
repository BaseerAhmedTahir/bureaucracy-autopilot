import { NextRequest, NextResponse } from "next/server"
import { openai } from "@/lib/openai"
import { z } from "zod"
import { zodResponseFormat } from "openai/helpers/zod"

const RequirementSchema = z.object({
    requirements: z.array(z.object({
        fieldKey: z.string().describe("Normalized snake_case key for the requirement, e.g. 'resume', 'official_transcript'"),
        label: z.string().describe("User-facing label"),
        description: z.string().optional().describe("Specific instructions or constraints (e.g. 'PDF only', 'Max 2MB')"),
        dataType: z.enum(["TEXT", "DATE", "BOOLEAN", "FILE", "CHOICE"]).describe("The type of data required"),
        isRequired: z.boolean().describe("Whether this is mandatory"),
    }))
})

export async function POST(req: NextRequest) {
    try {
        const { text } = await req.json()

        if (!text) {
            return NextResponse.json({ error: "No text provided" }, { status: 400 })
        }

        const completion = await openai.beta.chat.completions.parse({
            model: "gpt-4o-2024-08-06",
            messages: [
                { role: "system", content: "You are an expert at analyzing bureaucracy. Extract a structured list of application requirements from the provided text. Focus on documents, form fields, and eligibility criteria." },
                { role: "user", content: text },
            ],
            response_format: zodResponseFormat(RequirementSchema, "requirements"),
        })

        const result = completion.choices[0].message.parsed

        return NextResponse.json(result)
    } catch (error) {
        console.error("Extraction Error:", error)
        return NextResponse.json({ error: "Failed to extract requirements" }, { status: 500 })
    }
}
