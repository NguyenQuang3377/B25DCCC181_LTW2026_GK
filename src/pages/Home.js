function Home({ tasks, loading, error }) {
  const completedCount = tasks.reduce(
    (count, task) => count + Number(task.done),
    0,
  )
  const totalHours = tasks.reduce((total, task) => total + task.hours, 0)

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
          <li>Đã xong: {completedCount}</li>
          <li>Tổng số giờ ước tính: {totalHours}</li>
        </ul>
      )}
    </section>
  )
}

export default Home