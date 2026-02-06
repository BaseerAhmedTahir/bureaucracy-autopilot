import { FileText, Globe, Link as LinkIcon } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Badge } from "@/components/ui/badge"

interface EvidenceBadgeProps {
    sourceType: "PDF" | "WEB_PAGE" | "MANUAL"
    sourceName: string
    confidence?: number
}

export function EvidenceBadge({ sourceType, sourceName, confidence }: EvidenceBadgeProps) {
    const Icon = sourceType === "PDF" ? FileText : sourceType === "WEB_PAGE" ? Globe : LinkIcon

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Badge variant="outline" className="cursor-pointer gap-1 text-xs hover:bg-secondary">
                    <Icon className="w-3 h-3" />
                    {sourceName}
                </Badge>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Source Evidence</h4>
                        <p className="text-sm">
                            Extracted from <span className="font-medium">{sourceName}</span>
                        </p>
                        {confidence && (
                            <div className="flex items-center pt-2">
                                <span className="text-xs text-muted-foreground mr-2">Confidence:</span>
                                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden flex-1 max-w-[100px]">
                                    <div
                                        className="h-full bg-green-500"
                                        style={{ width: `${confidence * 100}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
