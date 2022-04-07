import { Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import MainNav from '../components/MainNav';
import cuffs from '../images/investigation.jpg';

const useStyles = makeStyles(() => ({
    subTitle: {
        paddingTop: 10,
        marginLeft: 20,
        fontWeight: 'bolder',
        fontSize: 23,
        color: '#0d3e8c'
    }
}));

const AboutProject = () => {
    const classes = useStyles();
    return (
        <div>
            <MainNav />
            <div style={{marginLeft: 20, marginRight: 20}}>
                <Grid container spacing={2}>
                    <Grid item lg={7}>
                        <Typography className={classes.subTitle}>ABOUT ONLINE CRIME REPORTING SYSTEM</Typography>
                        <Divider />
                        <br />
                        <Typography>
                            Criminal Management System is an internet based Project developed using PHP and MySQL.
                            The aim of Criminal Management 
                            System will be to create a web based program  where people are able to report crime online. It gives the facility of
                            uploading videos or images of crime scenes to ensure that authorities can take action immediately.
                            The Objective of online crime reporting system is to develop a web based program using which people can report crime online.
                            It provides the facility of uploading images or videos of crime scenes to ensure that police may take action immediately.
                            It also supplies the advice of missing person, most wanted criminals and security tips for the awarness of people.
                        </Typography>
                    </Grid>
                    <Grid item lg={5}>
                        <img src={cuffs} style={{width: 500, height: 500, paddingTop: 45}} alt=""/>
                    </Grid>
                </Grid>
                <br />
            </div>
            <Divider />
            <Typography style={{textAlign: 'center'}}>&copy; Criminal Management System</Typography>
            <br />
        </div>
    );
};

export default AboutProject;