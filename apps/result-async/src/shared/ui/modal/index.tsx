'use client';

import { useModalActions, useModalData } from '@/shared/store/modalStore';

/** 
 * modalStore를 사용할 수 있는 커스텀 훅
 * @deprecated - 대신 useModalActions와 useModalData를 직접 사용하세요.
 */
export const useModals = () => {
  const actions = useModalActions();
  const { modalProps } = useModalData();
  
  return {
    ...actions,
    modalProps
  };
}; 