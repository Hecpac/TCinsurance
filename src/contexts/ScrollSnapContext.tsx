"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface ScrollSnapContextValue {
  isSnapEnabled: boolean;
  disableSnap: () => void;
  enableSnap: () => void;
}

const ScrollSnapContext = createContext<ScrollSnapContextValue | null>(null);

export function ScrollSnapProvider({ children }: { children: ReactNode }) {
  const [isSnapEnabled, setIsSnapEnabled] = useState(true);

  const disableSnap = useCallback(() => {
    setIsSnapEnabled(false);
  }, []);

  const enableSnap = useCallback(() => {
    setIsSnapEnabled(true);
  }, []);

  return (
    <ScrollSnapContext.Provider value={{ isSnapEnabled, disableSnap, enableSnap }}>
      {children}
    </ScrollSnapContext.Provider>
  );
}

export function useScrollSnap() {
  const context = useContext(ScrollSnapContext);
  if (!context) {
    throw new Error("useScrollSnap must be used within ScrollSnapProvider");
  }
  return context;
}
