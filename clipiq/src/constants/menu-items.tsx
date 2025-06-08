import { Bell, CreditCard, File, Home, Settings } from "lucide-react"

export const menuItems = (workspaceid: string) => {
    return [
        {
            title: "Home",
            href: `/dashboard/${workspaceid}/home`,
            icon: <Home className="text-neutral-500"/>,
        },
        {
            title: "My Library",
            href: `/dashboard/${workspaceid}`,
            icon: <File className="text-neutral-500"/>,
        },
        {
            title: "Notifications",
            href: `/dashboard/${workspaceid}/notifications`,
            icon: <Bell className="text-neutral-500"/>,
        },
        {
            title: "Billing",
            href: `/dashboard/${workspaceid}/billing`,
            icon: <CreditCard className="text-neutral-500"/>,
        },
        {
            title: "Settings",
            href: `/dashboard/${workspaceid}/settings`,
            icon: <Settings className="text-neutral-500"/>,
        }
    ]
}