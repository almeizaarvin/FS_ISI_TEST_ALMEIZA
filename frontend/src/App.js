"use client"

import { useState, useEffect } from "react"
import { Pencil, X, Check } from "lucide-react"

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [newTitle, setNewTitle] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = () => {
    fetch("http://localhost:80/tasks")
      .then((res) => res.json())
      .then(setTasks)
      .catch(console.error)
  }

  const addTask = () => {
    if (!title.trim()) return
    fetch("http://localhost:80/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        status: "pending",
        created_at: new Date().toISOString(),
      }),
    }).then(() => {
      setTitle("")
      fetchTasks()
    }).catch(console.error)
  }

  const deleteTask = (id) => {
    fetch(`http://localhost:80/tasks/${id}`, { method: "DELETE" })
      .then(fetchTasks)
      .catch(console.error)
  }

  const completeTask = (task) => {
    fetch(`http://localhost:80/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: task.title,
        status: "completed",
        created_at: task.created_at,
      }),
    }).then(fetchTasks)
      .catch(console.error)
  }

  const editTask = (task) => {
    setEditingTask(task)
    setNewTitle(task.title)
    setIsEditing(true)
  }

  const updateTask = () => {
    if (!newTitle.trim()) return
    fetch(`http://localhost:80/tasks/${editingTask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        status: editingTask.status,
        created_at: editingTask.created_at,
      }),
    }).then(() => {
      setIsEditing(false)
      setNewTitle("")
      fetchTasks()
    }).catch(console.error)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).replace(",", "")
  }

  const ongoingTasks = tasks.filter((t) => t.status === "pending")
  const completedTasks = tasks.filter((t) => t.status === "completed")

  return (
    <main className="max-w-lg mx-auto py-8 px-6">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold">Task List</h1>
      </header>

      <section className="mb-12">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="New Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2"
          >
            Add Task
          </button>
        </div>
      </section>

      {isEditing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-md shadow-md w-72">
            <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border rounded-md p-2 w-full mb-4 focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black rounded-md px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={updateTask}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Ongoing</h2>
        <div className="space-y-4">
          {ongoingTasks.map((task) => (
            <div key={task.id} className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
              <div>
                <p className="text-base">{task.title}</p>
                <small className="text-gray-500">{formatDate(task.created_at)}</small>
              </div>
              <div className="flex gap-2 items-center">
                <button onClick={() => editTask(task)}>
                  <Pencil className="w-4 h-4 text-gray-700" />
                </button>
                <button onClick={() => deleteTask(task.id)}>
                  <X className="w-4 h-4 text-red-500" />
                </button>
                <button onClick={() => completeTask(task)} className="border rounded-full p-1 hover:bg-gray-200">
                  {/* Empty circle */}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Completed</h2>
        <div className="space-y-4">
          {completedTasks.map((task) => (
            <div key={task.id} className="bg-gray-200 p-4 rounded-md flex justify-between items-center">
              <div>
                <p className="line-through">{task.title}</p>
                <small className="text-gray-500">{formatDate(task.created_at)}</small>
              </div>
              <div className="flex gap-2 items-center">
                <button onClick={() => editTask(task)}>
                  <Pencil className="w-4 h-4 text-gray-700" />
                </button>
                <button onClick={() => deleteTask(task.id)}>
                  <X className="w-4 h-4 text-red-500" />
                </button>
                <div className="border rounded-full p-1">
                  <Check className="w-4 h-4 text-green-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
