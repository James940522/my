'use client';

import { useQuery } from '@tanstack/react-query';
import { TodoQueryOptions } from '@/entities/todo/api/query-options';
import { TodoItem } from '@/shared/ui/TodoItem';
import { useModalActions } from '@/shared/store/modalStore';
import { calculateTodoSummary } from '@/shared/lib/utils';

export const TodoList = () => {
  const { openModal } = useModalActions();
  
  const { data: todos = [], isLoading, error } = useQuery(TodoQueryOptions.todoList());
  
  const summary = calculateTodoSummary(todos);
  
  const handleAddTodo = () => {
    openModal('CREATE_TODO');
  };
  
  if (isLoading) {
    return <div className="py-8 text-center">로딩 중...</div>;
  }
  
  if (error) {
    return <div className="py-8 text-center text-red-500">오류 발생: {error.message}</div>;
  }
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">할일 목록</h1>
        <button
          onClick={handleAddTodo}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          새 할일 추가
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg text-center">
          <h2 className="text-lg font-medium mb-2">전체</h2>
          <p className="text-2xl font-bold">{summary.total}</p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg text-center">
          <h2 className="text-lg font-medium mb-2">완료</h2>
          <p className="text-2xl font-bold">{summary.completed}</p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg text-center">
          <h2 className="text-lg font-medium mb-2">미완료</h2>
          <p className="text-2xl font-bold">{summary.pending}</p>
        </div>
      </div>
      
      {todos.length === 0 ? (
        <div className="text-center py-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
          할일이 없습니다. 새 할일을 추가해보세요!
        </div>
      ) : (
        <div className="space-y-2">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
}; 