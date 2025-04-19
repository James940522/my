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
export const useModalData = () => useModalStore((state) => state.data); 