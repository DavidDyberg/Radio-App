import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export enum SizeOption {
  Default = "default",
  Large = "large",
  ExtraLarge = "extraLarge",
}

type SizeContextType = {
  appSize: SizeOption;
  selectSize: (newSize: SizeOption) => void;
};

const SizeContext = createContext<SizeContextType | undefined>(undefined);

export const SizeProvider = ({ children }: { children: React.ReactNode }) => {
  const [appSize, setAppSize] = useState<SizeOption>(SizeOption.Default);

  useEffect(() => {
    const loadSize = async () => {
      const storedSize = await AsyncStorage.getItem("appSize");
      if (storedSize) {
        setAppSize(storedSize as SizeOption);
      }
    };
    loadSize();
  }, []);

  const selectSize = async (newSize: SizeOption) => {
    await AsyncStorage.setItem("appSize", newSize);
    setAppSize(newSize);
  };

  return (
    <SizeContext.Provider value={{ appSize, selectSize }}>
      {children}
    </SizeContext.Provider>
  );
};

export const useSize = (): SizeContextType => {
  const context = useContext(SizeContext);

  if (!context) {
    throw new Error("useSize must be used within a SizeProvider");
  }
  return context;
};
