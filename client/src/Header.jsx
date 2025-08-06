import PropTypes from 'prop-types';
import { FaMoon, FaSun, FaBars } from 'react-icons/fa';

export default function Header({
  isDarkMode,
  toggleDarkMode,
  toggleSidebar,
  title,
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-900 dark:text-white">
            <FaBars />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Smart Scribe</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-900 dark:text-white"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};