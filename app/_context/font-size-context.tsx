"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface FontSizeContextProps {
  fontSize: number; // valor numérico da fonte (por exemplo, px ou rem base)
  setFontSize: (size: number) => void;
}

const FontSizeContext = createContext<FontSizeContextProps>({
  fontSize: 16, // tamanho padrão (16px)
  setFontSize: () => {},
});

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSizeState] = useState<number>(16);

  // Ler o tamanho de fonte do localStorage (se existir) ao montar
  useEffect(() => {
    const storedSize = localStorage.getItem("fontSize");
    if (storedSize) {
      setFontSizeState(Number(storedSize));
      document.documentElement.style.fontSize = storedSize + "px";
    }
  }, []);

  // Função para atualizar o estado e salvar no localStorage
  const setFontSize = (size: number) => {
    setFontSizeState(size);
    localStorage.setItem("fontSize", size.toString());
    // Aqui você pode alterar diretamente a font-size da tag html ou usar classes do Tailwind.
    document.documentElement.style.fontSize = `${size}px`;
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  return useContext(FontSizeContext);
}
