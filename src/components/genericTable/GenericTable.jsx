/* eslint-disable comma-dangle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import { Link } from 'gatsby'

export default function GenericTable({ rows, handleActionDelete }) {
  const columns = [
    { id: 'id', label: 'Id', minWidth: 50 },
    { id: 'name', label: 'Nombre', minWidth: 120 },
    { id: 'telephono', label: 'Teléfono', minWidth: 100 },
    {
      id: 'address',
      label: 'Dirección',
      minWidth: 100,
      align: 'right',
    },
    {
      id: 'codePostal',
      label: 'Codigo postal',
      minWidth: 100,
      align: 'right',
    },
    {
      id: 'age',
      label: 'Edad',
      minWidth: 100,
      align: 'right',
    },
    {
      id: 'civilStatus',
      label: 'Estado civil',
      minWidth: 100,
      align: 'right',
    },
    {
      id: '',
      label: 'Acciones',
      minWidth: 100,
      align: 'center',
      format: (value, row) => (
        <div>
          <Link to='/CreateOrEditItem' state={{ row }}>
            <Button
              variant='contained'
              color='success'
              sx={{ color: 'white', marginRight: '4px' }}>
              Editar
            </Button>
          </Link>
          <Button
            variant='contained'
            color='error'
            sx={{ color: 'white' }}
            onClick={() => handleActionDelete(row)}>
            Eliminar
          </Button>
        </div>
      ),
    },
  ]

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row?.code}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value, row) : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
