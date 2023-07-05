import { useState } from 'react';

interface InputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
}
const Input: React.FC<InputProps> = ({ inputValue, setInputValue }) => {
  return (
    <>
      <input
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        value={inputValue}
      />
    </>
  );
};
export default Input;
