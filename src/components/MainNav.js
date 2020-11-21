import { AppBar, Container, Link, List, ListItem, ListItemText, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

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
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('AuthToken');
        localStorage.removeItem('UserType');
        history.push('/login');
    }

    const authenticatedNavButtons = (userType) => {
        switch(userType) {
            case 'resident':
                return (
                    <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
                        <Link href="/" className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="HOME" />
                            </ListItem>
                        </Link>
                        <Link href="/about-project" className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="ABOUT PROJECT" />
                            </ListItem>
                        </Link>
                        <Link href="/users/dashboard" className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="DASHBOARD" />
                            </ListItem>
                        </Link>
                        <Link href="/log-complaint" className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="LOG COMPLAINT" />
                            </ListItem>
                        </Link>
                        <Link href="/feedback" className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="SUBMIT FEEDBACK" />
                            </ListItem>
                        </Link>
                        <Link href="/change-password" className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="CHANGE PASSWORD" />
                            </ListItem>
                        </Link>
                        <Link href="/login" className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="LOGOUT" onClick={handleLogout} />
                            </ListItem>
                        </Link>
                    </List>
                );
            case 'police':
                return (
                    <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
                        <Link href="/" className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="HOME" />
                            </ListItem>
                        </Link>
                        <Link href="/about-project" className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="ABOUT PROJECT" />
                            </ListItem>
                        </Link>
                        <Link href="/users/dashboard" className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="DASHBOARD" />
                            </ListItem>
                        </Link>
                        <Link href="/administration" className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="ADMINISTRATION" />
                            </ListItem>
                        </Link>
                        <Link href="/reports" className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="REPORTS" />
                            </ListItem>
                        </Link>
                        <Link href="/me"  className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="MY ACCOUNT" />
                            </ListItem>
                        </Link>
                        <Link href="/change-password" className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="CHANGE PASSWORD" />
                            </ListItem>
                        </Link>
                        <Link href="/login" className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="LOGOUT" onClick={() => localStorage.removeItem('AuthToken')} />
                            </ListItem>
                        </Link>
                    </List>
                );
                case 'admin':
                    return (
                        <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
                            <Link href="/" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="HOME" />
                                </ListItem>
                            </Link>
                            <Link href="/about-project" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="ABOUT PROJECT" />
                                </ListItem>
                            </Link>
                            <Link href="/users/dashboard" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="DASHBOARD" />
                                </ListItem>
                            </Link>
                            <Link href="/administration" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="ADMINISTRATION" />
                                </ListItem>
                            </Link>
                            <Link href="/reports" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="REPORTS" />
                                </ListItem>
                            </Link>
                            <Link href="/change-password" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="CHANGE PASSWORD" />
                                </ListItem>
                            </Link>
                            <Link href="/login" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="LOGOUT" onClick={() => localStorage.removeItem('AuthToken')} />
                                </ListItem>
                            </Link>
                        </List>
                    );
            default:
                handleLogout();
                break;
        }
    }
    
    return (
        <AppBar position="static">
            <Typography variant="h4" className={classes.title}>Online Crime Reporting System</Typography>
            <Toolbar>
                <Container>
                    {localStorage.getItem('AuthToken') ? (
                        authenticatedNavButtons(localStorage.getItem('UserType'))
                    ) : (
                        <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
                            <Link href="/" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="HOME" />
                                </ListItem>
                            </Link>
                            <Link href="/about-project" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="ABOUT PROJECT" />
                                </ListItem>
                            </Link>
                            <Link href="/criminals" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="ALL CRIMINALS" />
                                </ListItem>
                            </Link>
                            <Link href="/log-complaint" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="LOG COMPLAINT" />
                                </ListItem>
                            </Link>
                            <Link href="/register" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="REGISTER" />
                                </ListItem>
                            </Link>
                            <Link href="/login" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="LOGIN" />
                                </ListItem>
                            </Link>
                            <Link href="/feedback" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="SUBMIT FEEDBACK" />
                                </ListItem>
                            </Link>
                        </List>
                    )}
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default MainNav;