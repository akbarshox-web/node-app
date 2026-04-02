import { motion } from 'framer-motion'

export function FAB({ onClick }) {
  return (
    <motion.button
      className="fab"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
    >
      +
    </motion.button>
  )
}
