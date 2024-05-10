import React from "react";
export const useToggle = (initialValue) => {
  const [value, setValue] = React.useState(initialValue);

  const toggleValue = () => setValue(!value);

  return [value, toggleValue];
};

export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
