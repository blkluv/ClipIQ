// app/dashboard/[workspaceId]/page.tsx

type PageParams = { params: { workspaceId: string } };

export default async function DashboardHome({ params }: PageParams) {
    const { workspaceId } =await params;
  return (
    <div>
      <h2>Welcome to Workspace {workspaceId}</h2>
      {/* whatever else */}
    </div>
  );
}
