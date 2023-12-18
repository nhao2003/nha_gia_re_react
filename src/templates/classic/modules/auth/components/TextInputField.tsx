import React from 'react'
import classes from './TextInputField.module.css'

interface InputProps {
  type: string
  placeholder: string
  value?: string | number | readonly string[] | undefined
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
}

const TextInputField: React.FC<InputProps> = (props) => {
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
  )
}

export default TextInputField
