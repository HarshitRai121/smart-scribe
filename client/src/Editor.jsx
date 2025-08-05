import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { useState } from 'react';
import { $getRoot, $insertNodes } from 'lexical';
import { $createParagraphNode, $createTextNode } from 'lexical';

const theme = {
  placeholder: "text-gray-500 overflow-hidden text-ellipsis",
  paragraph: "my-2",
};

// Lexical React plugins are necessary to render and manage the editor
function MyCustomEditor() {
  const [editor] = useLexicalComposerContext();
  const [loading, setLoading] = useState(false);

  // Function to insert a new paragraph with the given text
  const insertTextIntoEditor = (text) => {
    editor.update(() => {
      const paragraphNode = $createParagraphNode();
      const textNode = $createTextNode(text);
      paragraphNode.append(textNode);

      const root = $getRoot();
      root.append(paragraphNode);
    });
  };

  // Function to send a prompt to the backend
  const handleGenerateText = async () => {
    setLoading(true);
    let editorContent = '';
    editor.update(() => {
      const root = $getRoot();
      editorContent = root.getTextContent();
    });

    try {
      const response = await fetch('/api/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: editorContent }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      insertTextIntoEditor(data.generatedText);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      alert('Error fetching AI response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PlainTextPlugin
        contentEditable={<ContentEditable className="p-4 outline-none resize-none min-h-[300px]" />}
        placeholder={<div className="p-4 absolute top-0 left-0 pointer-events-none text-gray-500">Start writing...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <div className="flex justify-end p-2 bg-gray-600 rounded-b-lg">
        <button 
          className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition-colors disabled:bg-gray-500"
          onClick={handleGenerateText}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Text'}
        </button>
      </div>
    </>
  );
}

// The root Lexical configuration
const initialConfig = {
  namespace: 'SmartScribeEditor',
  theme,
  onError(error) {
    console.error(error);
  },
};

export default function Editor() {
  return (
    <div className="relative w-full h-full bg-gray-700 text-white rounded-lg shadow-xl">
      <LexicalComposer initialConfig={initialConfig}>
        <MyCustomEditor />
      </LexicalComposer>
    </div>
  );
}