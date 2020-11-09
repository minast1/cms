import { Grid, TextField, Divider, Typography, makeStyles, Container, Button, LinearProgress, TextareaAutosize } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useEffect, useState } from 'react';
import MainNav from '../components/MainNav';
import DateMoment from '@date-io/moment';
import { Autocomplete } from '@material-ui/lab';
import { AppConstants } from '../constants/AppConstants';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import CustomDialog from '../components/CustomDialog';
import { authMiddleWare } from '../utils/auth';

const useStyles = makeStyles((theme) => ({
    subTitle: {
        paddingTop: 10,
        marginLeft: 20
    }
}));

const SubmitComplaint = () => {
    const classes = useStyles();
    const history = useHistory();
    const [policeStations, setPoliceStations] = useState([]);
    const [formData, setFormData] = useState({
        title: null,
        stationId: null,
        fullAddress: null,
        fullDetails: null
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

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
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })
        })
        .catch(err => {
            console.log(err);
        });
    };

    const getAllPoliceStations = () => {
        setLoading(true);
        Axios.get(`${AppConstants.apiEndpoint}/police-stations`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('CMSToken')}`
            }
        })
        .then(res => {
            const stations = [];
            res.data.forEach(station => {
                stations.push({
                    title: `${station.name} - ${station.city}`,
                    id: station.id
                });
            });
            setPoliceStations(stations);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            console.log(error);
        })
    }

    useEffect(() => {
        authMiddleWare(history);
        getAllPoliceStations();
    }, []);

    return (
        <div>
            <MainNav />
            <Typography variant="h5" className={classes.subTitle}>SUBMIT COMPLAINT</Typography>
            <Divider />
            <br />
            {loading ? <LinearProgress /> : <div></div>}
            <form>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item lg={6}>
                        <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                size="small"
                                type="text"
                                onChange={e => setFormData({...formData, title: e.target.value})}
                                variant="outlined"
                            />
                            <br />
                            <br />
                            <Autocomplete
                                options={policeStations}
                                getOptionLabel={option => option.title}
                                fullWidth
                                size="small"
                                onChange={(e, value) => setFormData({...formData, stationId: value.id})}
                                renderInput={params => <TextField {...params} label="Police Station" variant="outlined" />}
                            />
                            <br />
                            <br />
                            <TextareaAutosize placeholder="Full Address" style={{width: '100%', height: '50%'}} onChange={(e) => setFormData({...formData, fullAddress: e.target.value})} />
                            <br />
                            <br />
                            <TextareaAutosize placeholder="Full Details" style={{width: '100%', height: '50%'}} onChange={(e) => setFormData({...formData, fullDetails: e.target.value})} />
                            <br />
                            <br />
                            <Button variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>Submit</Button>{'      '}
                            <Button variant="contained" color="primary" disabled={loading}>Reset</Button>
                        </Grid>
                        <Grid item lg={6}>
                            
                        </Grid>
                    </Grid>
                </Container>
            </form>
        </div>
    );
};

export default SubmitComplaint;