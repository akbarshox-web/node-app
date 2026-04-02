import { useState, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'

function generateId() {
  return crypto.randomUUID()
}

export function useCities() {
  const [cities, setCities] = useLocalStorage('reakt-cities', [])
  const [search, setSearch] = useState('')

  const filteredCities = useMemo(() => {
    if (!search.trim()) return cities
    return cities.filter((city) =>
      city.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [cities, search])

  const addCity = ({ name, description }) => {
    const newCity = {
      id: generateId(),
      name: name.trim() || 'Nameless City',
      description: description.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setCities((prev) => [newCity, ...prev])
  }

  const updateCity = (id, { name, description }) => {
    setCities((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              name: name.trim() || 'Nameless City',
              description: description.trim(),
              updatedAt: new Date().toISOString(),
            }
          : c
      )
    )
  }

  const deleteCity = (id) => {
    setCities((prev) => prev.filter((c) => c.id !== id))
  }

  const getCityById = (id) => cities.find((c) => c.id === id)

  return {
    cities,
    filteredCities,
    search,
    setSearch,
    addCity,
    updateCity,
    deleteCity,
    getCityById,
  }
}
