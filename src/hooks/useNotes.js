import { useState, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'

function generateId() {
  return crypto.randomUUID()
}

export function useNotes() {
  const [notes, setNotes] = useLocalStorage('reakt-notes', [])
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        categoryFilter === 'All' || note.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [notes, search, categoryFilter])

  const addNote = ({ title, content, category }) => {
    const newNote = {
      id: generateId(),
      title: title.trim() || 'Untitled',
      content: content.trim(),
      category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setNotes((prev) => [newNote, ...prev])
  }

  const updateNote = (id, { title, content, category }) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              title: title.trim() || 'Untitled',
              content: content.trim(),
              category,
              updatedAt: new Date().toISOString(),
            }
          : n
      )
    )
  }

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  return {
    notes,
    filteredNotes,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    addNote,
    updateNote,
    deleteNote,
  }
}
