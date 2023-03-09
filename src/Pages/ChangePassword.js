import React, { useState } from 'react';
import { Grid, Paper } from '@mui/material';
import { TextField, Typography, Button } from '@mui/material';
import { BASE_URL } from '../Config';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function ChangePassword() {
    const paperStyle = {padding: 20, height: '40vh', width:250, margin:"40px auto" }
    const [password, setPassword] = useState();
    const [newpassword, setNewPassword] = useState();
    const [conformpassword, setConformPassword] = useState();
    
    const history = useHistory();
    async function handleSubmit (event)  {
         event.preventDefault()
         const token = localStorage.getItem('token')
         let item = {password, newpassword, conformpassword}
         let result = await fetch(BASE_URL + '/changepassword',{
             method : 'POST',
             headers: {
                "Content-Type":"application/json",
                "Accept":"application/json",
                "authorization": token
             },
             body: JSON.stringify(item)
         });
         result = await result.json();
         console.log("result",result);
         localStorage.setItem("token",'')
         localStorage.clear()
         history.push('/login')
    }

    return (
        <Grid>
            <h1 align='center'>Change Password</h1>
            <Paper elevation={10} style={paperStyle}>
                <form onSubmit={handleSubmit}>
                    <Grid align='center'>
                    </Grid><br />
                    <TextField
                        id="password"
                        label="password"
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="standard"
                        fullWidth
                        required /><br /><br />
                    <TextField
                        id="newpassword"
                        label="newpassword"
                        type='newpassword'
                        value={newpassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        variant="standard"
                        fullWidth
                        required /><br /><br />
                    <TextField
                        id="conformpassword"
                        label="conformpassword"
                        type='password'
                        value={conformpassword}
                        onChange={(e) => setConformPassword(e.target.value)}
                        variant="standard"
                        fullWidth
                        required /><br /><br />
                    <Typography align='center'>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Typography>
                </form>
            </Paper>
        </Grid>
    )
}
     
 

export default ChangePassword;