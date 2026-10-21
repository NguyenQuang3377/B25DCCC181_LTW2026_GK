import { PRIORITIES } from '../data.js'

function FilterBar({ search, priority, onSearchChange, onPriorityChange }) {
  return (
    <div className="filters">
      <label>
        Tìm kiếm
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Tên công việc"
        />
      </label>
      <label>
        Mức ưu tiên
        <select
          value={priority}
          onChange={(event) => onPriorityChange(event.target.value)}
        >
          <option value="">Tất cả</option>
          {PRIORITIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default FilterBar