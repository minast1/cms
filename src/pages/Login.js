import { Grid, TextField, Divider, Typography, makeStyles, Container, Button, LinearProgress } from '@material-ui/core';
import Axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MainNav from '../components/MainNav';
import { AppConstants } from '../constants/AppConstants';

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
            console.log(res);
            if (res.status == 200) {
                localStorage.setItem('CMSToken', `Bearer ${res.data.token}`);
                setLoading(false);
                history.push('/users/dashboard');
            } else {
                setLoading(false);
                setErrorMessage(res.data.general);
            }
        })
        .catch(error => {
            console.log(error.data)
            console.log(error.general);
            setLoading(false);
            setErrorMessage(error);
        })
    }

    return (
        <div>
            <MainNav />
            <Typography variant="h5" className={classes.subTitle}>LOGIN TO YOUR ACCOUNT</Typography>
            <Divider />
            <br />
            <form>
                <Container>
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
                </Container>
            </form>
        </div>
    );
};

export default Login;