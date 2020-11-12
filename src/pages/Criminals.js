import { Divider, Typography, makeStyles, LinearProgress, Grid, Paper, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MainNav from '../components/MainNav';
import { AppConstants } from '../constants/AppConstants';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
    subTitle: {
        paddingTop: 10,
        marginLeft: 20
    },
    innerPaper: {
        margin: 5,
        padding: 5
    },
    descriptionText: {
        fontWeight: 'bolder'
    }
}));

const Criminals = () => {
    const classes = useStyles();
    const [criminals, setCriminals] = useState([]);
    const [responseValues, setResponseValues] = useState({
        loading: false
    });

    const getAllCriminals = () => {
        setResponseValues({...responseValues, loading: true});
        Axios.get(`${AppConstants.apiEndpoint}/criminals`)
        .then(res => {
            setCriminals(res.data);
            setResponseValues({...responseValues, loading: false});
        })
        .catch(error => {
            setResponseValues({...responseValues, loading: false});
            console.log(error);
        })
    }

    useEffect(() => {
        getAllCriminals();
    }, []);

    return (
        <div>
            <MainNav />
            <div style={{marginLeft: 20, marginRight: 20}}>
                <Typography variant="h5" className={classes.subTitle}>ALL CRIMINALS</Typography>
                <Divider />
                <br />
                {responseValues.loading ? <LinearProgress /> : (
                    criminals.map((criminal, index) => {
                        return (
                            <div>
                                <Grid container spacing={2}>
                                <Grid item lg={2.5}>
                                    <Paper>
                                        <img src={criminal.imageUrl} style={{width:310, height: 290}}/>
                                    </Paper>
                                </Grid>
                                <Grid item lg={6}>
                                    <Paper>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Paper className={classes.innerPaper}>
                                                    <Typography className={classes.descriptionText}>Criminal Name</Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Paper className={classes.innerPaper}>
                                                    <Typography>{criminal.fullName}</Typography>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Paper className={classes.innerPaper}>
                                                    <Typography className={classes.descriptionText}>Criminal Type</Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Paper className={classes.innerPaper}>
                                                    <Typography>{criminal.criminalType}</Typography>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Paper className={classes.innerPaper}>
                                                    <Typography className={classes.descriptionText}>Feedback No.</Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Paper className={classes.innerPaper}>
                                                    <Typography>{criminal.phoneNumber}</Typography>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Paper className={classes.innerPaper}>
                                                    <Typography className={classes.descriptionText}>Height</Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Paper className={classes.innerPaper}>
                                                    <Typography>{`${criminal.height} Meters`}</Typography>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Paper className={classes.innerPaper}>
                                                    <Typography className={classes.descriptionText}>Weight</Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Paper className={classes.innerPaper}
                                                >
                                                    <Typography>{`${criminal.weight} KG`}</Typography>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                        <Paper>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Button variant="contained" color="primary" style={{marginRight: 0, float: 'right'}}>View Details</Button>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Button variant="contained" color="primary">View Crimes</Button>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <br />
                            <br />
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    );
};

export default Criminals;