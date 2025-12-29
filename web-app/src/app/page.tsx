'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { Task, TaskCreate } from '../types/task'
import { taskService } from '../services/taskService'

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const tasksData = await taskService.getAllTasks()
      setTasks(tasksData)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (taskData: TaskCreate) => {
    try {
      await taskService.createTask(taskData)
      fetchTasks() // Refresh tasks from server after adding
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const updateTask = async (updatedTask: Task) => {
    try {
      await taskService.updateTask(updatedTask.id, {
        description: updatedTask.description
      })
      fetchTasks() // Refresh tasks from server after updating
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const deleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id)
      fetchTasks() // Refresh tasks from server after deleting
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const toggleTaskCompletion = async (id: string) => {
    try {
      const task = tasks.find(t => t.id === id)
      if (task) {
        await taskService.completeTask(id, !task.completed)
        fetchTasks() // Refresh tasks from server after toggling completion
      }
    } catch (error) {
      console.error('Error toggling task completion:', error)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Todo App</h1>
          <p className="text-slate-300">Manage your tasks efficiently</p>
        </div>

        <div className="bg-slate-800 rounded-xl shadow-lg p-6 mb-8">
          <TaskForm onTaskAdded={addTask} />
        </div>

        {loading ? (
          <div className="text-center text-slate-400">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={tasks}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
            onToggleCompletion={toggleTaskCompletion}
          />
        )}
      </div>
    </div>
  )
}