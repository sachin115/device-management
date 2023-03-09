import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/system';
import { BASE_URL } from '../Config';
import { Grid, Typography } from '@mui/material';
import Layout from '../Layouts/Layout';
import Moment from 'moment';



function Dashboard() {

  const [device, setDevice] = useState([]);
  useEffect(async () => {
    const token = localStorage.getItem('token')
    let result = await fetch(BASE_URL + '/devices', {
      headers: {
        "authorization": token
      }
    });
    result = await result.json();
    setDevice(result)
  }, []);


  return (
    <><Layout />
      <Box ml={32} pt={4} width={30} >
        {device.map((item) =>
        <Grid container spacing={6}>
        <Box m={2} pt={3}>
          <Card sx={{ minWidth: 300 }}>
            <CardContent key={item._id}>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                {item.name}{item.model}
              </Typography>
              <Typography component="div">
                IMEI: {item.IMEI}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Assigned To: {item.assignToUserId ? item.assignToUserId.name : item.assignTo}
              </Typography>
              <Typography variant="body2">
                Assigned Since: {Moment.utc(item.assignSince).local().format('DD-MMM-YYYY h:mm A')}
              </Typography>
            </CardContent>
          </Card></Box></Grid>)}
      </Box>
    </>
  )
}
export default Dashboard;



