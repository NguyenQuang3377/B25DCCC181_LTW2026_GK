import { PRIORITIES } from '../data.js'

function FilterBar({ search, priority, onSearchChange, onPriorityChange }) {
  return (
    <div className="filters">
      <label htmlFor="task-search">
        Tìm kiếm
        <input
          id="task-search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Tên công việc"
        />
      </label>
      <label htmlFor="task-priority">
        Mức ưu tiên
        <select
          id="task-priority"
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