'use client';

import { useModalData } from '@/shared/store/modalStore';
import { CreateTodoModal } from '@/features/todo/create-todo-modal';
import { EditTodoModal } from '@/features/todo/edit-todo-modal';

export function ModalRegistry() {
  const { openedModals } = useModalData();

  return (
    <>
      {openedModals.includes('CREATE_TODO') && <CreateTodoModal />}
      {openedModals.includes('EDIT_TODO') && <EditTodoModal />}
    </>
  );
} 