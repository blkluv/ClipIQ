import React, { ReactNode } from 'react';

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="dashboard-layout">
            {/* You can add sidebar, header, etc. here */}
            {children}
        </div>
    );
}