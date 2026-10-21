import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRIORITIES } from '../data.js'

function AddTask({ onAdd }) {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [assignee, setAssignee] = useState('')
  const [priority, setPriority] = useState('Trung bình')
  const [hours, setHours] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!title.trim() || !assignee.trim() || !hours) {
      setError('Vui lòng nhập đầy đủ thông tin phía trên form.')
      return
    }

    const numericHours = Number(hours)
    if (!Number.isInteger(numericHours) || numericHours < 1 || numericHours > 40) {
      setError('Số giờ phải từ 1 đến 40')
      return
    }

    onAdd({
      id: Date.now(),
      title: title.trim(),
      assignee: assignee.trim(),
      priority,
      hours: numericHours,
      done: false,
    })
    navigate('/tasks', { replace: true })
  }

  return (
    <section>
      <h1>Thêm công việc mới</h1>
      <form className="task-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="task-title">
          Tên công việc
          <input
            id="task-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label htmlFor="task-assignee">
          Người làm
          <input
            id="task-assignee"
            value={assignee}
            onChange={(event) => setAssignee(event.target.value)}
          />
        </label>
        <label htmlFor="task-priority">
          Mức ưu tiên
          <select
            id="task-priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            {PRIORITIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="task-hours">
          Số giờ ước tính
          <input
            id="task-hours"
            type="number"
            min="1"
            max="40"
            step="1"
            value={hours}
            onChange={(event) => setHours(event.target.value)}
          />
        </label>
        {error && <p role="alert">{error}</p>}
        <button type="submit">Thêm</button>
      </form>
    </section>
  )
}

export default AddTask