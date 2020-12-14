import { Grid, TextField, Divider, Typography, makeStyles, Button, LinearProgress, Snackbar } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useEffect, useState } from 'react';
import MainNav from '../components/MainNav';
import { Alert } from '@material-ui/lab';
import { AppConstants } from '../constants/AppConstants';
import Axios from 'axios';
import DateMoment from '@date-io/moment';
import { Autocomplete } from '@material-ui/lab';
import { handleLogout } from '../utils/auth';
import CustomDialog from '../components/CustomDialog';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    subTitle: {
        paddingTop: 10
    },
    textField: {
        width: 325
    }
}));

const ProfilePage = () => {
    const classes = useStyles();
    const history = useHistory();
    const [formData, setFormData] = useState({
        fullName: null,
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
        loading: {
            boolean: false,
            text: '',
            title: ''
        },
        errors: null,
        isDialogOpen: false
    });


    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);

    const handleSubmit = () => {
        setResponse({
            ...response, isDialogOpen: true, loading: { boolean: true, text: 'Updating your profile...', title: 'Processing' }
        });
        const feedback = {
			fullName: formData.fullName,
			phoneNumber: formData.phoneNumber,
			dateOfBirth: formData.dateOfBirth,
            cityId: formData.city.id,
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2
		};
        Axios.post(`${AppConstants.apiEndpoint}/users/update`, feedback, {
            headers: {
                'Authorization': localStorage.getItem('AuthToken')
            }
        })
        .then(res => {
            if (res.status === 200) {
                setResponse({
                    ...response, isDialogOpen: true, loading: { boolean: false, text: 'Successfully updated profile data', title: 'Success' }
                });
            } else {
                setResponse({
                    ...response, isDialogOpen: true, loading: { boolean: false, text: 'Failed to update profile data', title: 'Failure' }
                });
            }
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response);
                if (error.response.status == 403) {
                    handleLogout(history);
                } else if (error.response.status == 404) {
                    setResponse({
                        ...response, isDialogOpen: true, loading: { boolean: false, text: 'Ooops. We could not find the page you are looking for.', title: 'Page Not Found' }
                    });
                } else {
                    setResponse({
                        ...response, isDialogOpen: true, loading: { boolean: false, text: error.response.data.message, title: 'Processing' }
                    });
                }
            } else {
                setResponse({
                    ...response, isDialogOpen: true, loading: { boolean: true, text: 'Failed to communicate with the server. Ensure you have a stable internet connection.', title: 'Failure' }
                });
            }
        });
    };

    useEffect(() => {
        setResponse({
            ...response, isDialogOpen: true, loading: { boolean: true, text: 'Loading user data', title: 'Processing' }
        });
        Axios.get(`${AppConstants.apiEndpoint}/user`, {
            headers: {
                'Authorization': localStorage.getItem('AuthToken')
            }
        })
        .then(res => {
            if (res.status == 200) {
                setFormData({
                    ...formData,
                    fullName: res.data.userCredentials.fullName,
                    phoneNumber: res.data.userCredentials.phoneNumber,
                    email: res.data.userCredentials.email,
                    dateOfBirth: res.data.userCredentials.dateOfBirth,
                    addressLine1: res.data.userCredentials.addressLine1,
                    addressLine2: res.data.userCredentials.addressLine2,
                    profilePhoto: res.data.userCredentials.imageUrl
                });
                Axios.get(`${AppConstants.apiEndpoint}/countries`)
                .then(res => {
                    if (res.status == 200) {
                        setCountries(res.data);
                        Axios.get(`${AppConstants.apiEndpoint}/states`)
                        .then(res => {
                            if (res.status == 200) {
                                setStates(res.data);
                                Axios.get(`${AppConstants.apiEndpoint}/cities`)
                                .then(res => {
                                    if (res.status == 200) {
                                        setCities(res.data);
                                        setResponse({
                                            ...response, isDialogOpen: false, loading: { boolean: false, text: 'Successfully Loaded user data', title: 'Success' }
                                        });
                                    } else {
                                        setResponse({
                                            ...response, isDialogOpen: true, loading: { boolean: false, text: 'Failed to load user data. Refresh this page to try again.', title: 'Error' }
                                        });
                                    }
                                })
                                .catch(error => {
                                    if (error.response) {
                                        if (error.response.status == 403) {
                                            handleLogout(history);
                                        } else if (error.response.status == 404) {
                                            setResponse({
                                                ...response, isDialogOpen: true, loading: { boolean: false, text: 'Ooops. We could not find the page you are looking for.', title: 'Page Not Found' }
                                            });
                                        } else {
                                            setResponse({
                                                ...response, isDialogOpen: true, loading: { boolean: false, text: error.response.data.message, title: 'Processing' }
                                            });
                                        }
                                    } else {
                                        setResponse({
                                            ...response, isDialogOpen: true, loading: { boolean: true, text: 'Failed to communicate with the server. Ensure you have a stable internet connection.', title: 'Failure' }
                                        });
                                    }
                                });
                            } else {
                                setResponse({
                                    ...response, isDialogOpen: true, loading: { boolean: false, text: 'Failed to load user data. Refresh this page to try again.', title: 'Error' }
                                });
                            }
                        })
                        .catch(error => {
                            if (error.response) {
                                if (error.response.status == 403) {
                                    handleLogout(history);
                                } else if (error.response.status == 404) {
                                    setResponse({
                                        ...response, isDialogOpen: true, loading: { boolean: false, text: 'Ooops. We could not find the page you are looking for.', title: 'Page Not Found' }
                                    });
                                } else {
                                    setResponse({
                                        ...response, isDialogOpen: true, loading: { boolean: false, text: error.response.data.message, title: 'Error' }
                                    });
                                }
                            } else {
                                setResponse({
                                    ...response, isDialogOpen: true, loading: { boolean: true, text: 'Failed to communicate with the server. Ensure you have a stable internet connection.', title: 'Failure' }
                                });
                            }
                        })
                    } else {
                        setResponse({
                            ...response, isDialogOpen: true, loading: { boolean: false, text: 'Failed to load user data. Refresh this page to try again.', title: 'Error' }
                        });
                    }
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status == 403) {
                            handleLogout(history);
                        } else if (error.response.status == 404) {
                            setResponse({
                                ...response, isDialogOpen: true, loading: { boolean: false, text: 'Ooops. We could not find the page you are looking for.', title: 'Page Not Found' }
                            });
                        } else {
                            setResponse({
                                ...response, isDialogOpen: true, loading: { boolean: false, text: error.response.data.message, title: 'Processing' }
                            });
                        }
                    } else {
                        setResponse({
                            ...response, isDialogOpen: true, loading: { boolean: true, text: 'Failed to communicate with the server. Ensure you have a stable internet connection.', title: 'Failure' }
                        });
                    }
                });
            } else {
                setResponse({
                    ...response, isDialogOpen: true, loading: { boolean: true, text: 'Failed to load user data. Refresh this page to try again.', title: 'Processing' }
                });
            }
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status == 403) {
                    handleLogout(history);
                } else if (error.response.status == 404) {
                    setResponse({
                        ...response, isDialogOpen: true, loading: { boolean: false, text: 'Ooops. We could not find the page you are looking for.', title: 'Page Not Found' }
                    });
                } else {
                    setResponse({
                        ...response, isDialogOpen: true, loading: { boolean: false, text: error.response.data.message, title: 'Processing' }
                    });
                }
            } else {
                setResponse({
                    ...response, isDialogOpen: true, loading: { boolean: true, text: 'Failed to communicate with the server. Ensure you have a stable internet connection.', title: 'Failure' }
                });
            }
        });
    }, [])
    return (
        <div>
            <React.Fragment>
                <CustomDialog isOpen={response.isDialogOpen} onClose={() => setResponse({
                    ...response, isDialogOpen: false
                })} title={response.loading.title} content={response.loading.text} />
            </React.Fragment>
            <MainNav />
            <div style={{marginLeft: 20, marginRight: 20}}>
                <Grid container spacing={3}>
                    <Grid item lg={7}>
                        <Typography variant="h5" className={classes.subTitle}>MY ACCOUNT</Typography>
                        <Divider />
                        <br />
                        {response.loading.boolean ? <LinearProgress /> : <div></div>}
                        <form>
                            <Grid container spacing={3}>
                                <Grid item sm={12} md={12}>
                                <TextField
                                fullWidth
                                name="name"
                                size="small"
                                type="text"
                                value={formData.fullName}
                                onChange={e => setFormData({...formData, fullName: e.target.value})}
                                variant="outlined"
                            />
                            <br />
                            <br />
                            <TextField
                                fullWidth
                                value={formData.email}
                                name="email"
                                size="small"
                                disabled
                                type="text"
                                onChange={e => setFormData({...formData, email: e.target.value})}
                                variant="outlined"
                            />
                            <br />
                            <br />
                            <TextField
                                fullWidth
                                value={formData.phoneNumber}
                                name="phone"
                                size="small"
                                type="text"
                                onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                                variant="outlined"
                            />
                            <br />
                            <br />
                            <MuiPickersUtilsProvider utils={DateMoment}>
                                <DatePicker
                                    fullWidth
                                    label="Date of Birth"
                                    name="dateOfBirth"
                                    variant="dialog"
                                    disableFuture
                                    autoOk
                                    value={formData.dateOfBirth}
                                    onChange={date => setFormData({...formData, dateOfBirth: date})}
                                />
                            </MuiPickersUtilsProvider>
                            <br />
                            <br />
                            <TextField
                                fullWidth
                                value={formData.addressLine1}
                                name="address1"
                                size="small"
                                type="text"
                                onChange={e => setFormData({...formData, addressLine1: e.target.value})}
                                variant="outlined"
                            />
                            <br />
                            <br />
                            <TextField
                                fullWidth
                                value={formData.addressLine2}
                                name="address2"
                                size="small"
                                type="text"
                                onChange={e => setFormData({...formData, addressLine2: e.target.value})}
                                variant="outlined"
                            />
                            <br />
                            <br />
                            <Autocomplete
                                options={countries}
                                getOptionLabel={option => option.name}
                                fullWidth
                                size="small"
                                onChange={(e, value) => setFormData({...formData, country: value})}
                                renderInput={params => <TextField {...params} label="Country" variant="outlined" />}
                            />
                            <br />
                            <br />
                            <Autocomplete
                                options={states}
                                getOptionLabel={option => option.name}
                                fullWidth
                                size="small"
                                onChange={(e, value) => setFormData({...formData, province: value})}
                                renderInput={params => <TextField {...params} label="Province" variant="outlined" />}
                            />
                            <br />
                            <br />
                            <Autocomplete
                                options={cities}
                                getOptionLabel={option => option.name}
                                fullWidth
                                size="small"
                                onChange={(e, value) => setFormData({...formData, city: value})}
                                renderInput={params => <TextField {...params} label="City" variant="outlined" />}
                            />
                            <br />
                            <br />
                            <input type="file" onChange={e => setFormData({...formData, profilePhoto: e.target.files[0]})} />
                                    <br />
                                    <br />
                                    <Button variant="contained" color="primary" disabled={response.loading.boolean} onClick={handleSubmit}>Submit</Button>{'      '}
                                    <Button variant="contained" color="primary" disabled={response.loading.boolean}>Reset</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item sm={12} md={5}>
                    <Typography variant="h5" className={classes.subTitle}>PROFILE PICTURE</Typography>
                    <Divider />
                    <br />
                    <img src={`${formData.profilePhoto}`} style={{width: 550, height: 700}} />
                    <br />
                </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default ProfilePage;