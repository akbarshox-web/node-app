import { CATEGORIES } from '../constants'

export function FilterBar({ active, onChange }) {
  return (
    <div className="filters">
      <button
        className={`filter-btn ${active === 'All' ? 'active' : ''}`}
        onClick={() => onChange('All')}
      >
        All
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={`filter-btn ${active === cat ? 'active' : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
