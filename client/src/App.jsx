import { useState } from 'react';
import Editor from './Editor';
import AiSidebar from './AiSidebar';

const getPromptText = (promptType, content) => {
  switch (promptType) {
    case 'summarize':
      return `Summarize the following text:\n\n${content}`;
    case 'improve':
      return `Improve the grammar and writing style of the following text:\n\n${content}`;
    case 'continue':
      return `Continue writing from the following text:\n\n${content}`;
    default:
      return content;
  }
};

function App() {
  const [editorContent, setEditorContent] = useState('');
  // New state to hold the user's selected text
  const [selectedContent, setSelectedContent] = useState('');
  const [loading, setLoading] = useState({
    continue: false,
    summarize: false,
    improve: false
  });
  const [aiText, setAiText] = useState('');

  const handleGenerateText = async (promptType) => {
    setLoading(prev => ({ ...prev, [promptType]: true }));

    // Use selectedContent if it exists, otherwise use the whole editor's content
    const contentToSend = selectedContent || editorContent;
    const finalPrompt = getPromptText(promptType, contentToSend);

    try {
      const response = await fetch('/api/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setAiText(data.generatedText);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      alert('Error fetching AI response.');
    } finally {
      setLoading(prev => ({ ...prev, [promptType]: false }));
    }
  };

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
          <Editor setEditorContent={setEditorContent} aiText={aiText} setSelectedContent={setSelectedContent} />
        </div>
        <div className="md:col-span-1">
          <AiSidebar handleGenerateText={handleGenerateText} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default App;