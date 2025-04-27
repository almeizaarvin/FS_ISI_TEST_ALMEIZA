"use client"

import { useState, useEffect } from "react"
import { Pencil, X, Check } from "lucide-react"
import "./App.css"

function App() {
  const [tasks, setTasks] = useState([])  
  const [title, setTitle] = useState("") 


  useEffect(() => {
    fetch("http://localhost:80/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data) 
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error)
      })
  }, []) 


  const addTask = () => {
    if (title.trim() === "") return

    const newTask = {
      title: title,
      status: "pending",
      created_at: new Date().toISOString(), 
    }


    fetch("http://localhost:80/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks([...tasks, data]) 
        setTitle("")
      })
      .catch((error) => {
        console.error("Error adding task:", error)
      })
  }

  const deleteTask = (id) => {
  }

  const toggleTaskStatus = (id) => {
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date)
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")

    return `${day} ${month} ${year} ${hours}:${minutes}`
  }

  const ongoingTasks = tasks.filter((task) => !task.completed)
  const completedTasks = tasks.filter((task) => task.completed)

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Task Management</h1>

      <div className="mb-6">
        <label className="block mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-3"
        />
        <div className="flex justify-center">
          <button onClick={addTask} className="bg-blue-400 text-white py-1 px-4 rounded">
            Add Task
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="font-bold mb-2">Ongoing Task</h2>
        {ongoingTasks.map((task) => (
          <div key={task.id} className="bg-gray-300 rounded p-3 mb-2 flex justify-between items-center">
            <div>
              <div className="flex items-center">
                <span>{task.title}</span>
                <Pencil className="h-4 w-4 ml-2" />
              </div>
              <div className="text-xs text-gray-600">{formatDate(task.created_at)}</div>
            </div>
            <div className="flex space-x-1">
              <button onClick={() => deleteTask(task.id)} className="bg-white rounded-full p-1">
                <X className="h-4 w-4" />
              </button>
              <button onClick={() => toggleTaskStatus(task.id)} className="bg-white rounded-full p-1">
                <Check className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="font-bold mb-2">Completed Task</h2>
        {completedTasks.map((task) => (
          <div key={task.id} className="bg-gray-300 rounded p-3 mb-2 flex justify-between items-center">
            <div>
              <div className="flex items-center">
                <span>{task.title}</span>
                <Pencil className="h-4 w-4 ml-2" />
              </div>
              <div className="text-xs text-gray-600">{formatDate(task.created_at)}</div>
            </div>
            <div className="flex space-x-1">
              <button onClick={() => deleteTask(task.id)} className="bg-white rounded-full p-1">
                <X className="h-4 w-4" />
              </button>
              <button onClick={() => toggleTaskStatus(task.id)} className="bg-white rounded-full p-1">
                <Check className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
