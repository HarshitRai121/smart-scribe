import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';

function AiButton({ label, icon, onClick, isLoading, promptType }) {
  const isAiButton = ['continue', 'summarize', 'improve', 'rewrite', 'generateTitle', 'checkSpelling', 'changeTone'].includes(promptType);
  const isAction = ['save', 'load', 'export-txt', 'export-md', 'clear'].includes(promptType);

  const baseClasses = `w-full flex items-center justify-center px-3 py-2 text-sm rounded-md font-semibold transition duration-300`;

  return (
    <button
      onClick={onClick}
      className={`${baseClasses}
        ${isAiButton ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : ''}
        ${isAction ? 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white' : ''}
        ${!isAiButton && !isAction ? 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white' : ''}
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      disabled={isLoading}
    >
      {isLoading ? (
        <FaSpinner className="animate-spin text-lg" />
      ) : (
        <>
          {icon && <span className="mr-2 text-base">{icon}</span>}
          {label}
        </>
      )}
    </button>
  );
}

AiButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  promptType: PropTypes.string,
};

export default AiButton;