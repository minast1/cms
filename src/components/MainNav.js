import { AppBar, Container, Link, List, ListItem, ListItemText, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React from 'react';

const navLinks = [
    {title: 'HOME', path: '/'},
    {title: 'ABOUT PROJECT', path: '/about-project'},
    {title: 'ALL CRIMINALS', path: '/all-criminals'},
    {title: 'LOG COMPLAINT', path: '/log-complaint'},
    {title: 'REGISTER', path: '/register'},
    {title: 'LOGIN', path: '/login'},
    {title: 'SUBMIT FEEDBACK', path: '/feedback'}
]

const useStyles = makeStyles((theme) => ({
    title: {
        paddingTop: 2,
        paddingBottom: 10,
        marginLeft: 20
    },
    navDisplayFlex: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    navbarDisplayFlex: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    linkText: {
        textDecoration: 'none',
        textTransform: 'uppercase',
        color: 'white'
    }
}));

const MainNav = () => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Typography variant="h4" className={classes.title}>Online Crime Reporting System</Typography>
            <Toolbar>
                <Container>
                    <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
                        {navLinks.map(({title, path}) => (
                            <Link href={path} key={title} className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary={title} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default MainNav;