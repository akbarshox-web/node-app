import { AnimatePresence, motion } from 'framer-motion'
import { NoteCard } from './NoteCard'

export function NotesGrid({ notes, onEdit, onDelete }) {
  if (notes.length === 0) {
    return (
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">📝</div>
        <p>No notes found</p>
        <p className="empty-hint">Create a new note to get started</p>
      </motion.div>
    )
  }

  return (
    <div className="notes-grid">
      <AnimatePresence>
        {notes.map((note, index) => (
          <NoteCard
            key={note.id}
            note={note}
            index={index}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
