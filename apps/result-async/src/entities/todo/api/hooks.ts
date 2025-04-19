import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {  CreateTodoRequest, UpdateTodoRequest } from '../model';
import { TodoAPI } from './todoApi';


// 커스텀 훅
export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => TodoAPI.getTodos(),
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newTodo: CreateTodoRequest) => TodoAPI.createTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (updateData: UpdateTodoRequest) => TodoAPI.updateTodo(updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string | number) => TodoAPI.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}; 