import { useState, useEffect, useRef } from 'react';
import Editor from './Editor';
import AiSidebar from './AiSidebar';
import Header from './Header';

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
    case 'generateTitle':
      return `Generate a concise and compelling title for the following text:\n\n${content}`;
    case 'checkSpelling':
      return `Check the following text for spelling and grammar errors and correct them. Provide only the corrected text as the response:\n\n${content}`;
    case 'changeTone':
      return `Rewrite the following text to be more professional, formal, or friendly. Provide the revised text as the response:\n\n${content}`;
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
    rewrite: false,
    generateTitle: false,
    checkSpelling: false,
    changeTone: false,
  });
  const [aiText, setAiText] = useState(null);
  const [loadedContent, setLoadedContent] = useState(null);
  const [getMarkdownContent, setGetMarkdownContent] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [title, setTitle] = useState("Untitled Document");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const editorRef = useRef(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(prev => !prev);
  };

  const handleGenerateText = async (promptType) => {
    setLoading(prev => ({ ...prev, [promptType]: true }));
    const contentToSend = selectedContent || editorContent;
    const finalPrompt = getPromptText(promptType, contentToSend);
    try {
      const response = await fetch('/api/generate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: finalPrompt }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (promptType === 'generateTitle') {
        setTitle(data.text);
      } else {
        setAiText(data.text);
      }
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

  const handleClearEditor = () => {
    if (editorRef.current) {
      editorRef.current.clearEditor();
      setEditorContent('');
      setAiText(null);
      setLoadedContent(null);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        toggleSidebar={toggleSidebar}
        title={title}
      />
      <div className="flex h-screen w-full max-w-7xl mx-auto pt-16">
        <div className={`p-6 w-full transition-all duration-300 ${isSidebarVisible ? 'md:mr-64' : 'md:mr-0'}`}>
          <Editor
            ref={editorRef}
            setEditorContent={setEditorContent}
            setSelectedContent={setSelectedContent}
            aiText={aiText}
            loadedContent={loadedContent}
            setGetMarkdownContent={setGetMarkdownContent}
          />
        </div>
        <AiSidebar
          handleGenerateText={handleGenerateText}
          loading={loading}
          handleSaveDocument={handleSaveDocument}
          handleLoadDocument={handleLoadDocument}
          handleExportDocument={handleExportDocument}
          handleExportMarkdown={handleExportMarkdown}
          handleClearEditor={handleClearEditor}
          isSidebarVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
        />
      </div>
    </div>
  );
}

export default App;