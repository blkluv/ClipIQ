import React from "react";

interface DashboardPageProps {
    params: { workspaceId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = ({ params }) => {
    return (
        <div>
            <h1>Workspace Dashboard</h1>
            <p>Workspace ID: {params.workspaceId}</p>
        </div>
    );
};

export default DashboardPage;