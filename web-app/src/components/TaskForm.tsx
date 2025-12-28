'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { TaskCreate } from '@/types/task'

interface TaskFormProps {
  onTaskAdded: (task: TaskCreate) => void
}

export default function TaskForm({ onTaskAdded }: TaskFormProps) {
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (description.trim()) {
      const newTask: TaskCreate = {
        description: description.trim()
      }

      onTaskAdded(newTask)
      setDescription('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="flex-grow">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a new task..."
          className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 flex items-center gap-2"
      >
        <Plus size={20} />
        Add
      </button>
    </form>
  )
}