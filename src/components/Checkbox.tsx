import React from 'react';

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

const Checkbox = ({ id, className, checked, ...rest }: CheckboxProps) => {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        {...rest}
        className="hidden"
        checked={checked}
      />
      <label htmlFor={id} className={`${className}`}>
        {checked && (
          <span className="absolute inset-0 flex items-center justify-center text-xs">
            ✔
          </span>
        )}
      </label>
    </>
  );
};

export default Checkbox;
