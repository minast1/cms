import { Grid, Divider, Typography, makeStyles, Button, LinearProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MainNav from '../components/MainNav';
import { useHistory } from 'react-router-dom';
import CustomDialog from '../components/CustomDialog';
import { authMiddleWare } from '../utils/auth';
import cuffs from '../images/investigation.jpg';

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
        localStorage.removeItem('UserType');
        history.push('/login');
    }

    const goToURL = (url) => {
        history.push(url);
    }

    const authenticatedButtons = (userType) => {
        switch (userType) {
            case 'resident':
                return (
                    <div>
                        <Button color="primary" variant="contained" fullWidth size="small" onClick={() => goToURL('/log-complaint')}>Log Complaint</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small" onClick={() => goToURL('/me/complaints')}>My Complaints</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small" onClick={() => goToURL('/resident/police-stations')}>All Police Stations</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small" onClick={() => goToURL('/feedback')}>Submit Feedback</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small" onClick={() => goToURL("/resident/article-books")}>View Article Books</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small" onClick={() => goToURL('/me')}>My Account</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small" onClick={() => goToURL('/me/change-password')}>Change Password</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small" onClick={handleLogout}>Logout</Button>
                        <br />
                        <br />
                    </div>
                )
            case 'police':
                return (
                    <div>
                        <Button color="primary" variant="contained" fullWidth size="small">Add Crime</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small" onClick={() => goToURL('/police/criminals/registration')}>Add Criminal</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small" onClick={() => goToURL('/police/police-stations/add')}>Add Police Station</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small" onClick={() => goToURL('/police/crime-categories/add')}>Add Category</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small" onClick={() => goToURL('/police/article-books/add')}>Add Article Book</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small" onClick={() => goToURL('/resident/police-stations')}>All Police Stations</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small">All Police Reports</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small">All Member Reports</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small">All Category Reports</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small">All Complaints</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small">All Feedback</Button>
                        <br />
                        <br />
                    </div>
                );
            case 'admin':
                return (
                    <div>
                        <Button color="primary" variant="contained" fullWidth size="small" onClick={() => goToURL('/admin/police-officers/registration')}>Add Police</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small">Add Crime</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small" onClick={() => goToURL('/police/criminals/registration')}>Add Criminal</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small" onClick={() => goToURL('/admin/courts/add')}>Add Court</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small">Add Prison</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small" onClick={() => goToURL('/police/police-stations/add')}>Add Police Station</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small" onClick={() => goToURL('/police/crime-categories/add')}>Add Category</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small" onClick={() => goToURL('/police/article-books/add')}>Add Article Book</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small" onClick={() => goToURL('/admin/court-types/add')}>Add Court Type</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small" onClick={() => goToURL('/resident/police-stations')}>All Police Stations</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small">All Police Report</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small">All Members Report</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small">All Categories Report</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small">All Complaints</Button>
                        <br />
                        <br />
                        <Button color="primary" variant="contained" fullWidth size="small">All Feedback</Button>
                        <br />
                        <br />
                    </div>
                );
            default:
                break;
        }
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
            <div style={{marginLeft: 20, marginRight: 20}}>
                {response.loading.boolean ? <LinearProgress /> : <div></div>}
                <Grid container spacing={2}>
                    <Grid item lg={7}>
                        <Typography variant="h5" className={classes.subTitle}>WELCOME TO CRIMINAL RECORD MANAGEMENT SYSTEM</Typography>
                        <Divider />
                        <br />
                        {authenticatedButtons(localStorage.getItem('UserType'))}
                    </Grid>
                    <Grid item lg={5}>
                        <img src={cuffs} style={{width: 500, height: 500, paddingTop: 42}} />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Dashboard;