import React from "react";
export const useToggle = (initialValue) => {
  const [value, setValue] = React.useState(initialValue);

  const toggleValue = () => setValue(!value);

  return [value, toggleValue];
};
