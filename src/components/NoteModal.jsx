import { useState } from 'react'
import { motion } from 'framer-motion'
import { CATEGORIES } from '../constants'

export function NoteModal({ isOpen, note, onSave, onCancel }) {
  const isNew = !note?.id
  const [title, setTitle] = useState(note?.title || '')
  const [content, setContent] = useState(note?.content || '')
  const [category, setCategory] = useState(note?.category || CATEGORIES[0])

  if (!isOpen) return null

  const handleSave = () => {
    if (!title.trim() && !content.trim()) return
    onSave({ id: note?.id, title, content, category })
  }

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <motion.div
        className="modal"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <h2>{isNew ? 'New Note' : 'Edit Note'}</h2>

        <div className="form-group">
          <input
            type="text"
            className="title-input"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </div>

        <div className="form-group">
          <textarea
            className="content-input"
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <div className="category-select">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`cat-btn ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-save" onClick={handleSave}>
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
