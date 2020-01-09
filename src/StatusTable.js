import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import TableDisplay from './TableDisplay';
import TableEdit from './TableEdit';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Axios from 'axios';
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(level, version, status) {
    return { level, version, status };
}

const rows = [
    createData(1, '1.24', 'deploy'),
    createData(2, '1.23', 'test'),
    createData(3, '1.25', 'improve'),
    createData(4, '1.26', 'test'),
    createData(5, '1.27', 'deploy'),
];




export default function StatusTable() {
    const classes = useStyles();
    const [isEdit, setIsEdit] = useState(0);
    const [idGlobal, setIdGlobal] = useState(0);
    const [apiData, setApiData] = useState([]);
    const [count, setCount] = useState(0);
    const url = 'http://statrepapi.ap-southeast-1.elasticbeanstalk.com/status/'
    const tick = () => {
        setCount((prevState) => prevState < 3 ? prevState + 1 : 0);
    }
    const getAPIData = () => {
        fetch(url+'all')
            .then(res => res.json())
            .then((data) => {
                setApiData(data);
                //console.log(apiData);
            })
            .catch(error => console.log(error));
        setCount(count + 1);
    }
    useEffect(() => {
        const timer = setInterval(() => tick(), 500);
        return () => clearInterval(timer);
    });
    useEffect(() => {
        if (count === 0) {
            getAPIData();
        }
    }, [count]);

    var handleEdit = (id) => {
        //alert(id);
        setIsEdit(true);
        setIdGlobal(id);
    };
    var handleCancel = () => {
        setIsEdit(false);
    };
    var handleDelete = (id) => {
        Axios.delete(url+id);
    }
    var handleUpdate = (param) => {
        
        var putversion = param[0];
        var putstatus = param[1];
        var putid = param[2]
        Axios({
            method: 'put',
            url: url+putid,
            headers: {},
            data: {
                version: putversion,
                status: putstatus
            }
        });
    }
    var handleAdd = (param) => {
        var postversion = param[0];
        var poststatus = param[1];
        var response = Axios({
            method: 'post',
            url: url+'add',
            headers: {},
            data: {
                version: postversion,
                status: poststatus
            }
        });
        console.log(response.data);
    }
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead >
                    <TableRow>
                        <TableCell><Box><Typography fontWeight="fontWeightMedium">Level</Typography></Box></TableCell>
                        <TableCell align="left"><Box><Typography fontWeight="fontWeightBold">Version</Typography></Box></TableCell>
                        <TableCell align="left"><Box><Typography fontWeight="fontWeightBold">Status</Typography></Box></TableCell>
                        <TableCell align="left"><Box><Typography fontWeight="fontWeightBold">Edit</Typography></Box></TableCell>
                        <TableCell align="left"><Box><Typography fontWeight="fontWeightBold">Delete</Typography></Box></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {apiData.map(row => {
                        if (isEdit && (idGlobal == row.id)) {
                            return (<TableEdit
                                fromDisplay={true}
                                idGlobal={idGlobal}
                                handleCancel={handleCancel}
                                handleUpdate={handleUpdate}
                                row={row}
                            />)
                        }
                        else
                            return (<TableDisplay row={row} tableEdit={handleEdit} handleDelete={handleDelete}/>)

                    }
                    )}
                    <TableRow>
                        <TableCell align="center" colSpan={5}><Typography color="primary">Add New Record</Typography></TableCell>
                    </TableRow>
                    <TableEdit handleAdd={handleAdd} add={true} />
                </TableBody>
            </Table>
        </TableContainer>
    );
}