import { useEffect, useState } from "react";

export const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const debounce = (callback, wait = 300) => {
      let timer;

      return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          callback(window.innerWidth);
        }, wait);
      };
    };

    window.addEventListener("resize", debounce(setWidth));

    return () => window.removeEventListener("resize", debounce(setWidth));
  }, []);

  return width;
};
