import React, {useState,useEffect} from "react";
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { BASE_URL } from "../Config";
import { useHistory } from "react-router-dom";


function Login () {

    const paperStyle = {padding: 20, height: '40vh', width:250, margin:"40px auto" }
    const avtarStyle = {backgroundColor:'#5c6bc0'}
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
          history.push('/dashboard');
        }
      });
    
    async function handleSubmit(event) {
         event.preventDefault();
         console.log('Email:', email, 'Password:', password)
         let item={email,password};

         let result= await fetch(BASE_URL+"/authenticate",{
             method: 'POST',
             headers: {
                 "Content-Type":"application/json",
                 "Accept":"application/json"
             },
             body: JSON.stringify(item)
             
         });
         const v = JSON.stringify(item)
         console.log("v",v)
         result = await result.json();
         console.log("result",result);
         if (result.user && result.token) 
         {
            localStorage.setItem("token", (result.token))
            localStorage.setItem("user", JSON.stringify(result.user))
                history.push("/dashboard")
         }
         else{
             console.log("hello")
         }
      
    }
    
    return (
        <Grid>
             <h1 align='center'>Device Management</h1>
          <Paper elevation={10} style={paperStyle}>
              <form onSubmit={handleSubmit}>
              <Grid align='center'>
              <Avatar style={avtarStyle}><LockOutlinedIcon/></Avatar>
              </Grid><br/>
              <TextField
               id="email"
               label="Email" 
               type='email'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               variant="standard"
               fullWidth
               required /><br/><br/>
               <TextField
               id="password"
               label="Password" 
               type='password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               variant="standard"
               fullWidth
               required /><br/><br/>
               <Typography align='center'>
               <Button type="submit" variant="contained" color="primary">
                   Log in
               </Button>
               </Typography>
               </form>
          </Paper>
        </Grid>
    )
}

export default Login;