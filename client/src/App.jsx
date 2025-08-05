import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/') // <-- Update the fetch to use the '/api/' path
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Smart Scribe</h1>
      <p className="text-lg mb-8 text-gray-400">
        AI-Powered Document Editor
      </p>
      <div className="p-8 bg-gray-800 rounded-lg shadow-xl flex items-center gap-4">
        <p className="text-xl">
          Backend says: <span className="text-blue-400 font-medium">{message}</span>
        </p>
      </div>
    </div>
  );
}

export default App;