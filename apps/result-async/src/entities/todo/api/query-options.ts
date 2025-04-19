import { toPromise } from '@/shared/config/axios/util/query';
import { QueryParams } from '@/shared/model/types';
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { TodoAPI } from './todoApi';
import { TodoQueryKeys } from './query-keys';
import { CreateTodoRequest, Todo, UpdateTodoRequest } from '../model';

export const TodoQueryOptions = {
  /** GET: Todo 목록 조회 */
  todoList: (queryParams?: QueryParams) =>
    queryOptions({
      queryKey: TodoQueryKeys.list(queryParams),
      queryFn: () => TodoAPI.getTodos(queryParams),
    }),

  /** GET: Todo 상세 조회 */
  todoById: (id: number) =>
    queryOptions({
      queryKey: TodoQueryKeys.detail(id),
      queryFn: () => toPromise(TodoAPI.getTodoById(id)),
    }),
} as const;

/** POST: Todo 생성 */
export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newTodo: CreateTodoRequest) => TodoAPI.createTodo(newTodo),
    onSuccess: () => {
      // Todo 리스트 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: TodoQueryKeys.lists(),
      });
    },
  });
};

/** PUT: Todo 수정 */
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (updateData: UpdateTodoRequest) => TodoAPI.updateTodo(updateData),
    onSuccess: (data: Todo) => {
      // 업데이트된 Todo의 상세 정보 무효화
      if (data && data.id) {
        const id = typeof data.id === 'string' ? parseInt(data.id) : data.id;
        queryClient.invalidateQueries({
          queryKey: TodoQueryKeys.detail(id),
        });
      }
      // Todo 리스트 쿼리도 무효화
      queryClient.invalidateQueries({
        queryKey: TodoQueryKeys.lists(),
      });
    },
  });
};

/** PATCH: Todo 완료 상태 토글 */
export const useToggleTodoComplete = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({id, completed}: {id: number, completed: boolean}) => 
      toPromise(TodoAPI.toggleTodoComplete(id, completed)),
    onSuccess: (data: Todo) => {
      // 업데이트된 Todo의 상세 정보 무효화
      if (data && data.id) {
        const id = typeof data.id === 'string' ? parseInt(data.id) : data.id;
        queryClient.invalidateQueries({
          queryKey: TodoQueryKeys.detail(id),
        });
      }
      // Todo 리스트 쿼리도 무효화
      queryClient.invalidateQueries({
        queryKey: TodoQueryKeys.lists(),
      });
    },
  });
};

/** DELETE: Todo 삭제 */
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => TodoAPI.deleteTodo(id),
    onSuccess: (_: void, id: number) => {
      // Todo 리스트 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: TodoQueryKeys.lists(),
      });
      // 삭제된 Todo의 상세 정보도 무효화
      queryClient.invalidateQueries({
        queryKey: TodoQueryKeys.detail(id),
      });
    },
  });
}; 