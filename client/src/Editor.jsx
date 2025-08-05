import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { $getRoot } from 'lexical';

const theme = {
  placeholder: "text-gray-500 overflow-hidden text-ellipsis",
  paragraph: "my-2",
};

function MyCustomEditor({ setEditorContent }) {
  const handleChange = (editorState) => {
    editorState.read(() => {
      // CORRECTED: Use $getRoot() instead of editorState.root
      const root = $getRoot();
      setEditorContent(root.getTextContent());
    });
  };

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

export default function Editor({ setEditorContent }) {
  return (
    <div className="relative w-full h-full bg-gray-700 text-white rounded-lg shadow-xl">
      <LexicalComposer initialConfig={initialConfig}>
        <MyCustomEditor setEditorContent={setEditorContent} />
      </LexicalComposer>
    </div>
  );
}