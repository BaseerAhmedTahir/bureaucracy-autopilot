import { NextRequest, NextResponse } from "next/server"
import { openai } from "@/lib/openai"
import Handlebars from "handlebars"

// Simple in-memory template store for v1
const TEMPLATES = {
    "cover_letter": `Dear Hiring Manager,

I am writing to express my strong interest in the {{role_title}} position at {{company_name}}. As a {{current_education_level}} student at {{university_name}}, I have built a strong foundation in {{key_skills}}.

{{llm_generated_body}}

Thank you for considering my application. I look forward to the possibility of discussing how I can contribute to your team.

Sincerely,
{{full_name}}`
}

export async function POST(req: NextRequest) {
    try {
        const {
            type,
            profileData,
            applicationContext,
            instructions
        } = await req.json()

        // 1. Select Template
        const templateSource = TEMPLATES[type as keyof typeof TEMPLATES]
        if (!templateSource) {
            return NextResponse.json({ error: "Template not found" }, { status: 404 })
        }

        // 2. Generate LLM Content for the dynamic body
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-2024-08-06",
            messages: [
                { role: "system", content: "You are an expert professional writer. Write a compelling body paragraph for a cover letter." },
                {
                    role: "user", content: `
          Applicant Profile: ${JSON.stringify(profileData)}
          Job/Context: ${JSON.stringify(applicationContext)}
          Specific Instructions: ${instructions || "Highlight relevant projects and passion."}
          
          Write 2-3 paragraphs connecting the profile to the job. formal tone.
        ` },
            ],
        })

        const llmBody = completion.choices[0].message.content

        // 3. Compile final document with Handlebars
        const template = Handlebars.compile(templateSource)
        const finalContent = template({
            ...profileData,
            ...applicationContext,
            llm_generated_body: llmBody
        })

        return NextResponse.json({
            content: finalContent,
            type
        })

    } catch (error) {
        console.error("Doc Gen Error:", error)
        return NextResponse.json({ error: "Failed to generate document" }, { status: 500 })
    }
}
