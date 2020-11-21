import { Grid, TextField, Divider, Typography, makeStyles, Button, LinearProgress } from '@material-ui/core';
import Axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MainNav from '../components/MainNav';
import { AppConstants } from '../constants/AppConstants';
import cuffs from '../images/investigation.jpg';

const useStyles = makeStyles((theme) => ({
    subTitle: {
        paddingTop: 10,
        marginLeft: 20
    }
}));

const Login = () => {
    const classes = useStyles();
    const history = useHistory();
    const [login, setLogin] = useState({
        email: null,
        password: null
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleLogin = () => {
        setLoading(true);
        Axios.post(`${AppConstants.apiEndpoint}/users/login`, {
            email: login.email,
            password: login.password
        })
        .then(res => {
            if (res.status == 200) {
                const token = res.data.token;
                Axios.get(`${AppConstants.apiEndpoint}/user`, {
                    headers: {
                        'Authorization': `Bearer ${res.data.token}`
                    }
                })
                .then(res => {
                    console.log(res);
                    localStorage.setItem('AuthToken', `Bearer ${token}`);
                    localStorage.setItem('UserType', res.data.userCredentials.userType)
                    setLoading(false);
                    history.push('/users/dashboard');
                })
                .catch(error => {
                    console.log(error);
                })
            } else {
                setLoading(false);
                setErrorMessage(res.data.general);
            }
        })
        .catch(error => {
            setLoading(false);
            setErrorMessage(error);
        })
    }

    return (
        <div>
            <MainNav />
            <Grid container spacing={2}>
                <Grid item lg={7}>
                    <div  style={{marginLeft: 20, marginRight: 20}}>
                        <Typography variant="h5" className={classes.subTitle}>LOGIN TO YOUR ACCOUNT</Typography>
                        <Divider />
                        <br />
                        <form>
                            <Grid container spacing={3}>
                                <Grid item lg={6}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        size="small"
                                        type="text"
                                        variant="outlined"
                                        onChange={(e) => setLogin({...login, email: e.target.value})}
                                    />
                                    <br />
                                    <br />
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        size="small"
                                        type="password"
                                        variant="outlined"
                                        onChange={(e) => setLogin({...login, password: e.target.value})}
                                    />
                                    <br />
                                    <p>{''}</p>
                                    <br />
                                    <Button variant="contained" color="primary" onClick={handleLogin}>Submit</Button>{'       '}
                                    <Button variant="contained" color="primary">Reset</Button>
                                    <br />
                                    {loading ? <LinearProgress /> : <div></div>}
                                </Grid>
                                <Grid item lg={6}>
                                    
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Grid>
                <Grid item lg={5}>
                    <img src={cuffs} style={{width: 500, height: 500, paddingTop: 42}} />
                    <br />
                    <br />
                </Grid>
            </Grid>
            <Divider />
            <Typography style={{textAlign: 'center'}}>&copy; Criminal Management System</Typography>
            <br />
        </div>
    );
};

export default Login;