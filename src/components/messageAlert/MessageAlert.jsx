/* eslint-disable react/prop-types */
import React from 'react'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

export default function MessageAlert({ severity, message }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert variant='filled' severity={severity}>
        {message}
      </Alert>
    </Stack>
  )
}
