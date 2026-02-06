import { NextRequest, NextResponse } from "next/server"
import { chromium } from "playwright"

export async function POST(req: NextRequest) {
    try {
        const { url, profileData, mapping } = await req.json()

        // Launch Playwright (Headed for demo visibility, headless for prod)
        // Note: In serverless, you need a different setup (chrome-aws-lambda), 
        // but for local v1 this works.
        const browser = await chromium.launch({ headless: false })
        const page = await browser.newPage()

        await page.goto(url)

        // Log actions for "Run Report"
        const logs: string[] = []

        for (const [selector, value] of Object.entries(mapping)) {
            try {
                // Simple filling strategy
                await page.fill(selector, value as string)
                logs.push(`Filled ${selector} with "${value}"`)
            } catch (e) {
                logs.push(`Failed to fill ${selector}: ${e}`)
            }
        }

        // Screenshot for verification
        // const screenshot = await page.screenshot({ encoding: "base64" })

        // Don't close immediately so we can see it in headed mode (demo)
        await page.waitForTimeout(3000)
        await browser.close()

        return NextResponse.json({ success: true, logs })

    } catch (error) {
        console.error("Automation Error:", error)
        return NextResponse.json({ error: "Failed to run automation" }, { status: 500 })
    }
}
