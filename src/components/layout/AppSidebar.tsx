import Link from "next/link"
import { Home, FileText, User, Settings, FolderOpen } from "lucide-react"

export function AppSidebar() {
    return (
        <aside className="w-64 border-r border-border bg-card h-screen flex flex-col fixed left-0 top-0 z-20">
            <div className="p-6 border-b border-border">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    Bureaucracy Autopilot
                </h1>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                <NavLink href="/dashboard" icon={Home}>Dashboard</NavLink>
                <NavLink href="/applications" icon={FolderOpen}>Applications</NavLink>
                <NavLink href="/profile" icon={User}>My Profile</NavLink>
                <NavLink href="/documents" icon={FileText}>Documents</NavLink>
                <NavLink href="/settings" icon={Settings}>Settings</NavLink>
            </nav>
            <div className="p-4 border-t border-border">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        JD
                    </div>
                    <div>
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">Free Plan</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}

function NavLink({ href, icon: Icon, children }: { href: string; icon: any; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
            <Icon className="w-5 h-5" />
            <span>{children}</span>
        </Link>
    )
}
