import TaskRow from './TaskRow.js'

function TaskTable({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p>Không có công việc phù hợp.</p>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Công việc</th>
          <th>Người làm</th>
          <th>Ưu tiên</th>
          <th>Số giờ</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  )
}

export default TaskTable