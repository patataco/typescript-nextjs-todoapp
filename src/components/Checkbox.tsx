import React from 'react';

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

const Checkbox = ({ children, ...rest }: CheckboxProps) => {
  return (
    <>
      <input type="checkbox" {...rest} />
    </>
  );
};

export default Checkbox;
