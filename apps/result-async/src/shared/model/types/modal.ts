export type ModalType = 
  | 'CREATE_TODO'
  | 'EDIT_TODO'
  | 'DELETE_TODO'
  | 'USER_DETAIL';

export interface ModalState {
  openedModals: ModalType[];
  modalProps: {
    [key in ModalType]?: Record<string, unknown>;
  };
} 