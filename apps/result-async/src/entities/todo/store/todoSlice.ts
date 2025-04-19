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
      // API가 단순히 Promise<Todo[]>를 반환하므로 match 없이 직접 사용
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
      // API가 단순히 Promise<Todo>를 반환하므로 match 없이 직접 사용
      const data = await TodoAPI.createTodo(payload);
      return data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      return rejectWithValue(errorMessage || 'Todo 생성에 실패했습니다.');
    }
  }
);

export const toggleComplete = createAsyncThunk(
  'todos/toggleComplete',
  async ({ id, completed }: { id: number; completed: boolean }, { rejectWithValue }) => {
    try {
      // ResultAsync를 사용하는 API이므로 match 메서드로 처리
      return await TodoAPI.toggleTodoComplete(id, completed)
        .map(data => data)
        .mapErr(error => {
          throw error.message;
        })
        .unwrapOr(null);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      return rejectWithValue(errorMessage || 'Todo 상태 변경에 실패했습니다.');
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: number, { rejectWithValue }) => {
    try {
      // id가 string으로 예상되므로 변환
      await TodoAPI.deleteTodo(id.toString());
      return id; // 성공 시 삭제된 id 반환
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      return rejectWithValue(errorMessage || 'Todo 삭제에 실패했습니다.');
    }
  }
);

// 슬라이스 생성
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
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
    // fetchTodos
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

    // createTodo
    builder.addCase(createTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos.push(action.payload);
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // toggleComplete
    builder.addCase(toggleComplete.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state.todos.findIndex(todo => todo.id === action.payload?.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      }
    });
    builder.addCase(toggleComplete.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // deleteTodo
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter(todo => parseInt(todo.id) !== action.payload);
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { setTodos, addTodo, updateTodo, removeTodo, clearError } = todoSlice.actions;

export default todoSlice.reducer; 