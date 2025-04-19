import { useTodos } from "../api/hooks";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const { data: todos, isLoading, error } = useTodos();

  if (isLoading) {
    return <div className="p-4 text-center">로딩 중...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">에러가 발생했습니다</div>;
  }

  if (!todos || todos.length === 0) {
    return <div className="p-4 text-center text-gray-500">할 일이 없습니다</div>;
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
} 