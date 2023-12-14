import React from 'react';
import classes from './InputField.module.css';

interface InputProps {
  type: string;
  placeholder: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const InputField: React.FC<InputProps> = (props) => {
  return (
    <>
      <input
        className={classes.input}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
};

export default InputField;
