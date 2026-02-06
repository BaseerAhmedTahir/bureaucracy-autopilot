"use client"

import { AlertTriangle, Check } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

interface ConflictResolverProps {
    fieldLabel: string
    conflicts: {
        id: string
        value: string
        source: string
        date: string
    }[]
    onResolve: (selectedId: string) => void
}

export function ConflictResolver({ fieldLabel, conflicts, onResolve }: ConflictResolverProps) {
    const [selected, setSelected] = useState<string>(conflicts[0]?.id)

    return (
        <Card className="border-yellow-500/50 bg-yellow-500/5">
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500">
                    <AlertTriangle className="h-5 w-5" />
                    <CardTitle className="text-base">Conflict Detected: {fieldLabel}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                    We found conflicting information for <strong>{fieldLabel}</strong> from different sources. Please select the correct one.
                </p>
                <RadioGroup value={selected} onValueChange={setSelected} className="gap-3">
                    {conflicts.map((conflict) => (
                        <div key={conflict.id} className="flex items-center space-x-2 border p-3 rounded-md bg-background hover:bg-accent/50 transition-colors">
                            <RadioGroupItem value={conflict.id} id={conflict.id} />
                            <Label htmlFor={conflict.id} className="flex-1 cursor-pointer">
                                <div className="font-medium">{conflict.value}</div>
                                <div className="text-xs text-muted-foreground flex gap-2 mt-1">
                                    <Badge variant="secondary" className="text-[10px] h-5">{conflict.source}</Badge>
                                    <span>{conflict.date}</span>
                                </div>
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                    onClick={() => onResolve(selected)}
                >
                    <Check className="mr-2 h-4 w-4" />
                    Confirm Selected Value
                </Button>
            </CardFooter>
        </Card>
    )
}
