"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, File, Loader2, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
    onUpload?: (files: File[]) => void
    className?: string
}

export function FileUpload({ onUpload, className }: FileUploadProps) {
    const [files, setFiles] = useState<File[]>([])
    const [isUploading, setIsUploading] = useState(false)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles((prev) => [...prev, ...acceptedFiles])
        if (onUpload) {
            onUpload(acceptedFiles)
        }
    }, [onUpload])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
        },
        maxSize: 5 * 1024 * 1024, // 5MB
    })

    const removeFile = (fileToRemove: File) => {
        setFiles((prev) => prev.filter((f) => f !== fileToRemove))
    }

    return (
        <div className={cn("space-y-4", className)}>
            <div
                {...getRootProps()}
                className={cn(
                    "border-2 border-dashed rounded-lg p-10 transition-colors cursor-pointer text-center",
                    isDragActive
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25 hover:border-primary/50",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                )}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="p-4 rounded-full bg-secondary">
                        <Upload className="w-6 h-6 text-foreground" />
                    </div>
                    <div className="space-y-1">
                        <p className="font-medium text-foreground">
                            Drop your documents here
                        </p>
                        <p className="text-xs text-muted-foreground">
                            PDFs up to 5MB
                        </p>
                    </div>
                </div>
            </div>

            {files.length > 0 && (
                <div className="space-y-2">
                    <h4 className="text-sm font-medium">Selected files</h4>
                    <div className="space-y-2">
                        {files.map((file, i) => (
                            <div key={i} className="flex items-center justify-between p-3 border rounded-md bg-card">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded bg-primary/10 text-primary">
                                        <File className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                                        <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        removeFile(file)
                                    }}
                                    className="p-1 hover:bg-secondary rounded"
                                >
                                    <X className="w-4 h-4 text-muted-foreground" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
