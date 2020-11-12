import { Grid, TextField, Divider, Typography, makeStyles, Button, LinearProgress, Snackbar } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useEffect, useState } from 'react';
import MainNav from '../components/MainNav';
import { Alert } from '@material-ui/lab';
import { AppConstants } from '../constants/AppConstants';
import Axios from 'axios';
import DateMoment from '@date-io/moment';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
    subTitle: {
        paddingTop: 10
    },
    textField: {
        width: 325
    }
}));

const provinces = [
    {title: 'Lusaka', id: 'lusaka'},
    {title: 'Central', id: 'central'},
    {title: 'Copperbelt', id: 'copperbelt'},
    {title: 'Southern', id: 'southern'},
    {title: 'Eastern', id: 'eastern'},
    {title: 'Luapula', id: 'luapula'},
    {title: 'Northern', id: 'northern'},
    {title: 'Western', id: 'western'},
    {title: 'North-Western', id: 'northWestern'},
    {title: 'Muchinga', id: 'muchinga'}
];

const cities = [
    {title: 'Ndola', provinceId: 'copperbelt'},
    {title: 'Lusaka', provinceId: 'lusaka'},
    {title: 'Livingstone', provinceId: 'southern'},
    {title: 'Kitwe', provinceId: 'copperbelt'},
    {title: 'Chingola', provinceId: 'copperbelt'},
    {title: 'MUfulira', provinceId: 'copperbelt'},
    {title: 'Kasama', provinceId: 'northern'},
    {title: 'Chipata', provinceId: 'eastern'},
    {title: 'Luanshya', provinceId: 'copperbelt'},
    {title: 'Kabwe', provinceId: 'central'}
];

const countries = [
    {title: 'Zambia', id: 'ZM'}
]

const ProfilePage = () => {
    const classes = useStyles();
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
    const [responseValues, setResponseValues] = useState({
        success: false,
        failed: false,
        loading: false,
        citiesDisabled: true
    });

    const citiesDropdown = (provincesId) => {
        const citiesToShow = new Array();
        cities.forEach(city => {
            if (city.provinceId === provincesId) {
                citiesToShow.push(city);
            }
        });
        return citiesToShow;
    }

    const handleCloseSnackbar = (event, reason) => {
        if(reason === 'clickaway'){
            return
        }
        setResponseValues({...responseValues, success: false, failed: false});
    }

    const handleSubmit = (event) => {
        setResponseValues({...responseValues, loading: true});
        event.preventDefault();
        const feedback = {
			name: formData.name,
			message: formData.message,
			phone: formData.phone,
            company: formData.company,
            email: formData.email
		};
        Axios.post(`${AppConstants.apiEndpoint}/feedback`, feedback)
        .then(res => {
            if (res.status === 200) {
                setResponseValues({...responseValues, success: true, loading: false});
            } else {
                setResponseValues({...responseValues, failed: true, loading: false});
            }
        })
        .catch(err => {
            setResponseValues({...responseValues, failed: true, loading: false});
            console.log(err);
        });
    };

    useEffect(() => {
        Axios.get(`${AppConstants.apiEndpoint}/user`, {
            headers: {
                'Authorization': localStorage.getItem('AuthToken')
            }
        })
        .then(res => {
            console.log(localStorage.getItem('AuthToken'));
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
        })
        .catch(err => {
            console.log(err);
        })
    }, [])
    return (
        <div>
            <React.Fragment>
                <Snackbar open={responseValues.success} onClose={handleCloseSnackbar} autoHideDuration={6000}>
                    <Alert severity="success" onClose={handleCloseSnackbar}>Success</Alert>
                </Snackbar>
                <Snackbar open={responseValues.failed} onClose={handleCloseSnackbar} autoHideDuration={6000}>
                    <Alert severity="error" onClose={handleCloseSnackbar}>Failed</Alert>
                </Snackbar>
            </React.Fragment>
            <MainNav />
            <div style={{marginLeft: 20, marginRight: 20}}>
                <Grid container spacing={3}>
                    <Grid item lg={7}>
                        <Typography variant="h5" className={classes.subTitle}>MY ACCOUNT</Typography>
                        <Divider />
                        <br />
                        {responseValues.loading ? <LinearProgress /> : <div></div>}
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
                                getOptionLabel={option => option.title}
                                fullWidth
                                size="small"
                                onChange={(e, value) => setFormData({...formData, country: value})}
                                renderInput={params => <TextField {...params} label="Country" variant="outlined" />}
                            />
                            <br />
                            <br />
                            <Autocomplete
                                options={provinces}
                                getOptionLabel={option => option.title}
                                fullWidth
                                size="small"
                                onChange={(e, value) => setFormData({...formData, province: value}, setResponseValues({...responseValues, citiesDisabled: false}))}
                                renderInput={params => <TextField {...params} label="Province" variant="outlined" />}
                            />
                            <br />
                            <br />
                            <Autocomplete
                                options={formData.province ? citiesDropdown(formData.province.id) : cities}
                                disabled={responseValues.citiesDisabled}
                                getOptionLabel={option => option.title}
                                fullWidth
                                size="small"
                                value={formData}
                                onChange={(e, value) => setFormData({...formData, city: value})}
                                renderInput={params => <TextField {...params} label="City" variant="outlined" />}
                            />
                            <br />
                            <br />
                            <input type="file" onChange={e => setFormData({...formData, profilePhoto: e.target.files[0]})} />
                                    <br />
                                    <br />
                                    <Button variant="contained" color="primary" disabled={responseValues.loading} onClick={handleSubmit}>Submit</Button>{'      '}
                                    <Button variant="contained" color="primary" disabled={responseValues.loading}>Reset</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item sm={12} md={5}>
                    <Typography variant="h5" className={classes.subTitle}>PROFILE PICTURE</Typography>
                    <Divider />
                    <br />
                    <img src={`${formData.profilePhoto}&token=74ff8789-2653-4e49-bb26-4c56d05ed159`} style={{width: 550, height: 700}}/>
                    <br />
                </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default ProfilePage;