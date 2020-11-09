import { Grid, Divider, Typography, makeStyles, Container, Button, LinearProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MainNav from '../components/MainNav';
import { useHistory } from 'react-router-dom';
import CustomDialog from '../components/CustomDialog';
import { authMiddleWare } from '../utils/auth';

const useStyles = makeStyles(() => ({
    subTitle: {
        paddingTop: 10,
        marginLeft: 20
    },
    buttonText: {
        position: 'absolute',
        top: 0,
        left: -10
    }
}));

const Dashboard = () => {
    const classes = useStyles();
    const history = useHistory();
    const [response, setResponse] = useState({
        citiesDisabled: true,
        loading: {
            boolean: false,
            text: ''
        },
        errors: null,
        isDialogOpen: false
    });

    const handleLogout = () => {
        localStorage.removeItem('AuthToken');
        history.push('/login');
    }

    const goToURL = (url) => {
        history.push(url);
    }

    useEffect(() => {
        authMiddleWare(history);
    })
    return (
        <div>
            <React.Fragment>
                <CustomDialog isOpen={response.isDialogOpen} onClose={() => setResponse({
                    ...response, isDialogOpen: false
                })} title="Processing" content={response.loading.text} />
            </React.Fragment>
            <MainNav />
            <Typography variant="h5" className={classes.subTitle}>WELCOME TO CRIMINAL RECORD MANAGEMENT SYSTEM</Typography>
            <Divider />
            <br />
            {response.loading.boolean ? <LinearProgress /> : <div></div>}
            <form>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item lg={9}>
                            <Button color="primary" variant="contained" fullWidth size="small" onClick={() => goToURL('/log-complaint')}>Log Complaint</Button>
                            <br />
                            <br />
                            <Button color="primary" variant="contained" fullWidth size="small" onClick={() => goToURL('/me/complaints')}>My Complaints</Button>
                            <br />
                            <br />
                            <Button color="primary" variant="contained" fullWidth size="small" onClick={() => goToURL('/police-stations')}>All Police Stations</Button>
                            <br />
                            <br />
                            <Button color="primary" variant="contained" fullWidth size="small">Submit Feedback</Button>
                            <br />
                            <br />
                            <Button color="primary" variant="contained" fullWidth size="small">View Article Book</Button>
                            <br />
                            <br />
                            <Button color="primary" variant="contained" fullWidth size="small">My Account</Button>
                            <br />
                            <br />
                            <Button color="primary" variant="contained" fullWidth size="small">Change Password</Button>
                            <br />
                            <br />
                            <Button color="primary" variant="contained" fullWidth size="small" onClick={handleLogout}>Logout</Button>
                            <br />
                            <br />
                        </Grid>
                        <Grid item lg={3}>
                            
                        </Grid>
                    </Grid>
                </Container>
            </form>
        </div>
    );
};

export default Dashboard;