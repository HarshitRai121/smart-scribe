import PropTypes from 'prop-types';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { $getRoot, $createParagraphNode, $createTextNode, $getSelection, $isRangeSelection, CLEAR_EDITOR_COMMAND } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, forwardRef, useImperativeHandle } from 'react';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListItemNode, ListNode } from '@lexical/list';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import Toolbar from './Toolbar';
import { LinkNode } from '@lexical/link';
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from '@lexical/markdown';

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

const MyCustomEditor = forwardRef(({ setEditorContent, aiText, setSelectedContent, loadedContent, setGetMarkdownContent }, ref) => {
  const [editor] = useLexicalComposerContext();

  useImperativeHandle(ref, () => ({
    clearEditor: () => {
      editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
    },
    getMarkdownContent: () => {
      let markdownString = '';
      editor.getEditorState().read(() => {
        markdownString = $convertToMarkdownString(TRANSFORMERS);
      });
      return markdownString;
    },
  }));

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

  useEffect(() => {
    if (loadedContent !== null) {
      editor.update(() => {
        editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
        const root = $getRoot();
        const paragraphNode = $createParagraphNode();
        const textNode = $createTextNode(loadedContent);
        paragraphNode.append(textNode);
        root.append(paragraphNode);
      });
    }
  }, [loadedContent, editor]);
  
  useEffect(() => {
    const getMarkdown = () => {
      let markdownString = '';
      editor.getEditorState().read(() => {
        markdownString = $convertToMarkdownString(TRANSFORMERS);
      });
      return markdownString;
    };
    setGetMarkdownContent(() => getMarkdown);
  }, [editor, setGetMarkdownContent]);

  return (
    <div className="flex flex-col h-full">
      <Toolbar />
      <div className="relative p-4 flex-grow overflow-y-auto">
        <RichTextPlugin
          contentEditable={<ContentEditable className="outline-none resize-none min-h-[300px] h-full" />}
          placeholder={<div className="absolute top-4 left-4 pointer-events-none text-gray-500">Start writing...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
      <HistoryPlugin />
      <ListPlugin />
      <LinkPlugin />
      <OnChangePlugin onChange={handleChange} />
    </div>
  );
});

const initialConfig = {
  namespace: 'SmartScribeEditor',
  theme,
  onError(error) {
    console.error(error);
  },
  nodes: [
    HeadingNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    LinkNode,
  ],
};

const Editor = forwardRef(({ setEditorContent, aiText, setSelectedContent, loadedContent, setGetMarkdownContent }, ref) => {
  return (
    <div className="relative w-full h-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-xl">
      <LexicalComposer initialConfig={initialConfig}>
        <MyCustomEditor ref={ref} setEditorContent={setEditorContent} aiText={aiText} setSelectedContent={setSelectedContent} loadedContent={loadedContent} setGetMarkdownContent={setGetMarkdownContent} />
      </LexicalComposer>
    </div>
  );
});

Editor.propTypes = {
  setEditorContent: PropTypes.func.isRequired,
  aiText: PropTypes.string,
  setSelectedContent: PropTypes.func.isRequired,
  loadedContent: PropTypes.string,
  setGetMarkdownContent: PropTypes.func.isRequired,
};

export default Editor;