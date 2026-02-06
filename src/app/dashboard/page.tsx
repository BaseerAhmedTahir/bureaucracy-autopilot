"use client"

import { FileUpload } from "@/components/ui/file-upload"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function DashboardPage() {
    const handleUpload = async (files: File[]) => {
        // TODO: Implement actual upload logic to API
        const formData = new FormData()
        formData.append("file", files[0])

        try {
            const res = await fetch("/api/ingest/pdf", {
                method: "POST",
                body: formData,
            })
            const data = await res.json()
            console.log("Uploaded:", data)
        } catch (e) {
            console.error("Upload failed", e)
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <p className="text-muted-foreground">
                        Manage your applications and documents.
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> New Application
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Quick Ingest</CardTitle>
                        <CardDescription>
                            Drag and drop requirement PDFs to start a new application automatically.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FileUpload onUpload={handleUpload} />
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                            Your latest application updates.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="text-sm text-muted-foreground text-center py-8">
                                No activity yet. Upload a document to get started.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
