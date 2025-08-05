import React from 'react';

function AiSidebar({ handleGenerateText, loading }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-xl flex flex-col">
      <h2 className="text-2xl font-semibold mb-4">AI Actions</h2>
      <p className="text-gray-400 mb-6">
        Select an action to apply to the content in your editor.
      </p>

      <div className="flex flex-col space-y-2">
        <button
          className="w-full px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition-colors disabled:bg-gray-500"
          onClick={() => handleGenerateText('continue')}
          disabled={loading.continue}
        >
          {loading.continue ? 'Generating...' : 'Continue Writing'}
        </button>

        <button
          className="w-full px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition-colors disabled:bg-gray-500"
          onClick={() => handleGenerateText('summarize')}
          disabled={loading.summarize}
        >
          {loading.summarize ? 'Summarizing...' : 'Summarize Text'}
        </button>

        <button
          className="w-full px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition-colors disabled:bg-gray-500"
          onClick={() => handleGenerateText('improve')}
          disabled={loading.improve}
        >
          {loading.improve ? 'Improving...' : 'Improve Writing'}
        </button>
      </div>
    </div>
  );
}

export default AiSidebar;