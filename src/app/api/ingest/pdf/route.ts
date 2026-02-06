import { NextRequest, NextResponse } from "next/server"
import pdfParse from "pdf-parse"

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const data = await pdfParse(buffer)

        // TODO: Send text to LLM for requirement extraction

        return NextResponse.json({
            text: data.text,
            info: data.info,
            metadata: data.metadata,
            pages: data.numpages
        })
    } catch (error) {
        console.error("PDF Parsing Error:", error)
        return NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 })
    }
}
