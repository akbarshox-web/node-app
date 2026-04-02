import { DarkModeToggle } from './DarkModeToggle'
import { SearchBar } from './SearchBar'
import { FilterBar } from './FilterBar'

export function Header({ isDark, onDarkToggle, search, onSearch, category, onCategory }) {
  return (
    <header className="header">
      <div className="header-top">
        <h1>Notes</h1>
        <DarkModeToggle isDark={isDark} onToggle={onDarkToggle} />
      </div>
      <SearchBar value={search} onChange={onSearch} />
      <FilterBar active={category} onChange={onCategory} />
    </header>
  )
}
