/* eslint-disable comma-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Wallpaper from '../components/wallpaper/Wallpaper'
import TextFieldInput from '../components/textFieldInput/TextFieldInput'
import InputError from '../components/inputError/InputError'
import Buton from '../components/button/Buton'
import { navigate } from 'gatsby'
import axios from 'axios'
import MessageAlert from '../components/messageAlert/MessageAlert'

export default function CreateOrEditItem({ location }) {
  const methods = useForm({ mode: 'onBlur' })
  const { handleSubmit } = methods
  const { errors } = methods.formState
  const apiUrl = process.env.GATSBY_API_URL

  const [isMessage, setIsMessage] = useState({
    isMessage: false,
    message: '',
    typeMessage: '',
  })

  const [idUser, setIdUser] = useState()
  useEffect(() => {
    setIdUser(location.state.row?.id)
  }, [location])
  const handleNavigate = () => {
    navigate('/')
  }
  const onSubmit = (data) => {
    if (location.state.row) {
      axios
        .put(`${apiUrl}/${idUser}`, data)
        .then((response) => {
          if (response.status === 200 && response.statusText === 'OK') {
            setIsMessage({
              isMessage: true,
              message: 'Registro Editado',
              typeMessage: 'success',
            })
            setTimeout(() => {
              setIsMessage({
                isMessage: false,
                message: '',
                typeMessage: '',
              })
              navigate('/')
            }, 3000)
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
    } else {
      axios
        .post(apiUrl, data)
        .then((response) => {
          console.log(response)
          if (response.status === 201 && response.statusText === 'Created') {
            setIsMessage({
              isMessage: true,
              message: 'Registro exitoso',
              typeMessage: 'success',
            })
            setTimeout(() => {
              setIsMessage({
                isMessage: false,
                message: '',
                typeMessage: '',
              })
              navigate('/')
            }, 3000)
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
  }
  return (
    <Wallpaper>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='absolute inset-0 flex flex-col justify-center pl-40 pr-28'>
          <h1 className='title__products-services'>
            {location.state.row ? 'Editar Usuario' : 'Crear Usuario'}
          </h1>
          <div className='w-100 h-100 grid grid-cols-2'>
            <div className='input__profile-user'>
              <TextFieldInput
                type='text'
                placeholder='Nombre'
                name='name'
                required
                minLength={3}
                maxLength={30}
                value={location.state.row?.name}
              />
              <InputError errors={errors} name='name' />
            </div>

            <div className='input__profile-user'>
              <TextFieldInput
                type='text'
                placeholder='Teléfono'
                name='telephono'
                required
                minLength={3}
                maxLength={10}
                value={location.state.row?.telephono}
              />
              <InputError errors={errors} name='telephono' />
            </div>

            <div className='input__profile-user'>
              <TextFieldInput
                type='text'
                placeholder='Dirección'
                name='address'
                required
                minLength={1}
                maxLength={20}
                value={location.state.row?.address}
              />
              <InputError errors={errors} name='address' />
            </div>

            <div className='input__profile-user'>
              <TextFieldInput
                type='text'
                placeholder='Codigo postal'
                name='codePostal'
                minLength={5}
                maxLength={5}
                value={location.state.row?.codePostal}
              />
              <InputError errors={errors} name='codePostal' />
            </div>

            <div className='input__profile-user'>
              <TextFieldInput
                type='text'
                placeholder='Edad'
                name='age'
                minLength={1}
                maxLength={3}
                value={location.state.row?.age}
              />
              <InputError errors={errors} name='age' />
            </div>
            <div className='input__profile-user'>
              <TextFieldInput
                type='text'
                placeholder='Estado civil'
                name='civilStatus'
                minLength={1}
                maxLength={15}
                value={location.state.row?.civilStatus}
              />
              <InputError errors={errors} name='civilStatus' />
            </div>

            <div className='container-buttons-footer flex gap-4 mt-3'>
              <Buton
                title='Regresar'
                primaryOrSecondary='secondary'
                type='button'
                onClick={handleNavigate}
              />
              <Buton
                title={location.state.row ? 'Editar' : 'Crear'}
                primaryOrSecondary='primary'
                type='submit'
              />
            </div>
            {isMessage.isMessage === true && (
              <div
                className='absolute inset-0 '
                style={{
                  top: '68%',
                  left: '38vw',
                  width: '23vw',
                }}>
                <MessageAlert
                  severity={isMessage.typeMessage}
                  message={isMessage.message}
                />
              </div>
            )}
          </div>
        </form>
      </FormProvider>
    </Wallpaper>
  )
}
