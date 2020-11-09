import { Grid, Divider, Typography, makeStyles, Container, Button, LinearProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MainNav from '../components/MainNav';
import { AppConstants } from '../constants/AppConstants';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import CustomDialog from '../components/CustomDialog';
import { authMiddleWare } from '../utils/auth';

const useStyles = makeStyles((theme) => ({
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
    const [formData, setFormData] = useState({
        fullName: null,
        email: null,
        password: null,
        confirmPassword: null,
        phoneNumber: null,
        dateOfBirth: null,
        addressLine1: null,
        addressLine2: null,
        country: null,
        province: null,
        city: null,
        profilePhoto: null,
        content: null
    });

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
        localStorage.removeItem('CMSToken');
        history.push('/login');
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setResponse({
            ...response, isDialogOpen: true, loading: { boolean: true, text: 'Saving user information.'}
        });

        const newUserData = {
			fullName: formData.fullName,
			dateOfBirth: formData.dateOfBirth,
			phoneNumber: formData.phoneNumber,
			country: formData.country,
			province: formData.province,
			email: formData.email,
			password: formData.password,
            confirmPassword: formData.confirmPassword,
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2,
            city: formData.city
		};
        Axios.post(`${AppConstants.apiEndpoint}/users/register`, newUserData)
        .then(res => {
            if (res.status == 201) {
                setResponse({
                    ...response, isDialogOpen: true, loading: { boolean: true, text: 'Successfully saved user information.'}
                });
            }
            else{
                setResponse({
                    ...response, isDialogOpen: true, loading: { boolean: true, text: 'Failed to save user information.'}
                });
            }
            setResponse({
                ...response, isDialogOpen: true, loading: { boolean: true, text: 'Uploading profile picture.'}
            })
            localStorage.setItem("AuthToken", res.data.token);
            let form_data = new FormData();
            form_data.append('image', formData.profilePhoto);
            form_data.append('content', formData.content);
            Axios.post(`${AppConstants.apiEndpoint}/users/profile-picture`, form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'email': formData.email
                }
            }).then(res => {
                if (res.status === 200) {
                    setResponse({
                        ...response, isDialogOpen: true, loading: { boolean: false, text: 'Successfully uploaded profile picture.'}
                    })
                } else {
                    setResponse({
                        ...response, isDialogOpen: true, loading: { boolean: true, text: 'Failed to upload profile picture.'}
                    })
                }
            })
            .catch(error => {
                console.log(error);
                setResponse({
                    ...response, isDialogOpen: true, errors: error, loading: { boolean: false, text: `Error: ${error}`}
                });
            })
        })
        .catch(err => {
            console.log(err);
            setResponse({
                ...response, isDialogOpen: true, loading: { boolean: false, text: `Error: ${err}`}
            })
        });
    };

    const goToURL = (url) => {
        history.push(url);
    }

    const getUserDetails = () => {
        
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
                            <Button color="primary" variant="contained" fullWidth size="small">My Complaints</Button>
                            <br />
                            <br />
                            <Button color="primary" variant="contained" fullWidth size="small">All Police Stations</Button>
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