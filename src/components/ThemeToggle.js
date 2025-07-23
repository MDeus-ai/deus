import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 flex items-center rounded-full p-1 cursor-pointer bg-text-primary dark:bg-surface border-2 border-text-primary dark:border-border"
      aria-label="Toggle dark mode"
    >
      <motion.div
        className="w-6 h-6 bg-accent rounded-full"
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        style={{ x: theme === 'light' ? 0 : 24 }}
      >
        <div className="flex items-center justify-center h-full">
          {theme === 'light' ? <Sun size={16} className="text-accent-text" /> : <Moon size={16} className="text-accent-text" />}
        </div>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;