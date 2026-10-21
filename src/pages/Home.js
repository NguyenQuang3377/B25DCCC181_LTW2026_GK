function Home({ tasks, loading, error }) {
  const completedCount = tasks.reduce(
    (count, task) => count + Number(task.done),
    0,
  )
  const remainingHours = tasks.reduce(
    (total, task) => total + (task.done ? 0 : task.hours),
    0,
  )

  return (
    <section>
      <h1>Xin chào!!!</h1>
      <h2>Công việc nhóm</h2>
      {loading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <ul>
          <li>Tổng số công việc: {tasks.length}</li>
          <li>Số công việc đã xong: {completedCount}</li>
          <li>Tổng số giờ còn lại: {remainingHours}</li>
        </ul>
      )}
    </section>
  )
}

export default Home