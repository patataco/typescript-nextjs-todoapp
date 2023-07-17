import React from 'react';

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

const Checkbox = ({ children, id, ...rest }: CheckboxProps) => {
  return (
    <>
      <input type="checkbox" id={id} {...rest} />
      <label htmlFor={id} className="hidden">
        {children}
      </label>
    </>
  );
};

export default Checkbox;
