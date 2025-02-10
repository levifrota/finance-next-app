"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface FontSizeContextProps {
  fontSize: number; // valor numérico da fonte (por exemplo, px ou rem base)
  setFontSize: (size: number) => void;
  fontFamily: string;
  setFontFamily: (family: string) => void;
}

const FontSizeContext = createContext<FontSizeContextProps>({
  fontSize: 16,
  setFontSize: () => {},
  fontFamily: "mulish",
  setFontFamily: () => {},
});

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSizeState] = useState<number>(16);
  const [fontFamily, setFontFamilyState] = useState<string>("Mulish");

  useEffect(() => {
    const storedSize = localStorage.getItem("fontSize");
    if (storedSize) {
      setFontSizeState(Number(storedSize));
      document.documentElement.style.fontSize = storedSize + "px";
    }

    const storedFont = localStorage.getItem("fontFamily");
    if (storedFont) {
      setFontFamilyState(storedFont);
      if (storedFont === "mulish") {
        document.documentElement.style.setProperty(
          "--selected-font",
          "var(--font-mulish)",
        );
      } else {
        document.documentElement.style.setProperty(
          "--selected-font",
          storedFont,
        );
      }
    }
  }, []);

  const setFontSize = (size: number) => {
    setFontSizeState(size);
    localStorage.setItem("fontSize", size.toString());
    document.documentElement.style.fontSize = `${size}px`;
  };

  const setFontFamily = (family: string) => {
    setFontFamilyState(family);
    localStorage.setItem("fontFamily", family);
    document.documentElement.style.setProperty("--selected-font", family);
  };

  return (
    <FontSizeContext.Provider
      value={{ fontSize, setFontSize, fontFamily, setFontFamily }}
    >
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  return useContext(FontSizeContext);
}
