import React from 'react';

const AiSidebar = ({ handleGenerateText, loading, handleSaveDocument, handleLoadDocument, handleExportDocument, handleExportMarkdown, isDarkMode, toggleDarkMode }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg h-full flex flex-col dark:bg-gray-800 dark:text-white transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">AI Actions</h2>
        <button
          className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold py-1 px-3 rounded-lg transition-colors duration-200"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Select a piece of text or click anywhere to apply an AI action to the
        entire document.
      </p>

      <div className="flex flex-col space-y-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          onClick={() => handleGenerateText('rewrite')}
          disabled={loading.rewrite}
        >
          {loading.rewrite ? 'Rewriting...' : 'Rewrite'}
        </button>
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
        <h2 className="text-xl font-bold">Document Actions</h2>
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
          <button
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            onClick={handleExportMarkdown}
          >
            Export as Markdown
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiSidebar;