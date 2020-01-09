import React, { useState, useEffect, useRef } from 'react';
import TableCell from '@material-ui/core/TableCell';
import AddIcon from '@material-ui/icons/Add';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import TableRow from '@material-ui/core/TableRow';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function listStatus(value, desc) {
    return { value, desc };
}
const statuses = [
    listStatus('deploy', 'Under Deployment'),
    listStatus('test', 'Under Testing'),
    listStatus('improve', 'Under Improvement'),
];


export default function TableEdit({ handleCancel, handleAdd, handleUpdate, fromDisplay, add, row }) {
    const classes = useStyles();


    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    const [version, setVersion] = useState(fromDisplay?row.version:'');
    const [status, setStatus] = useState(fromDisplay?row.status:'');
    var param = [];
    const createParam = (paramversion, paramstatus) => {
        return (paramversion, paramstatus);
    };

    const handleChange = event => {
        setStatus(event.target.value);
        console.log(event.target.value);
    }
    const handleTextfield = event => {
        setVersion(event.target.value);
        console.log(event.target.value);
    }

    return (
        <TableRow>
            <TableCell align="left"><AddIcon onClick="" style={{ cursor: 'pointer' }} color="primary" /></TableCell>
            <TableCell align="left">
                <TextField
                    id="outlined-basic"
                    label="Version"
                    variant="outlined"
                    onChange={handleTextfield}
                    value={version} />
            </TableCell>
            <TableCell align="left">
                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={status}
                        onChange={handleChange}
                    >
                        {statuses.map(statusrow => {
                            return (<MenuItem value={statusrow.value}>{statusrow.desc}</MenuItem>)
                        })}
                    </Select>
                </FormControl>

            </TableCell>
            <TableCell align="left">
                {fromDisplay ? <CheckIcon color="primary" onClick={() =>{handleCancel();handleUpdate([version,status,row.id])}}/> : null}
                {fromDisplay ? <CloseIcon onClick={() => handleCancel()} color="secondary" /> : null}
                {add ? <Button color="primary" onClick={() => { handleAdd([version, status]); setStatus(''); setVersion('') }}>Add</Button> : null}
            </TableCell>
            <TableCell align="left"><Button color="secondary" onClick={() => { setStatus(''); setVersion(''); }} >Clear</Button></TableCell>
        </TableRow>
    )
}
