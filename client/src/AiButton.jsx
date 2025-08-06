import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';

function AiButton({ label, icon, onClick, isLoading, promptType }) {
  const isAiButton = ['continue', 'summarize', 'improve', 'rewrite', 'generateTitle'].includes(promptType);

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-center p-2 rounded-lg text-white font-semibold shadow-md transition duration-300
        ${isAiButton ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-500 hover:bg-gray-600'}
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      disabled={isLoading}
    >
      {isLoading ? (
        <FaSpinner className="animate-spin" />
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
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