import { useState, useEffect } from 'react';
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
    case 'rewrite':
        return `Rewrite the following text to improve its clarity and flow:\n\n${content}`;
    default:
      return content;
  }
};

function App() {
  const [editorContent, setEditorContent] = useState('');
  const [selectedContent, setSelectedContent] = useState('');
  const [loading, setLoading] = useState({
    continue: false,
    summarize: false,
    improve: false,
    rewrite: false
  });
  const [aiText, setAiText] = useState(null);
  const [loadedContent, setLoadedContent] = useState(null);

  // New state to hold the export-to-markdown function
  const [getMarkdownContent, setGetMarkdownContent] = useState(null);

  const handleGenerateText = async (promptType) => {
    setLoading(prev => ({ ...prev, [promptType]: true }));

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
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let aiResponseText = '';

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value);
        if (chunk) {
          aiResponseText += chunk;
        }
      }

      setAiText(aiResponseText);

    } catch (error) {
      console.error('Error fetching AI response:', error);
      alert('Error fetching AI response.');
    } finally {
      setLoading(prev => ({ ...prev, [promptType]: false }));
    }
  };

  const handleSaveDocument = () => {
    try {
      localStorage.setItem('smart-scribe-document', editorContent);
      alert('Document saved successfully!');
    } catch (error) {
      console.error('Error saving document:', error);
      alert('Could not save document.');
    }
  };

  const handleLoadDocument = () => {
    try {
      const savedContent = localStorage.getItem('smart-scribe-document');
      if (savedContent) {
        setLoadedContent(savedContent);
        alert('Document loaded successfully!');
      } else {
        alert('No saved document found.');
      }
    } catch (error) {
      console.error('Error loading document:', error);
      alert('Could not load document.');
    }
  };

  const handleExportDocument = () => {
    if (editorContent) {
      const blob = new Blob([editorContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'smart-scribe-document.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      alert('The document is empty. Nothing to export.');
    }
  };
  
  const handleExportMarkdown = () => {
    if (getMarkdownContent) {
      const markdownContent = getMarkdownContent();
      if (markdownContent) {
        const blob = new Blob([markdownContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'smart-scribe-document.md';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        alert('The document is empty. Nothing to export.');
      }
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
          <Editor 
            setEditorContent={setEditorContent} 
            setSelectedContent={setSelectedContent} 
            aiText={aiText}
            loadedContent={loadedContent}
            setGetMarkdownContent={setGetMarkdownContent}
          />
        </div>
        <div className="md:col-span-1">
          <AiSidebar 
            handleGenerateText={handleGenerateText} 
            loading={loading}
            handleSaveDocument={handleSaveDocument}
            handleLoadDocument={handleLoadDocument}
            handleExportDocument={handleExportDocument} 
            handleExportMarkdown={handleExportMarkdown}
          />
        </div>
      </div>
    </div>
  );
}

export default App;