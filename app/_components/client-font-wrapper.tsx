"use client";

import { useFontSize } from "@/app/_context/font-size-context";

export default function ClientFontWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fontFamily } = useFontSize();
  const computedFont =
    fontFamily === "mulish" ? "var(--font-mulish)" : fontFamily;

  return (
    <div style={{ fontFamily: computedFont }} className="h-full">
      {children}
    </div>
  );
}
