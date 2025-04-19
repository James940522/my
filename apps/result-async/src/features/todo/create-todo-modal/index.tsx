'use client';

import { useState } from 'react';
import { useModalActions } from '@/shared/store/modalStore';
import { useCreateTodo } from '@/entities/todo/api/query-options';

export const CreateTodoModal = () => {
  const { closeModal } = useModalActions();
  const createTodoMutation = useCreateTodo();
  
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(1);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim()) {
      createTodoMutation.mutate(
        { userId, title },
        {
          onSuccess: () => {
            closeModal('CREATE_TODO');
          },
        }
      );
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">새 할일 추가</h2>
        
        {createTodoMutation.isPending && (
          <div className="mb-4 text-blue-500">저장 중...</div>
        )}
        
        {createTodoMutation.isError && (
          <div className="mb-4 text-red-500">
            오류 발생: {createTodoMutation.error?.message || '할일을 추가하는데 실패했습니다.'}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2 font-medium">
              제목
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="userId" className="block mb-2 font-medium">
              사용자 ID
            </label>
            <input
              id="userId"
              type="number"
              min="1"
              value={userId}
              onChange={(e) => setUserId(Number(e.target.value))}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => closeModal('CREATE_TODO')}
              className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={createTodoMutation.isPending}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 