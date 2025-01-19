"use client"; // Ensure this runs on the client side

import React, { createContext, useState, ReactNode, JSX } from "react";

export interface UserContextType {
  setGlobalLoading: React.Dispatch<React.SetStateAction<boolean | null>>;
  globalLoading: boolean | null;
}

export const MyContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({
  children,
}: UserProviderProps): JSX.Element => {
  const [globalLoading, setGlobalLoading] = useState<boolean | null>(false);

  return (
    <MyContext.Provider value={{ globalLoading, setGlobalLoading }}>
      {children}
    </MyContext.Provider>
  );
};
