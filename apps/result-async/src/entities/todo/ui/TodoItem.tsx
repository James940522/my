'use client';

import { Todo } from '../model';
import { useUpdateTodo, useDeleteTodo } from '../api/query-options';
import { useModalActions } from '@/shared/store/modalStore';
import { useState } from 'react';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { openModal } = useModalActions();
  const { mutate: updateTodo, isPending: isUpdating } = useUpdateTodo();
  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();
  
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  
  const handleToggleComplete = () => {
    updateTodo({
      id: parseInt(todo.id),
      completed: !todo.completed,
      title: todo.title
    });
  };

  const handleDelete = () => {
    deleteTodo(parseInt(todo.id));
  };

  const handleEdit = () => {
    openModal('EDIT_TODO', { todo });
  };
  
  const handleDeleteClick = () => {
    setIsConfirmingDelete(true);
  };
  
  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm transition-colors bg-white dark:bg-gray-800">
      <div className="flex items-center space-x-3">
        <input
          id={`todo-${todo.id}`}
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          disabled={isUpdating}
          className="h-5 w-5 text-green-600 rounded"
          title={`할일 완료 여부: ${todo.title}`}
        />
        <label htmlFor={`todo-${todo.id}`} className="sr-only">
          {todo.title} 완료 여부
        </label>
        <span 
          className={`text-md ${todo.completed ? 'line-through text-gray-500' : ''}`}
        >
          {todo.title}
        </span>
      </div>
      
      <div className="flex space-x-2">
        {isConfirmingDelete ? (
          <>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
            >
              확인
            </button>
            <button
              onClick={handleCancelDelete}
              className="px-3 py-1 text-xs bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              취소
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              수정
            </button>
            <button
              onClick={handleDeleteClick}
              className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
            >
              삭제
            </button>
          </>
        )}
      </div>
    </div>
  );
}; 