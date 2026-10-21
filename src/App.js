import { useEffect, useState } from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.js'
import AddTask from './pages/AddTask.js'
import Home from './pages/Home.js'
import TaskDetail from './pages/TaskDetail.js'
import TaskList from './pages/TaskList.js'

const STORAGE_KEY = 'gk_tasks'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadTasks = async () => {
      try {
        const savedTasks = localStorage.getItem(STORAGE_KEY)
        if (savedTasks !== null) {
          const parsedTasks = JSON.parse(savedTasks)
          if (!Array.isArray(parsedTasks)) {
            throw new Error('Dữ liệu công việc đã lưu không hợp lệ.')
          }
          setTasks(parsedTasks)
        } else {
          const response = await axios.get('/data/tasks.json', {
            signal: controller.signal,
          })
          if (!Array.isArray(response.data)) {
            throw new Error('Dữ liệu công việc tải về không hợp lệ.')
          }
          setTasks(response.data)
        }
      } catch (requestError) {
        if (!axios.isCancel(requestError)) {
          setError('Không tải được dữ liệu.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadTasks()

    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (loading || error) {
      return
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch {
      setError('Không lưu được dữ liệu.')
    }
  }, [tasks, loading, error])

  const addTask = (task) => {
    setTasks((currentTasks) => {
      const maxId = currentTasks.reduce(
        (max, currentTask) => Math.max(max, currentTask.id),
        0,
      )
      const nextId = maxId + 1

      return [...currentTasks, { ...task, id: nextId }]
    })
  }

  const toggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    )
  }

  const deleteTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<Home tasks={tasks} loading={loading} error={error} />}
        />
        <Route
          path="tasks"
          element={
            <TaskList
              tasks={tasks}
              loading={loading}
              error={error}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          }
        />
        <Route path="tasks/new" element={<AddTask onAdd={addTask} />} />
        <Route
          path="tasks/:id"
          element={<TaskDetail tasks={tasks} loading={loading} error={error} />}
        />
      </Route>
    </Routes>
  )
}

export default App
