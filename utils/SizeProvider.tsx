import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

enum SizeOption {
  Default = "default",
  Large = "large",
  ExtraLarge = "extraLarge",
}

type SizeContextType = {
  size: SizeOption;
  selectSize: (newSize: SizeOption) => void;
};

const SizeContext = createContext<SizeContextType | undefined>(undefined);

export const SizeProvider = ({ children }: { children: React.ReactNode }) => {
  const [size, setSize] = useState<SizeOption>(SizeOption.Default);

  useEffect(() => {
    const loadSize = async () => {
      const storedSize = await AsyncStorage.getItem("appSize");
      if (storedSize) {
        setSize(storedSize as SizeOption);
      }
    };
    loadSize();
  }, []);

  const selectSize = async (newSize: SizeOption) => {
    await AsyncStorage.setItem("appSize", newSize);
    setSize(newSize);
  };

  return (
    <SizeContext.Provider value={{ size, selectSize }}>
      {children}
    </SizeContext.Provider>
  );
};

export const useSize = () => {
  const context = useContext(SizeContext);

  if (!context) {
    throw new Error("useSize must be used within a SizeProvider");
  }
};
