import React from 'react'
import fondo from '../../images/fondo.jpg'
import './wallpaper.styles.css'

export default function Wallpaper({ children }) {
  return (
    <div className='relative containerDashboard'>
      <img src={fondo} alt='' className='object-cover relative ' />
      {children}
    </div>
  )
}
