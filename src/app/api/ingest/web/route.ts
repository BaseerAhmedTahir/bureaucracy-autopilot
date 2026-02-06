import { NextRequest, NextResponse } from "next/server"

// Minimal URL validation
function isValidUrl(url: string) {
    try {
        new URL(url)
        return true
    } catch {
        return false
    }
}

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json()

        if (!url || !isValidUrl(url)) {
            return NextResponse.json({ error: "Invalid URL provided" }, { status: 400 })
        }

        // Fetch the HTML
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }
        })

        if (!response.ok) {
            return NextResponse.json({ error: `Failed to fetch URL: ${response.statusText}` }, { status: response.status })
        }

        const html = await response.text()

        // Basic stripping of script/style tags (We can improve this with cheerio or readability later)
        const textContent = html
            .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "")
            .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gim, "")
            .replace(/<[^>]+>/g, " ")
            .replace(/\s+/g, " ")
            .trim()

        // Limit text length to avoid token limits for now (e.g. 50k chars)
        const truncatedText = textContent.slice(0, 50000)

        return NextResponse.json({
            url,
            text: truncatedText,
            length: truncatedText.length
        })

    } catch (error) {
        console.error("Web Ingestion Error:", error)
        return NextResponse.json({ error: "Failed to process URL" }, { status: 500 })
    }
}
