import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { $getRoot, $createParagraphNode, $createTextNode } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListItemNode, ListNode } from '@lexical/list';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import Toolbar from './Toolbar';
import { LinkNode } from '@lexical/link';

const theme = {
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through"
  },
  list: {
    ul: "list-disc",
    ol: "list-decimal",
    listitem: "ml-6"
  },
  paragraph: "my-2",
  placeholder: "text-gray-500 overflow-hidden text-ellipsis"
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
      <Toolbar />
      <div className="relative p-4">
        <RichTextPlugin
          contentEditable={<ContentEditable className="outline-none resize-none min-h-[300px]" />}
          placeholder={<div className="absolute top-0 left-0 p-4 pointer-events-none text-gray-500">Start writing...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
      <HistoryPlugin />
      <ListPlugin />
      <LinkPlugin />
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
  // CORRECTED: Added LinkNode to the nodes array
  nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode],
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