import React from 'react';
import classes from './SubmitButton.module.css';

interface SubmitButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ type, children, onClick }) => {
  return (
    <div className={classes.actions}>
      <button type={type} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default SubmitButton;
