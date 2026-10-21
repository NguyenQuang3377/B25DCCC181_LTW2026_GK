import { useNavigate, useParams } from 'react-router-dom'

function TaskDetail({ tasks, loading, error }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const task = tasks.find((item) => item.id === Number(id))

  if (loading) {
    return <p>Đang tải...</p>
  }

  if (error) {
    return <p role="alert">{error}</p>
  }

  if (!task) {
    return (
      <section>
        <p>Không tìm thấy công việc.</p>
        <button type="button" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </section>
    )
  }

  return (
    <section>
      <h1>Chi tiết công việc</h1>
      <p>
        <strong>Tên công việc:</strong> {task.title}
      </p>
      <p>
        <strong>Người làm:</strong> {task.assignee}
      </p>
      <p>
        <strong>Mức ưu tiên:</strong> {task.priority}
      </p>
      <p>
        <strong>Số giờ:</strong> {task.hours}
      </p>
      <p>
        <strong>Trạng thái:</strong> {task.done ? 'Đã xong' : 'Đang làm'}
      </p>
      <button type="button" onClick={() => navigate(-1)}>
        Quay lại
      </button>
    </section>
  )
}

export default TaskDetail