'use client';

import { Todo } from '@/entities/todo/model';
import { useToggleTodoComplete, useDeleteTodo } from '@/entities/todo/api/query-options';
import { useModalActions } from '@/shared/store/modalStore';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { openModal } = useModalActions();
  const toggleCompleteMutation = useToggleTodoComplete();
  const deleteMutation = useDeleteTodo();

  const handleToggleComplete = () => {
    toggleCompleteMutation.mutate({
      id: parseInt(todo.id),
      completed: !todo.completed,
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate(parseInt(todo.id));
  };

  const handleEdit = () => {
    openModal('EDIT_TODO', { todo });
  };

  return (
    <div className="flex items-center p-4 border rounded-lg mb-2 hover:bg-gray-50 dark:hover:bg-gray-800">
      <div className="flex items-center">
        <input
          id={`todo-${todo.id}`}
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          className="h-5 w-5 text-blue-600 rounded"
          title={`할일 완료 여부: ${todo.title}`}
        />
        <label htmlFor={`todo-${todo.id}`} className="sr-only">
          {todo.title} 완료 여부
        </label>
      </div>
      <div className="ml-4 flex-1">
        <h3 className={`text-lg ${todo.completed ? 'line-through text-gray-500' : ''}`}>
          {todo.title}
        </h3>
        <p className="text-sm text-gray-600">ID: {todo.id}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleEdit}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          수정
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          삭제
        </button>
      </div>
    </div>
  );
}; 