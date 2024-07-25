import React from 'react'
import { Router } from '@reach/router'
import Dashboard from '../components/dashboard/Dashboard'

export default function app () {
  return (
        <Router>
            <Dashboard path='/' />
        </Router>
  )
}
