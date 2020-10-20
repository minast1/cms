import { Container, Divider, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import MainNav from '../components/MainNav';

const useStyles = makeStyles((theme) => ({
    subTitle: {
        paddingTop: 10,
        marginLeft: 20
    }
}))
const AboutProject = () => {
    const classes = useStyles();
    return (
        <div>
            <MainNav />
            <Typography variant="h5" className={classes.subTitle}>ABOUT CRIMINAL RECORD MANAGEMENT SYSTEM</Typography>
            <Divider />
            <br />
            <Typography></Typography>
        </div>
    )
}

export default AboutProject;