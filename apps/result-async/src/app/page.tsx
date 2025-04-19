import { TodoList } from '@/features/todo/todo-list';
import { CodeViewer } from '@/features/code-viewer';

// 코드 예시 정의
const todoApiCode = `// TodoAPI.ts
import { CreateTodoRequest, Todo, UpdateTodoRequest } from '../model';

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
  await delay(500); // 네트워크 지연 시뮬레이션
  return [...todos];
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
    throw new Error(\`Todo with ID \${updateData.id} not found\`);
  }
  
  const updatedTodo: Todo = {
    ...todoToUpdate,
    title: updateData.title !== undefined ? updateData.title : todoToUpdate.title,
    completed: updateData.completed !== undefined ? updateData.completed : todoToUpdate.completed,
  };
  
  todos = todos.map(t => (t.id === updatedTodo.id ? updatedTodo : t));
  return updatedTodo;
};

/** DELETE: Todo 삭제 */
const deleteTodo = async (id: string | number): Promise<void> => {
  await delay(500);
  const idStr = typeof id === 'number' ? id.toString() : id;
  todos = todos.filter(t => t.id !== idStr);
};

export const TodoAPI = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
};`;

const todoModelCode = `// model/index.ts
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface CreateTodoRequest {
  userId: number;
  title: string;
  completed?: boolean;
}

export interface UpdateTodoRequest {
  id: number;
  title?: string;
  completed?: boolean;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

export interface TodoSummary {
  total: number;
  completed: number;
  pending: number;
}`;

const todoListComponentCode = `// todo-list/index.tsx
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
      
      {/* 요약 통계 */}
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
      
      {/* Todo 리스트 */}
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
};`;

// 상태 관리 코드 예시
const zustandStoreCode = `// shared/store/modalStore.ts
'use client';

import { ModalState, ModalType } from '@/shared/model/types/modal';
import { createCustomStore } from './createStore';

const initialState: ModalState = {
  openedModals: [],
  modalProps: {},
};

interface ModalActions {
  openModal: <T extends ModalType>(
    modalName: T,
    modalProps?: Record<string, unknown>
  ) => void;
  closeModal: (modalName: ModalType) => void;
  closeAllModals: () => void;
}

interface ModalStore {
  data: ModalState;
  actions: ModalActions;
}

export const useModalStore = createCustomStore<ModalStore>((set) => ({
  data: initialState,
  actions: {
    openModal: (modalName, modalProps) => {
      set((state) => {
        const isModalOpen = state.data.openedModals.includes(modalName);

        if (!isModalOpen) {
          state.data.openedModals.push(modalName);
        }

        // modalProps를 업데이트합니다.
        if (modalProps) {
          state.data.modalProps[modalName] = modalProps;
        }
      });
    },
    closeModal: (modalName) => {
      set((state) => {
        state.data.openedModals = state.data.openedModals.filter(
          (type) => type !== modalName,
        );
        delete state.data.modalProps[modalName];
      });
    },
    closeAllModals: () => {
      set((state) => {
        state.data.openedModals = [];
        state.data.modalProps = {};
      });
    },
  },
}));

export const useModalActions = () => useModalStore((state) => state.actions);
export const useModalData = () => useModalStore((state) => state.data);`;

const reduxStoreCode = `// entities/todo/store/todoSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoState } from '../model';
import { TodoAPI } from '../api/todoApi';

// 초기 상태
const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

// 비동기 Thunk 액션 생성
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const data = await TodoAPI.getTodos();
      return data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      return rejectWithValue(errorMessage || 'Todo 목록을 불러오는데 실패했습니다.');
    }
  }
);

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (payload: { userId: number, title: string }, { rejectWithValue }) => {
    try {
      const data = await TodoAPI.createTodo(payload);
      return data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      return rejectWithValue(errorMessage || 'Todo 생성에 실패했습니다.');
    }
  }
);

// Todo 슬라이스 생성
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // 동기 리듀서 액션
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => parseInt(todo.id) !== action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // 비동기 액션에 대한 상태 처리
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setTodos, addTodo, updateTodo, removeTodo, clearError } = todoSlice.actions;
export default todoSlice.reducer;`;

