import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, Plus, Pencil, Trash2 } from 'lucide-react'
import { useNotes } from './hooks/useNotes'

function formatDate(isoString) {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const CATEGORIES = ['All', 'Work', 'Personal', 'Ideas', 'Important']

const CAT_COLORS = {
  Work: '#3b82f6',
  Personal: '#10b981',
  Ideas: '#f59e0b',
  Important: '#ef4444',
}

// ===== NoteCard =====
function NoteCard({ note, onEdit, onDelete, index }) {
  const catColor = CAT_COLORS[note.category] || '#10b981'
  const catClass = note.category?.toLowerCase() || 'personal'

  return (
    <motion.div
      className="note-card group"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      layout
      style={{ '--cat-color': catColor }}
    >
      <div className="flex justify-between items-start mb-3">
        <span className={`category-badge cat-${catClass}`}>{note.category}</span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="action-icon-btn" onClick={() => onEdit(note)} title="Edit">
            <Pencil size={14} />
          </button>
          <button className="action-icon-btn danger" onClick={() => onDelete(note.id)} title="Delete">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <h3 className="text-[15px] font-semibold text-[#f0f4f1] mb-2 leading-snug line-clamp-2">
        {note.title}
      </h3>
      <p className="text-[13px] text-[#8a9b8e] leading-relaxed line-clamp-4 mb-4">
        {note.content}
      </p>

      <div className="flex justify-end">
        <span className="text-[11px] text-[#5a6b5e]">{formatDate(note.updatedAt)}</span>
      </div>
    </motion.div>
  )
}

// ===== NotesGrid =====
function NotesGrid({ notes, onEdit, onDelete }) {
  if (notes.length === 0) {
    return (
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">📝</div>
        <p className="text-[16px] font-medium text-[#8a9b8e]">No notes found</p>
        <p className="text-[14px] text-[#5a6b5e]">Create a new note to get started</p>
      </motion.div>
    )
  }

  return (
    <div className="bento-grid">
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

// ===== NoteModal =====
function NoteModal({ isOpen, note, onSave, onCancel }) {
  const isNew = !note?.id
  const [title, setTitle] = useState(note?.title ?? '')
  const [content, setContent] = useState(note?.content ?? '')
  const [category, setCategory] = useState(note?.category ?? 'Personal')

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
        className="modal-content"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <h2 className="text-[22px] font-bold text-[#f0f4f1] mb-6">
          {isNew ? 'New Note' : 'Edit Note'}
        </h2>

        <div className="mb-4">
          <input
            type="text"
            className="input-field"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </div>

        <div className="mb-4">
          <textarea
            className="textarea-field"
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
          />
        </div>

        <div className="mb-6">
          <label className="block text-[12px] font-semibold text-[#5a6b5e] uppercase tracking-wider mb-3">
            Category
          </label>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.filter(c => c !== 'All').map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-pill ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ===== FAB =====
function FAB({ onClick }) {
  return (
    <motion.button
      className="fab-emerald fixed bottom-8 right-8 z-50"
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
    >
      <Plus size={28} strokeWidth={2.5} />
    </motion.button>
  )
}

// ===== BottomNav =====
const STATUS_DOTS = [
  { color: '#ef4444', label: 'red' },
  { color: '#f59e0b', label: 'yellow' },
  { color: '#22c55e', label: 'green' },
  { color: '#3b82f6', label: 'blue' },
  { color: '#e5e7eb', label: 'white' },
]

function BottomNav() {
  const [activeIndex, setActiveIndex] = useState(2)

  return (
    <motion.nav
      className="glass-nav fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
    >
      {STATUS_DOTS.map((dot, i) => (
        <button
          key={dot.label}
          className={`status-dot ${activeIndex === i ? 'active' : ''}`}
          style={{ backgroundColor: dot.color, color: dot.color }}
          onClick={() => setActiveIndex(i)}
          title={dot.label}
        />
      ))}
    </motion.nav>
  )
}

// ===== Header =====
function Header({ search, onSearch }) {
  return (
    <header className="pt-10 pb-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[32px] font-bold text-[#f8f9f7] tracking-tight">
          Notes
        </h1>
        <button className="avatar-circle" title="Profile">
          A
        </button>
      </div>

      <div className="relative mb-5">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5a6b5e]"
        />
        <input
          type="text"
          className="search-input pl-12"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-pill`}
            onClick={() => {}}
          >
            {cat}
          </button>
        ))}
      </div>
    </header>
  )
}

// ===== App =====
export default function App() {
  const {
    filteredNotes,
    search,
    setSearch,
    addNote,
    updateNote,
    deleteNote,
  } = useNotes()

  const [modalOpen, setModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)

  const handleAddNote = () => {
    setEditingNote({})
    setModalOpen(true)
  }

  const handleEditNote = (note) => {
    setEditingNote(note)
    setModalOpen(true)
  }

  const handleSaveNote = (data) => {
    if (data.id) {
      updateNote(data.id, data)
    } else {
      addNote(data)
    }
    setModalOpen(false)
    setEditingNote(null)
  }

  const handleCancelModal = () => {
    setModalOpen(false)
    setEditingNote(null)
  }

  return (
    <div className="app">
      <Header search={search} onSearch={setSearch} />

      <main>
        <NotesGrid
          notes={filteredNotes}
          onEdit={handleEditNote}
          onDelete={deleteNote}
        />
      </main>

      <AnimatePresence>
        {modalOpen && (
          <NoteModal
            isOpen={modalOpen}
            note={editingNote}
            onSave={handleSaveNote}
            onCancel={handleCancelModal}
          />
        )}
      </AnimatePresence>

      <FAB onClick={handleAddNote} />
      <BottomNav />
    </div>
  )
}
