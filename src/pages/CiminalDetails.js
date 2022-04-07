import { Divider, Typography, makeStyles, LinearProgress, Grid, Paper, Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MainNav from '../components/MainNav';
import { AppConstants } from '../constants/AppConstants';
import Axios from 'axios';
import moment from 'moment';

const useStyles = makeStyles(() => ({
    subTitle: {
        paddingTop: 10,
        marginLeft:     0
    },
    innerPaper: {
        margin: 5,
        padding: 5
    },
    descriptionText: {
        fontWeight: 'bolder'
    }
}));

const Crimes = ["Use of Firearm in commission of an Offence",
    "Unauthorized Possession of a Firearm",
    "Child Pornography", "Child Luring", "Sexual Assult", "Sexual Assult Causing Bodily Harm",
    "Sexual Assult With a Weapon", "Administering of Noxious Substance", "Criminal Harassment", "Homicide", "Multiple Homicide",
    "Attempted Murder", "Larseny", "Grand Larseny", "Escape from Lawful Custody", "Perjury", "Fabricating Evidence",
    "Fraud", "Obstructing Justice", "Intimidation of a Justice System Participant", "Contempt of Court",
    "Dangerouse Operation of a Motor Vehicle", "Kidnapping and Unlawful Confinement", "Trafficking in Persons",
    "Assult Peace Officer", "Aggrevated Assult", "Theft", "Forceble Entry", "Identity Theft", "Forgery"]

const getCrimes = (arr, num = 1) => {
   const res = [];
   for(let i = 0; i < num; ){
      const random = Math.floor(Math.random() * arr.length);
      if(res.indexOf(arr[random]) !== -1){
         continue;
      };
      res.push(arr[random]);
      i++;
   };
   return res;
};
const CriminalDetails = () => {
    const classes = useStyles();
    const [criminal, setCriminal] = useState();
    const [crimes, setCrimes] = useState([]);
    const [responseValues, setResponseValues] = useState({
        loading: false
    });

    const getCriminal = (id) => {
        setResponseValues({...responseValues, loading: true});
        Axios.get(`${AppConstants.apiEndpoint}/criminals/${id}`)
        .then(res => {
            console.log(res);
            setCriminal(res.data);
            setResponseValues({...responseValues, loading: false});
        })
        .catch(error => {
            setResponseValues({...responseValues, loading: false});
            console.log(error);
        })
    }

    useEffect(() => {
        getCriminal(localStorage.getItem('CriminalId'));
        
        setCrimes(getCrimes(Crimes, 4));
    }, []);

    return (
        <div>
            <MainNav />
            <div style={{marginLeft: 20, marginRight: 20}}>
                {responseValues.loading ? <LinearProgress /> : (
                            <div>
                                <Grid container spacing={2}>
                                    <Grid item lg={7}>
                                            <Typography variant="h5" className={classes.subTitle}>{criminal?.fullName.toUpperCase()} CRIMINAL DETAILS</Typography>
                                            <Divider />
                                            <br />
                                        <Paper>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Paper className={classes.innerPaper}>
                                                        <Typography className={classes.descriptionText}>Criminal Type</Typography>
                                                    </Paper>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Paper className={classes.innerPaper}>
                                                        <Typography>{criminal?.criminalType}</Typography>
                                                    </Paper>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Paper className={classes.innerPaper}>
                                                        <Typography className={classes.descriptionText}>Criminal Name</Typography>
                                                    </Paper>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Paper className={classes.innerPaper}>
                                                        <Typography>{criminal?.fullName}</Typography>
                                                    </Paper>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Paper className={classes.innerPaper}>
                                                        <Typography className={classes.descriptionText}>Criminal Height</Typography>
                                                    </Paper>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Paper className={classes.innerPaper}>
                                                        <Typography>{`${criminal?.height} Meters`}</Typography>
                                                    </Paper>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Paper className={classes.innerPaper}>
                                                        <Typography className={classes.descriptionText}>Criminal Weight</Typography>
                                                    </Paper>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Paper className={classes.innerPaper}
                                                    >
                                                        <Typography>{`${criminal?.weight} KG`}</Typography>
                                                    </Paper>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Paper className={classes.innerPaper}>
                                                        <Typography className={classes.descriptionText}>Criminal Email</Typography>
                                                    </Paper>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Paper className={classes.innerPaper}>
                                                        <Typography>{criminal?.email}</Typography>
                                                    </Paper>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Paper className={classes.innerPaper}>
                                                        <Typography className={classes.descriptionText}>Phone Number</Typography>
                                                    </Paper>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Paper className={classes.innerPaper}>
                                                        <Typography>{criminal?.phoneNumber}</Typography>
                                                    </Paper>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Paper className={classes.innerPaper}>
                                                        <Typography className={classes.descriptionText}>Date of Birth</Typography>
                                                    </Paper>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Paper className={classes.innerPaper}>
                                                        <Typography>{moment(criminal?.dateOfBirth).format('LL')}</Typography>
                                                    </Paper>
                                                </Grid>
                                    </Grid>
                                </Paper>
                                <Paper>
                                    <Box style={{paddingTop: 5, paddingBottom:5,  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        CRIMES
                                    </Box>
                                    {
                                        crimes?.map((item, index) => (
                                                  <Paper className={classes.innerPaper} key={index} style={{marginBottom : 4}}>
                                                <Typography className={classes.descriptionText}>{`${index + 1} . ${item}`}</Typography>
                                                    </Paper>
                                        ))
                                    }
                                  
                                </Paper>
                                    </Grid>
                                    <Grid item lg={4}>
                                        <Divider />
                                        <br />
                                        <img src={criminal?.imageUrl} style={{width:488, height: 360}}/>
                                    </Grid>
                                </Grid>
                            <br />
                            <br />
                            </div>
                )}
            </div>
            <Divider />
            <Typography style={{textAlign: 'center'}}>&copy; Criminal Management System</Typography>
            <br />
        </div>
    );
};

export default CriminalDetails;