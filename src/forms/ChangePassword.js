import { Grid, TextField, Divider, Typography, makeStyles, Button, LinearProgress } from '@material-ui/core';
import Axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CustomDialog from '../components/CustomDialog';
import MainNav from '../components/MainNav';
import { AppConstants } from '../constants/AppConstants';
import cuffs from '../images/investigation.jpg';

const useStyles = makeStyles((theme) => ({
    subTitle: {
        paddingTop: 10,
        marginLeft: 20
    }
}));

const ChangePassword = () => {
    const classes = useStyles();
    const history = useHistory();
    const [login, setLogin] = useState({
        confirmPassword: null,
        password: null,
        code: null
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [emailSent, setEmailSent] = useState({
        boolean: false,
        text: null
    });

    const sendCodeViaEmail = () => {
        setLoading(true);
        Axios.post(`${AppConstants.apiEndpoint}/users/password-reset`, null, {
            headers:  {
                'Authorization': localStorage.getItem('AuthToken')
            }
        }).then(res => {
            console.log(res);
            if (res.status == 200) {
                setEmailSent({
                    boolean: true, text: 'An email with instructions has been sent to your email address.'
                });
            }
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            if (error.response) {
                setErrorMessage(error.response.data.message);
            }else if (error.request) {
                setErrorMessage('Failed to commmunicate with the server.');
            }else {
                setErrorMessage('An unkown error occured');
            }
        })
    }
    
    const handleLogout = () => {
        localStorage.removeItem('AuthToken');
        localStorage.removeItem('UserType');
        history.push('/login');
    }
    
    return (
        <div>
            <React.Fragment>
                <CustomDialog isOpen={emailSent.boolean} onClose={handleLogout} title="Success" content={emailSent.text} />
            </React.Fragment>
            <MainNav />
            <Grid container spacing={2}>
                <Grid item lg={7}>
                    <div  style={{marginLeft: 20, marginRight: 20}}>
                        <Typography variant="h5" className={classes.subTitle}>CHANGE YOUR ACCOUNT PASSWORD</Typography>
                        <Divider />
                        <p style={{color: 'red'}}>{errorMessage}</p>
                        <br />
                        <form>
                            <Grid container spacing={3}>
                                <Grid item lg={6}>
                                    <p style={{color: 'red'}}>{errorMessage}</p>
                                    <Button variant="contained" color="primary" onClick={sendCodeViaEmail}>Send me a link to change my password</Button>
                                    <br />
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

export default ChangePassword;