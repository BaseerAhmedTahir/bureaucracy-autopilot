import { DocumentEditor } from "@/components/documents/document-editor"

export default function DocumentsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
                <p className="text-muted-foreground">
                    Generate and edit your application materials.
                </p>
            </div>
            <DocumentEditor />
        </div>
    )
}
