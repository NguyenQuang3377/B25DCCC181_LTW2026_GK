import { Link } from 'react-router-dom'

function TaskRow({ task, onToggle, onDelete }) {
  return (
    <tr className={task.done ? 'task-done' : undefined}>
      <td>
        <Link to={`/tasks/${task.id}`}>{task.title}</Link>
      </td>
      <td>{task.assignee}</td>
      <td>{task.priority}</td>
      <td>{task.hours}</td>
      <td>{task.done ? 'Đã xong' : 'Đang làm'}</td>
      <td className="actions">
        <button type="button" onClick={() => onToggle(task.id)}>
          {task.done ? 'Làm lại' : 'Hoàn thành'}
        </button>
        <button type="button" onClick={() => onDelete(task.id)}>
          Xóa
        </button>
      </td>
    </tr>
  )
}

export default TaskRow