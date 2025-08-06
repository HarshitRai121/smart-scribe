import React from 'react';

const AiSidebar = ({ handleGenerateText, loading, handleSaveDocument, handleLoadDocument, handleExportDocument }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4">AI Actions</h2>
      <p className="text-gray-400 mb-6">
        Select a piece of text or click anywhere to apply an AI action to the
        entire document.
      </p>

      <div className="flex flex-col space-y-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          onClick={() => handleGenerateText('improve')}
          disabled={loading.improve}
        >
          {loading.improve ? 'Improving...' : 'Improve Writing'}
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          onClick={() => handleGenerateText('summarize')}
          disabled={loading.summarize}
        >
          {loading.summarize ? 'Summarizing...' : 'Summarize'}
        </button>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          onClick={() => handleGenerateText('continue')}
          disabled={loading.continue}
        >
          {loading.continue ? 'Continuing...' : 'Continue Writing'}
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Document Actions</h2>
        <div className="flex flex-col space-y-4">
          <button
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            onClick={handleSaveDocument}
          >
            Save Document
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            onClick={handleLoadDocument}
          >
            Load Document
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            onClick={handleExportDocument}
          >
            Export as Text
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiSidebar;