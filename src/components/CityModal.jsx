import { useState } from 'react'
import { motion } from 'framer-motion'

export function CityModal({ isOpen, city, onSave, onCancel }) {
  const isNew = !city?.id
  const [name, setName] = useState(city?.name || '')
  const [description, setDescription] = useState(city?.description || '')

  if (!isOpen) return null

  const handleSave = () => {
    if (!name.trim() && !description.trim()) return
    onSave({ id: city?.id, name, description })
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
        <h2>{isNew ? 'New City' : 'Edit City'}</h2>

        <div className="form-group">
          <input
            type="text"
            className="title-input"
            placeholder="City name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>

        <div className="form-group">
          <textarea
            className="content-input"
            placeholder="City description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
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
