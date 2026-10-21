import TaskRow from './TaskRow.js'

function TaskTable({ tasks, onToggle, onDelete }) {
  return (
    <table>
      <colgroup>
        <col className="task-column" />
        <col className="assignee-column" />
        <col className="priority-column" />
        <col className="hours-column" />
        <col className="status-column" />
        <col className="actions-column" />
      </colgroup>
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
        {tasks.length === 0 ? (
          <tr>
            <td colSpan="6">Không có dữ liệu.</td>
          </tr>
        ) : (
          tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        )}
      </tbody>
    </table>
  )
}

export default TaskTable