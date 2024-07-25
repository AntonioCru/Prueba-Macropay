/* eslint-disable react/prop-types */
import React from 'react'

import './inputError.css'

// eslint-disable-next-line react/prop-types
export default function InputError ({ errors, name }) {
  return (
        <div className='!text-left'>
            {errors[name]?.message && (
                <span className={errors ? 'messageErrorRed' : ''}>
                    {errors[name].message}
                </span>
            )}
        </div>
  )
}
