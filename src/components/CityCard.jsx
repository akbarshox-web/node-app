import { motion } from 'framer-motion'

function formatDate(isoString) {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function CityCard({ city, onEdit, onDelete, index }) {
  return (
    <motion.div
      className="city-card"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      layout
    >
      <div className="city-header">
        <h3 className="city-name">{city.name}</h3>
        <div className="city-actions">
          <button
            className="action-btn edit-btn"
            onClick={() => onEdit(city)}
            title="Edit"
          >
            ✏️
          </button>
          <button
            className="action-btn delete-btn"
            onClick={() => onDelete(city.id)}
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      <p className="city-description">{city.description}</p>

      <div className="city-footer">
        <span className="city-date">{formatDate(city.updatedAt)}</span>
      </div>
    </motion.div>
  )
}
