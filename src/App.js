import { useEffect, useState } from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.js'
import AddTask from './pages/AddTask.js'
import Home from './pages/Home.js'
import TaskDetail from './pages/TaskDetail.js'
import TaskList from './pages/TaskList.js'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadTasks = async () => {
      try {
        const response = await axios.get('/data/tasks.json', {
          signal: controller.signal,
        })
        setTasks(response.data)
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

  const addTask = (task) => {
    setTasks((currentTasks) => [...currentTasks, task])
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
