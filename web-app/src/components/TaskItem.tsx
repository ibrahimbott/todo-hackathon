import { useState } from 'react'
import { Check, Trash2, Square } from 'lucide-react'
import { Task } from '@/types/task'

interface TaskItemProps {
  task: Task
  onUpdate: (task: Task) => void
  onDelete: (id: string) => void
  onToggleCompletion: (id: string) => void
}

export default function TaskItem({
  task,
  onUpdate,
  onDelete,
  onToggleCompletion
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(task.description)

  const handleEdit = () => {
    if (editValue.trim() && editValue !== task.description) {
      onUpdate({ ...task, description: editValue.trim() })
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(task.description)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <div className={`p-4 flex items-center gap-4 ${task.completed ? 'bg-slate-750' : 'bg-slate-800'}`}>
      <button
        onClick={() => onToggleCompletion(task.id)}
        className={`flex-shrink-0 w-6 h-6 rounded border flex items-center justify-center ${
          task.completed
            ? 'bg-indigo-600 border-indigo-600'
            : 'border-slate-500 hover:border-indigo-500'
        }`}
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {task.completed && <Check size={16} className="text-white" />}
      </button>

      <div className="flex-grow">
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleEdit}
            autoFocus
            className="w-full px-3 py-1 bg-slate-700 text-white rounded border border-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        ) : (
          <div
            className={`cursor-pointer ${task.completed ? 'line-through text-slate-400' : 'text-slate-200'}`}
            onClick={() => setIsEditing(true)}
          >
            {task.description}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 text-slate-400 hover:text-red-400 rounded-full hover:bg-slate-700 transition-colors"
          aria-label="Delete task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}