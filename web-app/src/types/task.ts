export interface Task {
  id: string;
  description: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface TaskCreate {
  description: string;
}

export interface TaskUpdate {
  description?: string;
  completed?: boolean;
}