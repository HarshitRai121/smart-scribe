import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Smart Scribe</h1>
      <p className="text-lg mb-8 text-gray-400">
        AI-Powered Document Editor
      </p>
      <div className="p-8 bg-gray-800 rounded-lg shadow-xl flex items-center gap-4">
        <button
          className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </div>
    </div>
  )
}

export default App