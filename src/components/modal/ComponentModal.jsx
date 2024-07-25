/* eslint-disable comma-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import axios from 'axios'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

export default function ComponentModal({
  message,
  title,
  open,
  handleOpen,
  handleClose,
  fetchDataToDelete,
  rows,
  setRows,
  setIsMessage,
}) {
  const apiUrl = process.env.GATSBY_API_URL
  const [data, setData] = useState({})
  useEffect(() => {
    setData(fetchDataToDelete)
  }, [fetchDataToDelete])

  const deleteUser = () => {
    axios
      .delete(`${apiUrl}/${data.id}`)
      .then((response) => {
        if (response.status === 200 && response.statusText === 'OK') {
          const mappedRows = rows.filter((row) => row.id !== data.id)
          setRows(mappedRows)
          setIsMessage({
            isMessage: true,
            message: 'Registro Eliminado',
            typeMessage: 'success',
          })
          setTimeout(() => {
            setIsMessage({
              isMessage: false,
              message: '',
              typeMessage: '',
            })
          }, 3000)
          handleClose()
        } else {
          setIsMessage({
            isMessage: true,
            message: 'Intentalo de nuevo',
            typeMessage: 'error',
          })
          setTimeout(() => {
            setIsMessage({
              isMessage: false,
              message: '',
              typeMessage: '',
            })
          }, 3000)
        }
      })
      .catch((error) => {
        console.error('Error fetching data: ', error)
      })
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'>
        <Box sx={{ ...style, width: 400, borderRadius: '15px' }}>
          <h2 id='parent-modal-title'>{title}</h2>
          <p id='parent-modal-description'>{message}</p>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={deleteUser}>Eliminar</Button>
        </Box>
      </Modal>
    </div>
  )
}
