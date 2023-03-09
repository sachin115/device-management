import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent } from '@mui/material';
import Layout from '../Layouts/Layout';
import Moment from 'moment';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import { Table, TableHead, TableRow, TableCell } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { BASE_URL } from '../Config';

function AssignMe() {
    const [device, setDevice] = useState(null);
    const [devices, setDevices] = useState([]);
    const [assign, setAssign] = useState([]);
    const history = useHistory();

    const handleClickOpen = (item) => {
        setDevice(item)
    };
    const handleClose = () => {
        setDevice(null);
    };
   
    async function handleSubmit(device) {
        
        console.log("device",device)
        let item = {'assignTo':device.assignTo,'deviceId':device._id}
        console.log("item",item)
        const token = localStorage.getItem('token');
        let result= await fetch(BASE_URL + "/user_to_locker",{
            method: 'POST',
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json",
                "authorization":token
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        console.log("result",result);
        history.push('/')
    }
    

    useEffect(async () => {
        const token = localStorage.getItem('token')

        let result = await axios.get('/assigned_devices');
        let result1 = await axios.get('/users_to_assign')


        setDevices(result.data)
        setAssign(result1.data)
    }, [])

    return (
        <><Layout />
            <div>
                <Box ml={32} pt={4} width={30} >
                    {devices.map((item) =>
                        <Grid container spacing={6}>
                            <Box m={2} pt={3}>
                                <Card sx={{ minWidth: 300 }}>
                                    <CardContent key={item._id}>
                                        <Typography variant="h5" color="text.secondary" gutterBottom>
                                            {item.name} {item.model}
                                        </Typography>
                                        <Typography component="div">
                                            IMEI: {item.IMEI}
                                        </Typography>
                                        <Typography variant="body2">
                                            Assigned Since: {Moment.utc(item.assignSince).local().format('DD-MMM-YYYY h:mm A')}
                                        </Typography>
                                        <Box m={0} pt={1}>
                                            <Button align='right' variant="contained" color='secondary' onClick={() => handleClickOpen(item)}>
                                                Assign To
                                            </Button>
                                        </Box>

                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>
                    )}
                </Box>
                {device !== null ?
                    <Dialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={device}

                    >

                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                            Select User to Handover {device.name} {device.model}
                        </DialogTitle>
                        <DialogContent dividers>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Device Name</TableCell>

                                        <TableCell>
                                            {device.name}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Device Model</TableCell>
                                        <TableCell>{device.model}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Device IMEI</TableCell>
                                        <TableCell>{device.IMEI}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Assigned Since</TableCell>
                                        <TableCell>{Moment.utc(device.assignSince).local().format('DD-MMM-YYYY h:mm A')}</TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>

                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                color='secondary'
                                autoFocus
                                onClick={()=>handleSubmit(device)}>
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                    : null}
            </div>
        </>
    );
}

export default AssignMe;



















//  <Box ml={35} mr={4} pt={15} sx={{ width: 'auto' }} >
//                     {/* <h2>Welcome, {user.name}!</h2> */}
// <Grid container spacing={2}>
//     <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 200 }} aria-label="simple table">
//             <TableHead>
//                 <TableRow>
//                     <TableCell>NAME</TableCell>
//                     <TableCell align="right">MODEL</TableCell>
//                     <TableCell align="right">IMEI</TableCell>
//                 </TableRow>
//             </TableHead>
//             <TableBody>
//                 {device.map((item) =>
//                     <TableRow
//                         key={item._id}
//                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                     >
//                         <TableCell component="th" scope="row">
//                             {item.name}
//                         </TableCell>
//                         <TableCell align="right">{item.model}</TableCell>
//                         <TableCell align="right">{item.IMEI}</TableCell>
//                     </TableRow>
//                 )}
//             </TableBody>
//         </Table>
//     </TableContainer>
// </Grid>
//                 </Box > 