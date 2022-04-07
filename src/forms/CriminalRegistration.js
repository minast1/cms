/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, TextField, Divider, Typography, makeStyles, Button, LinearProgress } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useEffect, useState } from 'react';
import MainNav from '../components/MainNav';
import DateMoment from '@date-io/moment';
import { Autocomplete } from '@material-ui/lab';
import { AppConstants } from '../constants/AppConstants';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import CustomDialog from '../components/CustomDialog';
import cuffs from '../images/investigation.jpg';
import { authMiddleWare } from '../utils/auth';

const useStyles = makeStyles((theme) => ({
    subTitle: {
        paddingTop: 10,
        marginLeft: 20
    }
}));

const CriminalRegistration = () => {
    const classes = useStyles();
    const history = useHistory();
    const [countries, setCountries] = useState(['Ghana', 'Nigeria', 'Togo']);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [formData, setFormData] = useState({
        fullName: null,
        email: null,
        height: null,
        weight: null,
        phoneNumber: null,
        dateOfBirth: null,
        addressLine1: null,
        addressLine2: null,
        city: null,
        profilePhoto: null,
        content: null
    });

    const [response, setResponse] = useState({
        loading: {
            boolean: false,
            text: ''
        },
        errors: null,
        isDialogOpen: false
    });

    /*const citiesDropdown = (provincesId) => {
        const citiesToShow = new Array();
        cities.forEach(city => {
            if (city.provinceId === provincesId) {
                citiesToShow.push(city);
            }
        });
        return citiesToShow;
    }*/

    const handleSubmit = (event) => {
        event.preventDefault();
        setResponse({
            ...response, isDialogOpen: true, loading: { boolean: true, text: 'Saving user information.'}
        });

        const newUserData = {
			fullName: formData.fullName,
			dateOfBirth: formData.dateOfBirth,
			phoneNumber: formData.phoneNumber,
			email: formData.email,
			height: formData.height,
            weight: formData.weight,
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2,
            criminalType: 'unknown',
            cityId: formData.city.id
		};
        Axios.post(`${AppConstants.apiEndpoint}/criminals`, newUserData, {
            headers: {
                'Authorization': localStorage.getItem('AuthToken'),
                'email': formData.email
            }
        })
        .then(res => {
            if (res.status === 201) {
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
            let form_data = new FormData();
            form_data.append('image', formData.profilePhoto);
            form_data.append('content', formData.content);
            Axios.post(`${AppConstants.apiEndpoint}/criminals/images`, form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': localStorage.getItem('AuthToken'),
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
                    ...response, isDialogOpen: true, errors: error, loading: { boolean: false, text: error}
                });
            })
        })
        .catch(err => {
            console.log(err);
            setResponse({
                ...response, isDialogOpen: true, loading: { boolean: false, text: err}
            })
        });
    };

    useEffect(() => {
        authMiddleWare(history);
        setResponse({...response, loading: {
            boolean: true,
            text: 'Initializing...'
        }})
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
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div>
            <React.Fragment>
                <CustomDialog isOpen={response.isDialogOpen} onClose={() => setResponse({
                    ...response, isDialogOpen: false
                })} title="Processing" content={response.loading.text} />
            </React.Fragment>
            <MainNav />
            <div  style={{marginLeft: 20, marginRight: 20}}>
                <Grid container spacing={2}>
                    <Grid item lg={7}>
                        <Typography variant="h5" className={classes.subTitle}>CRIMINAL REGISTRATION FROM</Typography>
                        <Divider />
                        <br />
                        {response.loading.boolean ? <LinearProgress /> : <div></div>}
                        <form>
                            <Grid container spacing={3}>
                                <Grid item lg={7}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        name="name"
                                        size="small"
                                        type="text"
                                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                                        variant="outlined"
                                    />
                                    <br />
                                    <br />
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        size="small"
                                        type="text"
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                        variant="outlined"
                                    />
                                    <br />
                                    <br />
                                    <TextField
                                        fullWidth
                                        label="Height (m)"
                                        name="height"
                                        size="small"
                                        type="number"
                                        onChange={e => setFormData({...formData, height: e.target.value})}
                                        variant="outlined"
                                    />
                                    <br />
                                    <br />
                                    <TextField
                                        fullWidth
                                        label="Weight (KG)"
                                        name="weight"
                                        size="small"
                                        type="number"
                                        onChange={e => setFormData({...formData, weight: e.target.value})}
                                        variant="outlined"
                                    />
                                    <br />
                                    <br />
                                    <TextField
                                        fullWidth
                                        label="Mobile"
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
                                        onChange={(e, value) => setFormData({...formData, province: value}, setResponse({...response, citiesDisabled: false}))}
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
                                    Photo:{'         '}<input type="file" onChange={e => setFormData({...formData, profilePhoto: e.target.files[0]})} />
                                    <br />
                                    <br />
                                    <Button variant="contained" color="primary" disabled={response.loading.boolean} onClick={handleSubmit}>Submit</Button>
                                    <br />
                                    <br />
                                </Grid>
                            </Grid>    
                        </form>
                    </Grid>
                    <Grid item lg={5}>
                        <img src={cuffs} style={{width: 500, height: 500, paddingTop: 45}} alt=""/>
                    </Grid>
                </Grid>
            </div>
            <Divider />
            <Typography style={{textAlign: 'center'}}>&copy; Criminal Management System</Typography>
            <br />
        </div>
    );
};

export default CriminalRegistration;