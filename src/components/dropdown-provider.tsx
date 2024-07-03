"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface DropdownContextType {
  isDropdownVisible: boolean;
  setIsDropdownVisible: (isVisible: boolean) => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined,
);

interface DropdownProviderProps {
  children: ReactNode;
}

export const DropdownProvider = ({ children }: DropdownProviderProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const value = { isDropdownVisible, setIsDropdownVisible };

  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
  );
};

export function useDropdown(): DropdownContextType {
  const context = useContext(DropdownContext);
  if (context === undefined) {
    throw new Error("프로바이더 어디감??");
  }
  return context;
}
