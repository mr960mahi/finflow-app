import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Modal } from '../types';

interface ModalContextType {
  modal: Modal;
  openModal: (type: Modal['type'], data?: any) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState<Modal>({
    isOpen: false,
    type: null,
  });

  const openModal = useCallback((type: Modal['type'], data?: any) => {
    setModal({ isOpen: true, type, data });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ isOpen: false, type: null });
  }, []);

  return (
    <ModalContext.Provider
      value={{
        modal,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};