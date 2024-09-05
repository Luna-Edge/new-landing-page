import React, { useEffect, useState } from "react";

const useMousePosition = (ref?: React.RefObject<HTMLElement>) => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (ref && ref.current) {
        const rect = ref.current.getBoundingClientRect();

        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      } else {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [ref]);

  return mousePosition;
};

export default useMousePosition;
