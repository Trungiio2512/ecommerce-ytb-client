import { useState, useEffect } from "react";

export const useDebounce = (value, delay) => {
  const [debounceValue, setDecbounceValue] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDecbounceValue(value);
    }, delay);

    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return debounceValue;
};
