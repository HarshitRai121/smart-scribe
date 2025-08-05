import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';
import { $wrapNodes } from '@lexical/selection';
import { $createListNode } from '@lexical/list';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();

  const formatText = (format) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const insertLink = () => {
    const url = prompt('Enter the URL:');
    if (url) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
    }
  };

  const formatList = (listType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createListNode(listType));
      }
    });
  };

  return (
    <div className="flex p-2 bg-gray-600 rounded-t-lg space-x-2">
      <button
        onClick={() => formatText('bold')}
        className="px-2 py-1 bg-gray-500 rounded-md text-white hover:bg-gray-400 transition-colors"
      >
        **B**
      </button>
      <button
        onClick={() => formatText('italic')}
        className="px-2 py-1 bg-gray-500 rounded-md text-white hover:bg-gray-400 transition-colors italic"
      >
        _I_
      </button>
      <button
        onClick={() => formatText('underline')}
        className="px-2 py-1 bg-gray-500 rounded-md text-white hover:bg-gray-400 transition-colors underline"
      >
        U
      </button>
      <button
        onClick={() => formatList('bullet')}
        className="px-2 py-1 bg-gray-500 rounded-md text-white hover:bg-gray-400 transition-colors"
      >
        UL
      </button>
      <button
        onClick={() => formatList('number')}
        className="px-2 py-1 bg-gray-500 rounded-md text-white hover:bg-gray-400 transition-colors"
      >
        OL
      </button>
      <button
        onClick={insertLink}
        className="px-2 py-1 bg-gray-500 rounded-md text-white hover:bg-gray-400 transition-colors"
      >
        Link
      </button>
    </div>
  );
};

export default Toolbar;