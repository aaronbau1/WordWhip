'use client'

import { createContext, useContext, useState } from "react";

type InfoModalContextProps = {
  isInfoModalOpen: boolean,
  openInfoModal: () => void;
  closeInfoModal: () => void;
}

const InfoModalContext = createContext<InfoModalContextProps | null>(null);

type InfoModalProviderProps = {
  children: React.ReactNode;
}

export const InfoModalProvider:React.FC<InfoModalProviderProps> = ({ children }) => {
  
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);

  const openInfoModal = () => {
    setIsInfoModalOpen(true);
  };

  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  return (
    <InfoModalContext.Provider value={{ isInfoModalOpen, openInfoModal, closeInfoModal }}>
      {children}
    </InfoModalContext.Provider>
  );
};

export const useInfoModal = ():InfoModalContextProps => {
  const context = useContext(InfoModalContext);

  if (!context) {
    throw new Error('useInfoModal must be used within an InfoModalProvider');
  }

  return context;
};
