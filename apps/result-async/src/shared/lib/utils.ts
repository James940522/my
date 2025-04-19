import { ResultAsync } from 'neverthrow';
import { ApiError } from '@/shared/config/axios/error';
import { Todo } from '@/entities/todo/model';
import { TodoAPI } from '@/entities/todo/api/todoApi';

// Todo 요약 정보 계산
export const calculateTodoSummary = (todos: Todo[]) => {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const pending = total - completed;
  
  return {
    total,
    completed,
    pending
  };
};

// 유저 데이터 프로미스 캐싱 (React19 use() 훅 데모용)
const userDataPromiseCache = new Map<number, ResultAsync<Todo, ApiError>>();

export const getUserDataPromise = (userId: number): ResultAsync<Todo, ApiError> => {
  if (!userDataPromiseCache.has(userId)) {
    userDataPromiseCache.set(userId, TodoAPI.getTodoById(userId));
  }
  return userDataPromiseCache.get(userId)!;
}; 