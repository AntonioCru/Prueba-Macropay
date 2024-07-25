/* eslint-disable react/prop-types */
import React from 'react'
import { useFormContext } from 'react-hook-form'

import './textFieldPass.css'

export default function TextFieldInput ({
  type,
  placeholder,
  name,
  required,
  minLength,
  maxLength,
  label,
  pattern,
  patternMessage,
  value,
  disabled,
  readOnly,
  onChange
}) {
  const { register } = useFormContext()
  return (
        <input
            onChange={onChange}
            disabled={!!disabled}
            readOnly={readOnly}
            defaultValue={value}
            className='target-login__input'
            type={type}
            placeholder={placeholder}
            {...register(name, {
              required: required && `El campo ${placeholder} es requerido`,
              minLength: minLength
                ? {
                    value: minLength,
                    message: `El campo debe tener al menos ${minLength}`
                  }
                : undefined,
              maxLength: maxLength
                ? {
                    value: maxLength,
                    message: `El campo debe tener maximo ${maxLength}`
                  }
                : undefined,
              pattern: pattern
                ? { value: pattern, message: patternMessage }
                : undefined
            })}
        />
  )
}
