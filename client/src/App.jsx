import Editor from './Editor';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-4xl font-bold">Smart Scribe</h1>
        <p className="text-lg text-gray-400">
          AI-Powered Document Editor
        </p>
      </div>
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Editor />
        </div>
        <div className="md:col-span-1 bg-gray-800 p-4 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">AI Actions</h2>
          <p className="text-gray-400">
            Select text in the editor to see more AI actions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;