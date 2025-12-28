import { Task } from '@/types/task'
import TaskItem from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  onUpdateTask: (task: Task) => void
  onDeleteTask: (id: string) => void
  onToggleCompletion: (id: string) => void
}

export default function TaskList({
  tasks,
  onUpdateTask,
  onDeleteTask,
  onToggleCompletion
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl shadow-lg p-8 text-center">
        <h3 className="text-xl font-medium text-slate-300 mb-2">No tasks yet</h3>
        <p className="text-slate-400">Add a new task to get started!</p>
      </div>
    )
  }

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden">
      <div className="divide-y divide-slate-700">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
            onToggleCompletion={onToggleCompletion}
          />
        ))}
      </div>
    </div>
  )
}