"use client";

import { useState, useEffect } from "react";
import Footer from "./footer";

export default function SmartphoneWrapper() {
  const [isSmartphone, setIsSmartphone] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmartphone(window.innerWidth <= 768);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!isSmartphone) {
    return null;
  }

  return <Footer />;
}
