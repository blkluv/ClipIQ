const Home = async () => {
  return (
    <div className="flex flex-col h-full mt-8 justify-center items-center text-center px-6">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to <span className="text-purple-500">ClipIQ</span>
      </h1>
      <p className="text-neutral-400 max-w-xl mb-10">
        Record, organize, and enhance your videos — powered by AI. Your all-in-one workspace for sharing knowledge and collaborating with your team.
      </p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl">
        
        <div className="border border-neutral-700 p-6 rounded-lg bg-neutral-900 hover:border-purple-600 transition">
          <h3 className="text-lg font-semibold text-white mb-2">Record with Our Desktop App</h3>
          <p className="text-neutral-400 text-sm">
            Capture screen, audio, and camera with ease using the ClipIQ desktop app. Seamless uploads directly to your workspace.
          </p>
        </div>

        <div className="border border-neutral-700 p-6 rounded-lg bg-neutral-900 hover:border-purple-600 transition">
          <h3 className="text-lg font-semibold text-white mb-2">Collaborate & Organize</h3>
          <p className="text-neutral-400 text-sm">
            Invite your team, manage folders, and organize content — all within dedicated workspaces built for efficient collaboration.
          </p>
        </div>

        <div className="border border-neutral-700 p-6 rounded-lg bg-neutral-900 hover:border-purple-600 transition">
          <h3 className="text-lg font-semibold text-white mb-2">AI-Powered Video Tools</h3>
          <p className="text-neutral-400 text-sm">
            Supercharge your videos with AI — generate smart summaries, automate descriptions, and interact with viewers using AI agents.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Home;
