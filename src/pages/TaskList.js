import { useState } from 'react'
import FilterBar from '../components/FilterBar.js'
import TaskTable from '../components/TaskTable.js'

function TaskList({ tasks, loading, error, onToggle, onDelete }) {
  const [search, setSearch] = useState('')
  const [priority, setPriority] = useState('')

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLocaleLowerCase('vi')
      .includes(search.trim().toLocaleLowerCase('vi'))
    const matchesPriority = !priority || task.priority === priority
    return matchesSearch && matchesPriority
  })

  return (
    <section>
      <h1>Danh sách công việc</h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <>
          <FilterBar
            search={search}
            priority={priority}
            onSearchChange={setSearch}
            onPriorityChange={setPriority}
          />
          <p>Số công việc tìm thấy: {filteredTasks.length}</p>
          <TaskTable
            tasks={filteredTasks}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        </>
      )}
    </section>
  )
}

export default TaskList