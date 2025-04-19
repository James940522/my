import { ResultAsync } from 'neverthrow';
import { ClientInstance } from '@/shared/config/axios/client';
import { ApiError, handleApiError } from '@/shared/config/axios/error';
import { QueryParams } from '@/shared/model/types';
import { 
  CreateTodoRequest, 
  Todo, 
  UpdateTodoRequest 
} from '../model';

// 임시 데이터 (실제로는 서버에서 가져옴)
let todos: Todo[] = [
  { id: "1", title: "할 일 1", completed: false, createdAt: new Date().toISOString() },
  { id: "2", title: "할 일 2", completed: true, createdAt: new Date().toISOString() },
  { id: "3", title: "할 일 3", completed: false, createdAt: new Date().toISOString() },
];

// 지연 시간을 위한 헬퍼 함수
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/** GET: Todo 목록 조회 */
const getTodos = async (queryParams?: QueryParams): Promise<Todo[]> => {
  console.log('getTodos', queryParams);
  await delay(500); // 네트워크 지연 시뮬레이션
  return [...todos];
};

/** GET: Todo 상세 조회 */
const getTodoById = (
  id: number
): ResultAsync<Todo, ApiError> => {
  return ResultAsync.fromPromise(
    ClientInstance.get(`/todos/${id}`).then((response) => response.data),
    (error) => handleApiError(error).default('Todo 정보를 불러오는데 실패했습니다.')
  );
};

/** POST: Todo 생성 */
const createTodo = async (newTodo: CreateTodoRequest): Promise<Todo> => {
  await delay(500);
  const todo: Todo = {
    id: Date.now().toString(),
    title: newTodo.title,
    completed: newTodo.completed || false,
    createdAt: new Date().toISOString(),
  };
  todos = [...todos, todo];
  return todo;
};

/** PUT: Todo 수정 */
const updateTodo = async (updateData: UpdateTodoRequest): Promise<Todo> => {
  await delay(500);
  const todoToUpdate = todos.find(t => t.id === updateData.id.toString());
  
  if (!todoToUpdate) {
    throw new Error(`Todo with ID ${updateData.id} not found`);
  }
  
  const updatedTodo: Todo = {
    ...todoToUpdate,
    title: updateData.title !== undefined ? updateData.title : todoToUpdate.title,
    completed: updateData.completed !== undefined ? updateData.completed : todoToUpdate.completed,
  };
  
  todos = todos.map(t => (t.id === updatedTodo.id ? updatedTodo : t));
  return updatedTodo;
};

/** PATCH: Todo 부분 수정 (완료 상태만 변경) */
const toggleTodoComplete = (
  id: number, 
  completed: boolean
): ResultAsync<Todo, ApiError> => {
  return ResultAsync.fromPromise(
    ClientInstance.patch(`/todos/${id}`, { completed }).then((response) => response.data),
    (error) => handleApiError(error).default('Todo 상태 변경에 실패했습니다.')
  );
};

/** DELETE: Todo 삭제 */
const deleteTodo = async (id: string | number): Promise<void> => {
  await delay(500);
  const idStr = typeof id === 'number' ? id.toString() : id;
  todos = todos.filter(t => t.id !== idStr);
};

export const TodoAPI = {
  getTodos,
  getTodoById, 
  createTodo,
  updateTodo,
  toggleTodoComplete,
  deleteTodo
}; 