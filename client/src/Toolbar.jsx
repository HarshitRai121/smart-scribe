import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();

  const formatText = (format) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
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
    </div>
  );
};

export default Toolbar;