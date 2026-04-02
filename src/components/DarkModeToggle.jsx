import { motion } from 'framer-motion'

export function DarkModeToggle({ isDark, onToggle }) {
  return (
    <motion.button
      className="dark-toggle"
      onClick={onToggle}
      aria-label="Toggle dark mode"
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
    >
      {isDark ? '☀️' : '🌙'}
    </motion.button>
  )
}
