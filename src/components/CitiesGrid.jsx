import { AnimatePresence, motion } from 'framer-motion'
import { CityCard } from './CityCard'

export function CitiesGrid({ cities, onEdit, onDelete }) {
  if (cities.length === 0) {
    return (
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">🏙️</div>
        <p>No cities found</p>
        <p className="empty-hint">Add a city to get started</p>
      </motion.div>
    )
  }

  return (
    <div className="cities-grid">
      <AnimatePresence>
        {cities.map((city, index) => (
          <CityCard
            key={city.id}
            city={city}
            index={index}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
