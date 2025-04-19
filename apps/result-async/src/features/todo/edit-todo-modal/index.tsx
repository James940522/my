'use client';

import { useState, useEffect } from 'react';
import { useModalActions, useModalData } from '@/shared/store/modalStore';
import { useUpdateTodo } from '@/entities/todo/api/query-options';
import { Todo } from '@/entities/todo/model';

export const EditTodoModal = () => {
  const { closeModal } = useModalActions();
  const { modalProps } = useModalData();
  const updateTodoMutation = useUpdateTodo();
  
  const todo = modalProps['EDIT_TODO']?.todo as Todo | undefined;
  
  const [title, setTitle] = useState('');
  
  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
    }
  }, [todo]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (todo && title.trim()) {
      updateTodoMutation.mutate(
        {
          id: parseInt(todo.id),
          title,
          completed: todo.completed
        },
        {
          onSuccess: () => {
            closeModal('EDIT_TODO');
          },
        }
      );
    }
  };
  
  if (!todo) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">할일 수정</h2>
        
        {updateTodoMutation.isPending && (
          <div className="mb-4 text-blue-500">저장 중...</div>
        )}
        
        {updateTodoMutation.isError && (
          <div className="mb-4 text-red-500">
            오류 발생: {updateTodoMutation.error?.message || '할일을 수정하는데 실패했습니다.'}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="edit-title" className="block mb-2 font-medium">
              제목
            </label>
            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => closeModal('EDIT_TODO')}
              className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={updateTodoMutation.isPending}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 