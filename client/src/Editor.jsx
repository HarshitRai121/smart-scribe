import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { $getRoot, $createParagraphNode, $createTextNode } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

const theme = {
  placeholder: "text-gray-500 overflow-hidden text-ellipsis",
  paragraph: "my-2",
};

// This is the component that houses the editor plugins
function MyCustomEditor({ setEditorContent, aiText }) {
  const [editor] = useLexicalComposerContext();

  const handleChange = (editorState) => {
    editorState.read(() => {
      const root = $getRoot();
      setEditorContent(root.getTextContent());
    });
  };

  useEffect(() => {
    if (aiText) {
      editor.update(() => {
        const paragraphNode = $createParagraphNode();
        const textNode = $createTextNode(aiText);
        paragraphNode.append(textNode);
        const root = $getRoot();
        root.append(paragraphNode);
      });
    }
  }, [aiText, editor]);

  return (
    <>
      <PlainTextPlugin
        contentEditable={<ContentEditable className="p-4 outline-none resize-none min-h-[300px]" />}
        placeholder={<div className="p-4 absolute top-0 left-0 pointer-events-none text-gray-500">Start writing...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <OnChangePlugin onChange={handleChange} />
    </>
  );
}

const initialConfig = {
  namespace: 'SmartScribeEditor',
  theme,
  onError(error) {
    console.error(error);
  },
};

export default function Editor({ setEditorContent, aiText }) {
  return (
    <div className="relative w-full h-full bg-gray-700 text-white rounded-lg shadow-xl">
      <LexicalComposer initialConfig={initialConfig}>
        <MyCustomEditor setEditorContent={setEditorContent} aiText={aiText} />
      </LexicalComposer>
    </div>
  );
}