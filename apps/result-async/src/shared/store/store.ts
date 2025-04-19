import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '@/entities/todo/store/todoSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  // 개발 환경에서만 devTools 활성화
  devTools: process.env.NODE_ENV !== 'production',
});

// RootState 및 AppDispatch 타입 추출
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 