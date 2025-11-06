import { useLayoutEffect } from "react";

export default function useLockBodyScroll(locked) {
  useLayoutEffect(() => {
    const original = document.body.style.overflow;
    if (locked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original || "";
    }
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [locked]);
}


