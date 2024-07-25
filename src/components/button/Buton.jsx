/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'gatsby'

import Button from '@mui/material/Button'

import './button.css'

export default function Buton({ title, primaryOrSecondary, type, onClick }) {
  const form = primaryOrSecondary === 'secondary' ? 'outlined' : 'contained'
  const styleButton =
    primaryOrSecondary === 'secondary' ? 'buttonSecondary' : 'buttonPrimary'
  return (
    // <Link>
    <Button
      type={type}
      className={`button ${styleButton}`}
      variant={form}
      size='large'
      onClick={onClick}>
      {title}
    </Button>
    // </Link>
  )
}
