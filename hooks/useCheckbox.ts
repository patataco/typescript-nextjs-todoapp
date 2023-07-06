import { ChangeEvent, useState } from 'react';

export const useCheckbox = (initialValue: boolean) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
  };

  return { isChecked, setIsChecked, handleCheck };
};
