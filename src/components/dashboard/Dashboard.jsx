import React, { useEffect, useState } from 'react'
import GenericTable from '../genericTable/GenericTable'
import Wallpaper from '../wallpaper/Wallpaper'
import Buton from '../button/Buton'
import axios from 'axios'
import { navigate } from 'gatsby'

import './dashboard.styles.css'
import MessageAlert from '../messageAlert/MessageAlert'
import ComponentModal from '../modal/ComponentModal'

export default function Dashboard() {
  const apiUrl = process.env.GATSBY_API_URL
  const [rows, setRows] = useState([])
  const [isMessage, setIsMessage] = useState({
    isMessage: false,
    message: '',
    typeMessage: '',
  })

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setRows(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data: ', error)
      })
  }, [])

  const handleClick = () => {
    navigate('/CreateOrEditItem')
  }

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [fetchDataToDelete, setFetchDataToDelete] = useState({})
  const handleActionDelete = (data) => {
    setOpen(true)
    setFetchDataToDelete(data)
  }

  return (
    <>
      <Wallpaper>
        <div className='absolute top-0 pl-40 pr-40 container_table'>
          <div className='container_header' style={{ marginTop: '12vh' }}>
            <h1 className='pt-3'>TODOS LOS CLIENTES</h1>
            <Buton
              title='Añadir Cliente'
              primaryOrSecondary='primary'
              type='button'
              onClick={handleClick}
            />
          </div>
          <div className=''>
            <div className=' '>
              <GenericTable
                linkNavigationEdit='/CreateOrEditItem'
                rows={rows}
                handleActionDelete={handleActionDelete}
              />
            </div>
          </div>
        </div>

        {isMessage.isMessage === true && (
          <div
            className='absolute inset-0 '
            style={{
              top: '70%',
              left: '38vw',
              width: '23vw',
            }}>
            <MessageAlert
              severity={isMessage.typeMessage}
              message={isMessage.message}
            />
          </div>
        )}
        {open && (
          <div className='absolute inset-0 '>
            <ComponentModal
              message='¿Estas seguro de eliminar el cliente?'
              title='¡Atención!'
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
              fetchDataToDelete={fetchDataToDelete}
              rows={rows}
              setRows={setRows}
              setIsMessage={setIsMessage}
            />
          </div>
        )}
      </Wallpaper>
    </>
  )
}
