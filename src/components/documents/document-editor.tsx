"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function DocumentEditor() {
    const [content, setContent] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)

    const handleGenerate = async () => {
        setIsGenerating(true)
        try {
            // Mock data for demo
            const res = await fetch("/api/generate/document", {
                method: "POST",
                body: JSON.stringify({
                    type: "cover_letter",
                    profileData: {
                        full_name: "John Doe",
                        university_name: "Tech University",
                        current_education_level: "Senior",
                        key_skills: "TypeScript, React, Node.js"
                    },
                    applicationContext: {
                        role_title: "Software Engineer Intern",
                        company_name: "Acme Corp"
                    }
                })
            })
            const data = await res.json()
            setContent(data.content)
        } catch (e) {
            console.error(e)
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Generator Settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            This demo uses a hardcoded profile for "John Doe" applying to "Acme Corp".
                        </p>
                        <Button onClick={handleGenerate} disabled={isGenerating}>
                            {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isGenerating ? "Generating..." : "Generate Cover Letter"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="h-full">
                <CardHeader>
                    <CardTitle>Document Preview</CardTitle>
                </CardHeader>
                <CardContent className="h-[500px]">
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="h-full font-mono text-sm resize-none p-4"
                        placeholder="Generated content will appear here..."
                    />
                </CardContent>
            </Card>
        </div>
    )
}
