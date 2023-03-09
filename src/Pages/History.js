import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Layout from '../Layouts/Layout';
import { Table, TableHead, TableRow, TableBody, TableCell } from '@mui/material';
import { Box } from '@mui/system';
import Moment from 'moment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function History() {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };


    const [device, setDevice] = useState([]);
    const [assign, setAssign] = useState([]);
    const [user, setUser] = useState([]);
    useEffect(async () => {
        let result = await axios.get('/assignment_history');
        let result1 = await axios.get('/devices');
        let result2 = await axios.get('/users_to_assign');


        setDevice(result.data);
        setAssign(result1.data);
        setUser(result2.data);
    }, []);
    return (
        <div>
            <Layout />
            <Box ml={32} pt={0} border={4} width={600} >
                <div>
                    <FormControl required sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-required-label">Select Device</InputLabel>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={age}
                            label="Select Device *"
                            onChange={handleChange}
                        >   
                        <MenuItem value="">
                                Select Device
                            </MenuItem>
                            {assign.map((item) =>
                                <MenuItem value={item.name}> {item.name}{item.model}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl required sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-required-label">Select Operation</InputLabel>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={age}
                            label="Select Operation *"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                Select Operation
                            </MenuItem>
                            <MenuItem value="Accept Acknowledgement">Accept Acknowledgement</MenuItem>
                            <MenuItem value="Pending Acknowledgement">Pending Acknowledgement</MenuItem>
                            <MenuItem value="Assignment">Assignment</MenuItem>
                        </Select>
                        
                    </FormControl>
                    <FormControl required sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-required-label">Assigned From</InputLabel>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={age}
                            label="Select Assigned From *"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                Select Assigned From
                            </MenuItem>
                            {assign.map((item) =>
                                <MenuItem value={item.assignToUserId ? item.assignToUserId.name : item.assignTo}>{item.assignToUserId ? item.assignToUserId.name : item.assignTo}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl required sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-required-label">Assigned To</InputLabel>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={age}
                            label="Select Assigned To *"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                Select Assigned To
                            </MenuItem>
                            {assign.map((item) =>
                                <MenuItem
                                value={item.assignToUserId ? item.assignToUserId.name : item.assignTo}>{item.assignToUserId ? item.assignToUserId.name : item.assignTo}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>

                <Table border={4}>
                    <TableHead>
                        <TableRow>
                            <TableCell border={4}>Device</TableCell>
                            <TableCell>Operation</TableCell>
                            <TableCell>Assigned From</TableCell>
                            <TableCell>Assigned To</TableCell>
                            <TableCell>Assigned By</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {device.map((item) =>
                            <TableRow key={item._id}>
                                <TableCell component="th" scope="row">
                                    {item.deviceid.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.operation}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.assignedFrom}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.deviceid.assignTo}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.assignedByUserId.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {Moment.utc(item.operationTime).local().format('DD-MMM-YYYY h:mm A')}
                                </TableCell>
                            </TableRow>)}
                    </TableBody>

                </Table>
            </Box>
        </div>
    );
}

export default History;