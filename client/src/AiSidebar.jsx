import PropTypes from 'prop-types';
import AiButton from './AiButton';
import { FaSave, FaFolderOpen, FaFileExport, FaCode, FaHeading, FaSpellCheck, FaPencilRuler, FaTimes, FaEraser } from 'react-icons/fa';

function AiSidebar({
  handleGenerateText,
  loading,
  handleSaveDocument,
  handleLoadDocument,
  handleExportDocument,
  handleExportMarkdown,
  handleClearEditor,
  isSidebarVisible,
  toggleSidebar,
}) {
  return (
    <aside className={`fixed top-0 right-0 h-full w-64 bg-gray-100 dark:bg-gray-800 shadow-xl transition-transform duration-300 transform z-40 ${isSidebarVisible ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col h-full space-y-4 p-4 overflow-y-auto">
        <div className="flex justify-between items-center pb-2">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">AI Actions</h2>
          <button onClick={toggleSidebar} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <FaTimes size={16} />
          </button>
        </div>
        
        <div className="space-y-2">
          <AiButton label="Continue Writing" promptType="continue" onClick={() => handleGenerateText('continue')} isLoading={loading.continue} />
          <AiButton label="Summarize" promptType="summarize" onClick={() => handleGenerateText('summarize')} isLoading={loading.summarize} />
          <AiButton label="Improve Writing" promptType="improve" onClick={() => handleGenerateText('improve')} isLoading={loading.improve} />
          <AiButton label="Rewrite" promptType="rewrite" onClick={() => handleGenerateText('rewrite')} isLoading={loading.rewrite} />
          <AiButton label="Generate Title" promptType="generateTitle" icon={<FaHeading />} onClick={() => handleGenerateText('generateTitle')} isLoading={loading.generateTitle} />
          <AiButton label="Check Spelling" promptType="checkSpelling" icon={<FaSpellCheck />} onClick={() => handleGenerateText('checkSpelling')} isLoading={loading.checkSpelling} />
          <AiButton label="Change Tone" promptType="changeTone" icon={<FaPencilRuler />} onClick={() => handleGenerateText('changeTone')} isLoading={loading.changeTone} />
        </div>

        <div className="space-y-2 pt-4 border-t border-gray-300 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Document Actions</h3>
          <AiButton label="Save Document" promptType="save" icon={<FaSave />} onClick={handleSaveDocument} />
          <AiButton label="Load Document" promptType="load" icon={<FaFolderOpen />} onClick={handleLoadDocument} />
          <AiButton label="Export as Text" promptType="export-txt" icon={<FaFileExport />} onClick={handleExportDocument} />
          <AiButton label="Export as Markdown" promptType="export-md" icon={<FaCode />} onClick={handleExportMarkdown} />
          <AiButton label="Clear Document" promptType="clear" icon={<FaEraser />} onClick={handleClearEditor} />
        </div>
      </div>
    </aside>
  );
}

AiSidebar.propTypes = {
  handleGenerateText: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
  handleSaveDocument: PropTypes.func.isRequired,
  handleLoadDocument: PropTypes.func.isRequired,
  handleExportDocument: PropTypes.func.isRequired,
  handleExportMarkdown: PropTypes.func.isRequired,
  handleClearEditor: PropTypes.func.isRequired,
  isSidebarVisible: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default AiSidebar;