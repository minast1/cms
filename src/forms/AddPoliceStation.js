import { Grid, TextField, Divider, Typography, makeStyles, Button, LinearProgress, TextareaAutosize } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MainNav from '../components/MainNav';
import { AppConstants } from '../constants/AppConstants';
import Axios from 'axios';
import CustomDialog from '../components/CustomDialog';
import cuffs from '../images/investigation.jpg';
import { useHistory } from 'react-router-dom';
import { authMiddleWare, handleLogout } from '../utils/auth';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
    subTitle: {
        paddingTop: 10,
        marginLeft: 20
    }
}));

const AddPoliceStation = () => {
    const classes = useStyles();
    const history = useHistory();
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [formData, setFormData] = useState({
        stationName: null,
        feedbackNumber: null,
        addressLine1: null,
        addressLine2: null,
        email: null,
        country: null,
        state: null,
        city: null
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

    const handleSubmit = () => {
        setResponse({
            ...response, isDialogOpen: true, loading: { boolean: true, text: 'Saving police station...', title: 'Processing'}
        });

        const newStation = {
            stationName: formData.stationName,
            feedbackNumber: formData.feedbackNumber,
            email: formData.email,
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2,
            city: formData.city
        };
        
        Axios.post(`${AppConstants.apiEndpoint}/police-stations`, newStation, {
            headers: {
                'Authorization': localStorage.getItem('AuthToken')
            }
        })
        .then(res => {
            if (res.status == 200) {
                setResponse({
                    ...response, isDialogOpen: true, loading: { boolean: false, text: 'Successfully added police station.', title: 'Success' }
                });
            }
            else{
                setResponse({
                    ...response, isDialogOpen: true, loading: { boolean: false, text: 'Failed to add court', title: 'Failure' }
                });
            }
        })
        .catch(err => {
            if (err.response) {
                if (err.response.status == 403 ) {
                    handleLogout(history);
                } else if (err.response.status == 404) {
                    setResponse({
                        ...response, isDialogOpen: true, loading: { boolean: false, text: 'Page not found', title: 'Not found' }
                    });
                } else {
                    setResponse({
                        ...response, isDialogOpen: true, loading: { boolean: false, text: err.response.body.message, title: 'Error' }
                    });
                }
            } else if (err.request) {
                setResponse({
                    ...response, isDialogOpen: true, loading: {boolean: false, text: 'Failed to communicate with the server. Ensure you have a stable internet connection', title: 'Error'}
                });
            } else {
                setResponse({
                    ...response, isDialogOpen: true, loading: {boolean: false, text: err, title: 'Unknown Error'}
                });
            }
        });
    };

    useEffect(() => {
        authMiddleWare(history);
        setResponse({...response, isDialogOpen: true, loading: {
            boolean: true,
            text: 'Initializing...',
            title: 'Loading'
        }});
        Axios.get(`${AppConstants.apiEndpoint}/countries`, {
            headers: {
                'Authorization': localStorage.getItem('AuthToken')
            }
        }).then(res => {
            setCountries(res.data);
            Axios.get(`${AppConstants.apiEndpoint}/states`, {
                headers: {
                    'Authorization': localStorage.getItem('AuthToken')
                }
            }).then(res => {
                setStates(res.data);
                Axios.get(`${AppConstants.apiEndpoint}/cities`, {
                    headers: {
                        'Authorization': localStorage.getItem('AuthToken')
                    }
                }).then(res => {
                    setCities(res.data);
                    setResponse({...response, loading: {
                        boolean: false,
                        text: ''
                    }});
                }).catch(err => {
                    console.log(err);
                })
            }).catch(err => {
                console.log(err);
            })
        }).catch(error => {
            if (error.response) {
                if (error.response.status == 403) {
                    handleLogout(history);
                } else {
                    setResponse({
                        ...response, isDialogOpen: true, loading: { boolean: false, text: error.response.data.message, title: 'Error' }
                    });
                }
            } else if (error.request) {
                setResponse({
                    ...response, isDialogOpen: true, loading: {boolean: false, text: 'Failed to communicate with the server. Ensure you have a stable internet connection', title: 'Error'}
                });
            } else {
                setResponse({
                    ...response, isDialogOpen: true, loading: {boolean: false, text: error, title: 'Unknown Error'}
                });
            }
        });
    }, []);

    return (
        <div>
            <React.Fragment>
                <CustomDialog isOpen={response.isDialogOpen} onClose={() => setResponse({
                    ...response, isDialogOpen: false
                })} title={response.loading.title} content={response.loading.text} />
            </React.Fragment>
            <MainNav />
            <div  style={{marginLeft: 20, marginRight: 20}}>
                <Grid container spacing={2}>
                    <Grid item lg={7}>
                        <Typography variant="h5" className={classes.subTitle}>ADD POLICE STATION</Typography>
                        <Divider />
                        <br />
                        {response.loading.boolean ? <LinearProgress /> : <div></div>}
                        <form>
                            <Grid container spacing={3}>
                                <Grid item lg={7}>
                                    <TextField
                                        fullWidth
                                        label="Station Name"
                                        name="name"
                                        size="small"
                                        type="text"
                                        onChange={e => setFormData({...formData, stationName: e.target.value})}
                                        variant="outlined"
                                    />
                                    <br />
                                    <br />
                                    <TextField
                                        fullWidth
                                        label="Feedback Number"
                                        name="number"
                                        size="small"
                                        type="text"
                                        onChange={e => setFormData({...formData, feedbackNumber: e.target.value})}
                                        variant="outlined"
                                    />
                                    <br />
                                    <br />
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        size="small"
                                        type="email"
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                        variant="outlined"
                                    />
                                    <br />
                                    <br />
                                    <TextField
                                        fullWidth
                                        label="Address Line 1"
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
                                        label="Address Line 2"
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
                                        onChange={(e, value) => setFormData({...formData, country: value})}
                                        renderInput={params => <TextField {...params} label="Country" variant="outlined" size="small" />}
                                    />
                                    <br />
                                    <Autocomplete
                                        options={states}
                                        getOptionLabel={option => option.name}
                                        onChange={(e, value) => setFormData({...formData, state: value})}
                                        renderInput={params => <TextField {...params} label="Province" variant="outlined" size="small" />}
                                    />
                                    <br />
                                    <Autocomplete
                                        options={cities}
                                        getOptionLabel={option => option.name}
                                        onChange={(e, value) => setFormData({...formData, city: value})}
                                        renderInput={params => <TextField {...params} label="City" variant="outlined" size="small" />}
                                    />
                                    <br />
                                    <Button variant="contained" color="primary" disabled={response.loading.boolean} onClick={handleSubmit}>Submit</Button>
                                </Grid>
                            </Grid>    
                        </form>
                    </Grid>
                    <Grid item lg={5}>
                        <img src={cuffs} style={{width: 500, height: 500, paddingTop: 45}} />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default AddPoliceStation;