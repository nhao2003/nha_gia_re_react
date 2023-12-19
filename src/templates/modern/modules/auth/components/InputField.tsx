import React from 'react';
import classes from './InputField.module.css';

interface InputProps {
  id: string | undefined;
  type: string;
  placeholder: string;
  value?: string | number | readonly string[] | undefined;
  isError?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const InputField: React.FC<InputProps> = (props) => {
  return (
    <>
      <input
        id={props.id}
        className={`${classes.input} ${props.isError !== undefined && props.isError ? classes.invalid : ''}`}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
};

export default InputField;
