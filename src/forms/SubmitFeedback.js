import { Grid, TextField, Divider, Typography, makeStyles, Button, LinearProgress, TextareaAutosize, Snackbar } from '@material-ui/core';
import React, { useState } from 'react';
import MainNav from '../components/MainNav';
import { Alert } from '@material-ui/lab';
import { AppConstants } from '../constants/AppConstants';
import Axios from 'axios';

const useStyles = makeStyles(() => ({
    subTitle: {
        paddingTop: 10
    },
    textField: {
        width: 325
    }
}));

const SubmitFeedback = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        name: null,
        message: null,
        email: null,
        phone: null,
        company: null
    });
    const [responseValues, setResponseValues] = useState({
        success: false,
        failed: false,
        loading: false
    });

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
                        <Typography variant="h5" className={classes.subTitle}>SUBMIT FEEDBACK</Typography>
                        <Divider />
                        <br />
                        {responseValues.loading ? <LinearProgress /> : <div></div>}
                        <form>
                            <Grid container spacing={3}>
                                <Grid item sm={12} md={12}>
                                    <TextField
                                        className={classes.textField}
                                        label="Name"
                                        name="name"
                                        size="small"
                                        type="text"
                                        required
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                        variant="outlined"
                                    />
                                    <br />
                                    <br />
                                    <TextField
                                        className={classes.textField}
                                        label="Company"
                                        name="company"
                                        size="small"
                                        type="text"
                                        required
                                        onChange={e => setFormData({...formData, company: e.target.value})}
                                        variant="outlined"
                                    />
                                    <br />
                                    <br />
                                    <TextField
                                        className={classes.textField}
                                        label="Email"
                                        name="email"
                                        size="small"
                                        type="text"
                                        required
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                        variant="outlined"
                                    />
                                    <br />
                                    <br />
                                    <TextField
                                        className={classes.textField}
                                        label="Phone Number"
                                        name="phone"
                                        size="small"
                                        type="text"
                                        required
                                        onChange={e => setFormData({...formData, phone: e.target.value})}
                                        variant="outlined"
                                    />
                                    <br />
                                    <br />
                                    <TextareaAutosize required placeholder="Full Details" style={{width: 450, height: 200}} onChange={(e) => setFormData({...formData, message: e.target.value})} />
                                    <br />
                                    <br />
                                    <Button variant="contained" color="primary" disabled={responseValues.loading} onClick={handleSubmit}>Submit</Button>{'      '}
                                    <Button variant="contained" color="primary" disabled={responseValues.loading}>Reset</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item sm={12} md={5}>
                    <Typography variant="h5" className={classes.subTitle}>WHERE TO FIND US</Typography>
                    <Divider />
                    <br />
                    <div className="content" dangerouslySetInnerHTML={{__html: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2441.9170720651186!2d28.329515628064797!3d-15.392896166097863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2szm!4v1605049486076!5m2!1sen!2szm" width="500" height="400" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>'}}></div>
                    <br />
                </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default SubmitFeedback;