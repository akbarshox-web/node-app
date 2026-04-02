import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Header } from './components/Header'
import { NotesGrid } from './components/NotesGrid'
import { NoteModal } from './components/NoteModal'
import { FAB } from './components/FAB'
import { useNotes } from './hooks/useNotes'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function App() {
  const {
    filteredNotes,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    addNote,
    updateNote,
    deleteNote,
  } = useNotes()

  const [isDark, setIsDark] = useLocalStorage('reakt-dark-mode', () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  const [modalOpen, setModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

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
      <Header
        isDark={isDark}
        onDarkToggle={() => setIsDark((d) => !d)}
        search={search}
        onSearch={setSearch}
        category={categoryFilter}
        onCategory={setCategoryFilter}
      />

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
    </div>
  )
}
