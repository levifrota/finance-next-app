"use client";

import useWindowSize from "../transactions/_actions/useWindowSize";

export function isMobile() {
  const { width } = useWindowSize();
  return width <= 768 ? true : false;
}
