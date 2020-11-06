import { Grid, TextField, Divider, Typography, makeStyles, Container } from '@material-ui/core';
import React from 'react';
import MainNav from '../components/MainNav';

const useStyles = makeStyles((theme) => ({
    subTitle: {
        paddingTop: 10,
        marginLeft: 20
    }
}));

const Login = () => {
    const classes = useStyles();
    return (
        <div>
            <MainNav />
            <Typography variant="h5" className={classes.subTitle}>LOGIN TO YOUR ACCOUNT</Typography>
            <Divider />
            <br />
            <form>
                <Container>
                <Grid container spacing={3}>
                    <Grid item lg={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            size="small"
                            type="text"
                            variant="outlined"
                        />
                        <br />
                        <br />
                        <br />
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            size="small"
                            type="password"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item lg={6}>

                    </Grid>
                </Grid>
                </Container>
            </form>
        </div>
    );
};

export default Login;