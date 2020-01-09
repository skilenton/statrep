import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function renderSwitch(status) {
    switch (status) {
        case 'deploy':
            return 'Under Deployment';
        case 'test':
            return 'Under Testing';
        case 'improve':
            return 'Under Improvement';
        default:
            return 'Error';
    }
}

export default function TableDisplay({ row, tableEdit,handleDelete }) {
    return (
        <TableRow key={row.id}>
            <TableCell component="th" scope="row">
                {row.id}
            </TableCell>
            <TableCell align="left">{row.version}</TableCell>
            <TableCell align="left">{renderSwitch(row.status)}</TableCell>
            <TableCell align="left"><EditIcon onClick={() => tableEdit(row.id)} color="primary" /></TableCell>
            <TableCell align="left"><DeleteIcon onClick={() => handleDelete(row.id)} color="secondary" /></TableCell>
        </TableRow>
    )
}
