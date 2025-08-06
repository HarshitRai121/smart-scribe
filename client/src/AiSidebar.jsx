import PropTypes from 'prop-types';
import AiButton from './AiButton';
import { FaMoon, FaSun, FaSave, FaFolderOpen, FaFileExport, FaCode, FaHeading, FaSpellCheck, FaPencilRuler } from 'react-icons/fa';

function AiSidebar({
  handleGenerateText,
  loading,
  handleSaveDocument,
  handleLoadDocument,
  handleExportDocument,
  handleExportMarkdown,
  isDarkMode,
  toggleDarkMode,
}) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg flex flex-col h-full dark:bg-gray-800 transition-colors duration-300">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">AI Assistant</h2>
      <div className="flex-grow space-y-2">
        <AiButton
          label="Continue Writing"
          promptType="continue"
          onClick={() => handleGenerateText('continue')}
          isLoading={loading.continue}
        />
        <AiButton
          label="Summarize"
          promptType="summarize"
          onClick={() => handleGenerateText('summarize')}
          isLoading={loading.summarize}
        />
        <AiButton
          label="Improve Writing"
          promptType="improve"
          onClick={() => handleGenerateText('improve')}
          isLoading={loading.improve}
        />
        <AiButton
          label="Rewrite"
          promptType="rewrite"
          onClick={() => handleGenerateText('rewrite')}
          isLoading={loading.rewrite}
        />
        <AiButton
          label="Generate Title"
          promptType="generateTitle"
          icon={<FaHeading />}
          onClick={() => handleGenerateText('generateTitle')}
          isLoading={loading.generateTitle}
        />
        <AiButton
          label="Check Spelling"
          promptType="checkSpelling"
          icon={<FaSpellCheck />}
          onClick={() => handleGenerateText('checkSpelling')}
          isLoading={loading.checkSpelling}
        />
        <AiButton
          label="Change Tone"
          promptType="changeTone"
          icon={<FaPencilRuler />}
          onClick={() => handleGenerateText('changeTone')}
          isLoading={loading.changeTone}
        />
      </div>

      <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-700 space-y-2">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Document Actions</h2>
        <AiButton
          label="Save Document"
          icon={<FaSave />}
          onClick={handleSaveDocument}
        />
        <AiButton
          label="Load Document"
          icon={<FaFolderOpen />}
          onClick={handleLoadDocument}
        />
        <AiButton
          label="Export as Text"
          icon={<FaFileExport />}
          onClick={handleExportDocument}
        />
        <AiButton
          label="Export as Markdown"
          icon={<FaCode />}
          onClick={handleExportMarkdown}
        />
      </div>

      <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-700">
        <AiButton
          label={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          icon={isDarkMode ? <FaSun /> : <FaMoon />}
          onClick={toggleDarkMode}
        />
      </div>
    </div>
  );
}

AiSidebar.propTypes = {
  handleGenerateText: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
  handleSaveDocument: PropTypes.func.isRequired,
  handleLoadDocument: PropTypes.func.isRequired,
  handleExportDocument: PropTypes.func.isRequired,
  handleExportMarkdown: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

export default AiSidebar;