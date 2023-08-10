import { ChangeEvent, useState } from 'react';

export const useInput = (initialValue: string) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return {
    inputValue,
    setInputValue,
    handleInput,
  };
};
