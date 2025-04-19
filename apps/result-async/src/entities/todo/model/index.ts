export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface CreateTodoRequest {
  userId: number;
  title: string;
  completed?: boolean;
}

export interface UpdateTodoRequest {
  id: number;
  title?: string;
  completed?: boolean;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

export interface TodoSummary {
  total: number;
  completed: number;
  pending: number;
} 