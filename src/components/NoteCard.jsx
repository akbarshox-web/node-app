import { motion } from 'framer-motion'
import { CATEGORY_COLORS } from '../constants'

function formatDate(isoString) {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function NoteCard({ note, onEdit, onDelete, index }) {
  const catColor = CATEGORY_COLORS[note.category] || '#7c5cff'

  return (
    <motion.div
      className={`note-card category-${note.category.toLowerCase()}`}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      layout
      style={{ '--cat-color': catColor }}
    >
      <div className="note-header">
        <span className="note-category">{note.category}</span>
        <div className="note-actions">
          <button
            className="action-btn edit-btn"
            onClick={() => onEdit(note)}
            title="Edit"
          >
            ✏️
          </button>
          <button
            className="action-btn delete-btn"
            onClick={() => onDelete(note.id)}
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">{note.content}</p>

      <div className="note-footer">
        <span className="note-date">{formatDate(note.updatedAt)}</span>
      </div>
    </motion.div>
  )
}
