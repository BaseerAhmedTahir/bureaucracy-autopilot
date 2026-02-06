import { Bell } from "lucide-react"

export function AppHeader() {
    return (
        <header className="h-16 border-b border-border bg-background/95 backdrop-blur flex items-center justify-between px-6 sticky top-0 z-10 w-full">
            <div className="text-sm text-muted-foreground">
                Welcome back, <span className="text-foreground font-medium">John</span>
            </div>
            <div className="flex items-center gap-4">
                <button className="p-2 rounded-full hover:bg-secondary relative text-muted-foreground hover:text-foreground transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-background"></span>
                </button>
            </div>
        </header>
    )
}
