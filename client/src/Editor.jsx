import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

const theme = {
  // Add styling for our editor here using Tailwind CSS classes
  placeholder: "text-gray-500 overflow-hidden text-ellipsis",
  paragraph: "my-2",
};

// Lexical React plugins are necessary to render and manage the editor
function MyCustomEditor() {
  const [editor] = useLexicalComposerContext();
  
  // A simple change handler to log the editor state to the console
  const handleChange = (editorState) => {
    editorState.read(() => {
      // For this step, we'll just log the raw editor state.
      // We will parse this later.
      console.log(editorState);
    });
  };

  return (
    <>
      <PlainTextPlugin
        contentEditable={<ContentEditable className="p-4 outline-none resize-none min-h-[300px]" />}
        placeholder={<div className="p-4 absolute top-0 left-0 pointer-events-none text-gray-500">Start writing...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin onChange={handleChange} />
      <HistoryPlugin />
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