const reactQueryCode = `// entities/todo/api/query-options.ts
import { toPromise } from '@/shared/config/axios/util/query';
import { QueryParams } from '@/shared/model/types';
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { TodoAPI } from './todoApi';
import { TodoQueryKeys } from './query-keys';
import { CreateTodoRequest, Todo, UpdateTodoRequest } from '../model';

// React Query 쿼리 옵션 정의
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
    // 변이 함수 정의
    mutationFn: (newTodo: CreateTodoRequest) => TodoAPI.createTodo(newTodo),
    // 변이 성공시 쿼리 캐시 무효화
    onSuccess: () => {
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
};`;

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Todo 애플리케이션 구현</h1>
        
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">1. Todo 모델</h2>
          <p className="mb-4">Todo 아이템을 관리하기 위한 기본 데이터 구조를 정의합니다:</p>
          <CodeViewer code={todoModelCode} language="typescript" filename="entities/todo/model/index.ts">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <pre className="text-sm">
{`interface Todo {
  id: string;       // 고유 식별자
  title: string;    // 할 일 제목
  completed: boolean; // 완료 상태
  createdAt: string;  // 생성 시간
}`}
              </pre>
            </div>
          </CodeViewer>
          
          <h2 className="text-2xl font-bold mb-4 mt-10">2. Todo API</h2>
          <p className="mb-4">Todo 데이터를 관리하는 API 함수들을 구현합니다:</p>
          <CodeViewer code={todoApiCode} language="typescript" filename="entities/todo/api/todoApi.ts">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 space-y-2">
              <div className="bg-white dark:bg-gray-700 rounded p-3 shadow-sm">
                <div className="font-medium">GET: Todo 목록 조회</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">getTodos(): Promise&lt;Todo[]&gt;</div>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded p-3 shadow-sm">
                <div className="font-medium">POST: Todo 생성</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">createTodo(newTodo): Promise&lt;Todo&gt;</div>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded p-3 shadow-sm">
                <div className="font-medium">PUT: Todo 수정</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">updateTodo(updateData): Promise&lt;Todo&gt;</div>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded p-3 shadow-sm">
                <div className="font-medium">DELETE: Todo 삭제</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">deleteTodo(id): Promise&lt;void&gt;</div>
              </div>
            </div>
          </CodeViewer>
          
          <h2 className="text-2xl font-bold mb-4 mt-10">3. 상태 관리 전략</h2>
          <p className="mb-4">이 애플리케이션은 세 가지 상태 관리 도구를 사용하여 다양한 상태를 효율적으로 관리합니다:</p>

          <h3 className="text-xl font-bold mb-3 mt-6">3.1 Zustand (모달 상태 관리)</h3>
          <p className="mb-4">가볍고 유연한 Zustand를 사용하여 모달 상태를 관리합니다. 이는 모달 창의 표시 여부와 모달 데이터를 처리합니다.</p>
          <CodeViewer code={zustandStoreCode} language="typescript" filename="shared/store/modalStore.ts">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <div className="bg-white dark:bg-gray-700 rounded p-4 shadow-sm mb-3">
                <h4 className="font-medium mb-2 text-blue-600 dark:text-blue-400">Zustand 특징</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>간결한 API로 상태 관리 단순화</li>
                  <li>훅 기반 접근 방식 (useModalStore)</li>
                  <li>불변성을 자동으로 처리 (Immer 통합)</li>
                  <li>React 외부에서도 상태 접근 가능</li>
                </ul>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3 text-sm">
                <code>useModalActions()</code>와 <code>useModalData()</code> 훅을 통해 모달 상태와 액션에 접근
              </div>
            </div>
          </CodeViewer>

          <h3 className="text-xl font-bold mb-3 mt-8">3.2 Redux Toolkit (전역 상태 관리)</h3>
          <p className="mb-4">Redux Toolkit을 사용하여 복잡한 애플리케이션 상태와 비동기 작업을 관리합니다.</p>
          <CodeViewer code={reduxStoreCode} language="typescript" filename="entities/todo/store/todoSlice.ts">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <div className="bg-white dark:bg-gray-700 rounded p-4 shadow-sm mb-3">
                <h4 className="font-medium mb-2 text-blue-600 dark:text-blue-400">Redux Toolkit 특징</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>보일러플레이트 코드 감소 (createSlice로 액션과 리듀서 통합)</li>
                  <li>불변성 자동 처리 (Immer 통합)</li>
                  <li>비동기 상태 관리를 위한 createAsyncThunk</li>
                  <li>미들웨어 구성 간소화</li>
                </ul>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="bg-red-50 dark:bg-red-900/20 rounded p-3 text-sm flex-1">
                  <div className="font-medium mb-1">Redux State</div>
                  <code>{`{
  todos: Todo[],
  loading: boolean,
  error: string | null
}`}</code>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded p-3 text-sm flex-1">
                  <div className="font-medium mb-1">Redux Actions</div>
                  <code>{`setTodos, addTodo, updateTodo, removeTodo, clearError`}</code>
                </div>
              </div>
            </div>
          </CodeViewer>

          <h3 className="text-xl font-bold mb-3 mt-8">3.3 React Query (서버 상태 관리)</h3>
          <p className="mb-4">React Query를 사용하여 서버 데이터를 효율적으로 가져오고, 캐싱, 동기화, 업데이트합니다.</p>
          <CodeViewer code={reactQueryCode} language="typescript" filename="entities/todo/api/query-options.ts">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <div className="bg-white dark:bg-gray-700 rounded p-4 shadow-sm mb-3">
                <h4 className="font-medium mb-2 text-blue-600 dark:text-blue-400">React Query 특징</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>선언적인 데이터 가져오기</li>
                  <li>자동 캐싱 및 재검증</li>
                  <li>로딩/에러 상태 자동 관리</li>
                  <li>뮤테이션으로 서버 데이터 업데이트</li>
                  <li>쿼리 무효화 및 재요청</li>
                </ul>
              </div>
              <div className="flex bg-purple-50 dark:bg-purple-900/20 rounded p-3 text-sm">
                <code>{`const { data: todos, isLoading, error } = useQuery(TodoQueryOptions.todoList());`}</code>
              </div>
            </div>
          </CodeViewer>
          
          <h2 className="text-2xl font-bold mb-4 mt-10">4. Todo 리스트 컴포넌트</h2>
          <p className="mb-4">사용자 인터페이스의 핵심 컴포넌트인 Todo 리스트를 구현합니다:</p>
          <CodeViewer code={todoListComponentCode} language="typescript" filename="features/todo/todo-list/index.tsx">
            <TodoList />
          </CodeViewer>
        </div>
      </div>
    </div>
  );
}
