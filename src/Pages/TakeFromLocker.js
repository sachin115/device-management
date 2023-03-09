import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Layout from '../Layouts/Layout'
import { Box } from '@mui/system';
import { Card, CardContent, Typography, CardActions } from '@mui/material';
import { Button, Grid } from '@mui/material';
import { Table, TableBody, TableRow, TableCell, TableHead } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Moment from 'moment';
import { BASE_URL } from '../Config';
import { useHistory } from 'react-router-dom';







function TakeFromLocker() {
    const [device,setDevice] = useState(null);
    
    const [devices, setDevices] = useState([]);
    const history = useHistory();

    const handleClickOpen = (item) => {
        setDevice(item)
        console.log("item",item)
        
    }
    const handleClose = () => {

        setDevice(null);
    };

    async function handleSubmit(device) {
        
        console.log("device",device)
        let item = {'deviceId':device._id}
        console.log("item",item)
        const token = localStorage.getItem('token');
        let result= await fetch(BASE_URL + "/locker_to_user",{
            method: 'POST',
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json",
                "authorization": token
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        console.log("result",result);
        history.push('/')
    }

    useEffect(async () => {
        let result = await axios.get('/assigned_to_locker');
        setDevices(result.data)
        
        
    }, [])




    return (

        <><Layout />

            <div>

                <Box ml={35} mr={4} pt={1} width={30} >
                    {devices.map((item,index) =>
                        <Grid container spacing={3}>
                            <Box m={2} pt={3}>
                                <Card sx={{ minWidth: 275 }}>

                                    <CardContent key={item._id}>
                                        <Typography variant="h5" color="text.secondary" gutterBottom>
                                            {item.name}{item.model}
                                        </Typography>
                                        <Typography component="div">
                                            IMEI: {item.IMEI}
                                        </Typography>
                                        <Typography variant="body2">
                                            Assigned Since: {Moment.utc(item.assignSince).local().format('DD-MMM-YYYY h:mm A')}
                                        </Typography>
                                    </CardContent>

                                    <CardActions>
                                        <Button variant="contained" color='secondary' onClick={()=> handleClickOpen(item)}>
                                            Take
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Box>
                        </Grid>
                    )}
                </Box>
               {device!==null?<Dialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={device}
                >
                    <DialogTitle
                        id="customized-dialog-title" onClose={handleClose}>
                        Take from Locker {device.name} {device.model}
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
                        <Button onClick={()=> handleSubmit(device)} color='primary' variant="contained"  >
                            Conform
                        </Button>
                    </DialogActions>
                </Dialog> :
                null }
                

            </div>

        </>
    );
}

export default TakeFromLocker;



// BootstrapDialogTitle.propTypes = {
//     children: PropTypes.node,
//     onClose: PropTypes.func.isRequired,
// };




// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Redirect , withRouter } from 'react-router-dom';
// import { fetchAssignedToLocker, takeFromLocker } from '../../actions';
// import AssignToLockerModal from './AssignToLockerModal';
// import { Grid } from 'semantic-ui-react';
// import Device from '../devices/deviceComponent';

// class AssignedToLocker extends Component {

//   componentDidMount() {
//     this.props.fetchAssignedToLocker();
//   }

//   showModal = (device) => {
//     this.setState({ showAssignToModal: true, assigendDeviceDetails: device });
//     // const assigendDeviceDetails = this.props.assignedDevices.filter((r)=> {
//     //   if (r._id === device_id) return r;
//     // });
//   };

//   state = { showAssignToModal: false };

//   hideModal = () => {
//     this.setState({ showAssignToModal: false });
//   };

//   onSubmit =(values)=> {
//     this.setState({ showAssignToModal: false })
//     this.props.takeFromLocker(values, this.props.history);
//   }

//   renderContent() {

//     switch (this.props.auth) {
//       case null:
//         return;
//       case false:
//         return <Redirect to="/login" />
//       default:
//         return (
//           <div>
//             {
//               this.props.assignedToLocker && this.props.assignedToLocker.length > 0 ?
//               (<Grid divided='vertically'>
//                 <Grid.Row columns={2}>
//                   {this.props.assignedToLocker.map((r, index) => (
//                     <Device key={index} {r} action={"Take"} onAction={() => this.showModal(r)} />
//                   ))}
//                 </Grid.Row>
//               </Grid>): (<div>No Device Available in Locker</div>)
//             }
//           </div>
//         );
//     }
//   }

//   renderAssignToModal() {
//     return (<AssignToLockerModal
//       showAssignToModal={this.state.showAssignToModal}
//       handleClose={this.hideModal}
//       assignedDeviceDetails={this.state.assigendDeviceDetails}
//       userToAssign={this.props.userToAssign}
//       onSubmit={this.onSubmit}
//     />)
//   }

//   render() {
//     return (
//       <div>
//         {this.state.showAssignToModal && this.renderAssignToModal()}
//         {this.renderContent()}
//       </div>
//     );
//   }
// }

// function mapStateToProps({ auth, assignedToLocker, history }) {
//   return { auth, assignedToLocker, history };
// }

// export default connect(mapStateToProps, { fetchAssignedToLocker, takeFromLocker })(withRouter(AssignedToLocker));
// import React, { Component } from 'react';
// import { reduxForm, Field} from 'redux-form';
// import Moment from 'moment';
// import RemoteSubmitButton from './RemoteSubmitButton';
// import { Modal} from 'semantic-ui-react';


// const renderSelectField = ({ input, label, type, meta: { touched, error }, userToAssign }) => (
//   <div>
//     <select {...input}>
//       <option value="">Select</option>
//       {
//         userToAssign && userToAssign.map((user, index) => (
//           <option id="trip1_itin" className="section" key={index} value={user._id}>
//             {user.name}
//           </option>
//         ))
//       }
//     </select>
//     <div className="red-text" style={{ marginBottom: '20px' }}>
//       {touched && error}
//     </div>
//   </div>
// )

// class AssignToLockerModal extends Component {

//   componentDidMount() {
//     this.props.change('deviceId', this.props.assignedDeviceDetails._id);
//   }

//   render() {
//     let { handleSubmit, handleClose, showAssignToModal, assignedDeviceDetails, children } = this.props;
//     return (
//       <Modal closeIcon onClose={handleClose} open={showAssignToModal} size={"small"}>
//         <Modal.Header>Take {assignedDeviceDetails && assignedDeviceDetails.name + ' ' + assignedDeviceDetails.model} from Locker</Modal.Header>
//         <Modal.Content>
//           <Modal.Description>
//             <div>
//               <form onSubmit={handleSubmit}>
//                 <table border="1">
//                   <tbody>
//                     <tr>
//                       <th>Device Name</th><th>
//                         {assignedDeviceDetails && assignedDeviceDetails._id} {assignedDeviceDetails && assignedDeviceDetails.name}
//                         <Field
//                           name="deviceId"
//                           component="input"
//                           type="hidden"
//                         />
//                       </th>
//                     </tr>
//                     <tr>
//                       <th>Device Model</th><th>{assignedDeviceDetails && assignedDeviceDetails.model}</th>
//                     </tr>
//                     <tr>
//                       <th>Device IMEI</th><th>{assignedDeviceDetails && assignedDeviceDetails.IMEI}</th>
//                     </tr>
//                     <tr>
//                       <th>Assigned Since</th><th>{Moment.utc(assignedDeviceDetails && assignedDeviceDetails.assignSince).local().format('DD-MMM-YYYY h:mm A')}</th>
//                     </tr>
//                   </tbody>
//                 </table>
//                 {children}
//                 <RemoteSubmitButton />
//               </form>
//             </div>
//           </Modal.Description>
//         </Modal.Content>
//       </Modal>
//     )
//   }
// }

// const validate = () => {
//   const errors = {}
//   return errors;
// }

// export default reduxForm({
//   validate,
//   form: 'AssignToLockerModal',
// })(AssignToLockerModal);
// import React from 'react'
// import { connect } from 'react-redux'
// import { submit } from 'redux-form'
// import { Button } from 'semantic-ui-react';

// const style = {
//   display: 'block',
//   margin: '2% auto 2% auto',
// }

// const RemoteSubmitButton = ({ dispatch }) =>
//   <div >
//     <Button style={style} positive
//       onClick={() => dispatch(submit('AssignToLockerModal'))}>Confirm</Button>
//   </div>

// export default connect()(RemoteSubmitButton);
// import { takeFromLocker } from '../../actions';

// function submittakefromlocker(values) {
//     takeFromLocker(values);
// }

// export default submittakefromlocker;

