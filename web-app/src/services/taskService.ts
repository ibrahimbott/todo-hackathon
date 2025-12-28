import { Task, TaskCreate, TaskUpdate } from '@/types/task'

const API_BASE_URL = 'http://localhost:8000/api'

class TaskService {
  async getAllTasks(): Promise<Task[]> {
    const response = await fetch(`${API_BASE_URL}/tasks`)
    if (!response.ok) {
      throw new Error('Failed to fetch tasks')
    }
    return response.json()
  }

  async createTask(taskData: TaskCreate): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    })
    if (!response.ok) {
      throw new Error('Failed to create task')
    }
    return response.json()
  }

  async updateTask(id: string, taskData: TaskUpdate): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    })
    if (!response.ok) {
      throw new Error('Failed to update task')
    }
    return response.json()
  }

  async completeTask(id: string, completed: boolean): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}/complete`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    })
    if (!response.ok) {
      throw new Error('Failed to update task completion status')
    }
    return response.json()
  }

  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete task')
    }
  }
}

export const taskService = new TaskService()