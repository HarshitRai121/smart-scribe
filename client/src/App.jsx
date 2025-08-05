import Editor from './Editor';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Smart Scribe</h1>
      <p className="text-lg mb-8 text-gray-400">
        AI-Powered Document Editor
      </p>
      <div className="w-full max-w-4xl">
        <Editor />
      </div>
    </div>
  );
}

export default App;