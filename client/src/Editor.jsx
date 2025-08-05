import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { $getRoot, $createParagraphNode, $createTextNode, $getSelection, $isRangeSelection, $isParagraphNode } from 'lexical';
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

function MyCustomEditor({ setEditorContent, aiText, setSelectedContent }) {
  const [editor] = useLexicalComposerContext();

  const handleChange = (editorState) => {
    editorState.read(() => {
      const root = $getRoot();
      setEditorContent(root.getTextContent());
    });
  };

  useEffect(() => {
    const unregisterListener = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const selectedText = selection.getTextContent();
          setSelectedContent(selectedText);
        } else {
          setSelectedContent('');
        }
      });
    });
    return unregisterListener;
  }, [editor, setSelectedContent]);

  useEffect(() => {
    if (aiText) {
      editor.update(() => {
        const root = $getRoot();
        const paragraphNode = $createParagraphNode();
        const textNode = $createTextNode(aiText);
        paragraphNode.append(textNode);
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
  nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode],
};

export default function Editor({ setEditorContent, aiText, setSelectedContent }) {
  return (
    <div className="relative w-full h-full bg-gray-700 text-white rounded-lg shadow-xl">
      <LexicalComposer initialConfig={initialConfig}>
        <MyCustomEditor setEditorContent={setEditorContent} aiText={aiText} setSelectedContent={setSelectedContent} />
      </LexicalComposer>
    </div>
  );
}