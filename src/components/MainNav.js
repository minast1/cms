import { AppBar, Container, Link, List, ListItem, ListItemText, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import React, {  useState } from 'react';
import { useHistory } from 'react-router-dom';
import { handleLogout } from '../utils/auth';

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

    const [dropdownMenu, setDropdownMenu] = useState({
        anchorEl: null,
        open: false
    });

    const handleShowMenu = (e) => {
        setDropdownMenu({
            ...dropdownMenu, open: true, anchorEl: e.currentTarget
        });
    };

    const handleCloseMennu = (e) => {
        setDropdownMenu({
            ...dropdownMenu, open: false, anchorEl: null
        });
    };

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
                      
                        <Link href="/users/dashboard" className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="DASHBOARD" />
                            </ListItem>
                        </Link>
                        
                       
                        <Link href="/me/change-password" className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="CHANGE PASSWORD" onClick={() => history.push('/me/change-password')} />
                            </ListItem>
                        </Link>
                        <Link href="/login" className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="LOGOUT" onClick={() => handleLogout(history)} />
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
                                <ListItemText
                                    primary="REPORTS"
                                    aria-haspopup="true"
                                    aria-owns={dropdownMenu.open ? 'reports-dropdown-menu' : null}
                                    onMouseOver={handleShowMenu}
                                />
                                <Menu
                                    open={dropdownMenu.open}
                                    anchorEl={dropdownMenu.anchorEl}
                                    id="reports-dropdown-menu"
                                    onRequestClose={handleCloseMennu}
                                    PaperProps={{onMouseLeave: handleCloseMennu}}
                                >
                                    <MenuItem onClick={(e) => history.push('/resident/police-stations')}>ALL POLICE STATIONS</MenuItem>
                                    <MenuItem>ALL POLICE REPORT</MenuItem>
                                    <MenuItem>ALL MEMBERS REPORT</MenuItem>
                                    <MenuItem>ALL CATEGORY REPORT</MenuItem>
                                    <MenuItem>ALL COMPLAINTS</MenuItem>
                                    <MenuItem>ALL FEEDBACK</MenuItem>
                                    <MenuItem>ALL CRIMES REPORT</MenuItem>
                                    <MenuItem onClick={(e) => history.push('/criminals')}>ALL CRIMINALS REPORT</MenuItem>
                                    <MenuItem>ALL ARTICLE BOOKS</MenuItem>
                                </Menu>
                            </ListItem>
                        </Link>
                        <Link href="/me"  className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="MY ACCOUNT" />
                            </ListItem>
                        </Link>
                        <Link href="/me/change-password" className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="CHANGE PASSWORD" onClick={() => history.push('/me/change-password')} />
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
                            <Link className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText
                                        primary="REPORTS"
                                        aria-haspopup="true"
                                        aria-owns={dropdownMenu.open ? 'reports-dropdown-menu' : null}
                                        onMouseOver={handleShowMenu}
                                    />
                                    <Menu
                                        open={dropdownMenu.open} anchorEl={dropdownMenu.anchorEl}
                                        id="reports-dropdown-menu"
                                        PaperProps={{onMouseLeave: handleCloseMennu}}
                                    >
                                        <MenuItem onClick={(e) => history.push('/resident/police-stations')}>ALL POLICE STATIONS</MenuItem>
                                        <MenuItem>ALL POLICE REPORT</MenuItem>
                                        <MenuItem>ALL MEMBERS REPORT</MenuItem>
                                        <MenuItem>ALL CATEGORY REPORT</MenuItem>
                                        <MenuItem>ALL COMPLAINTS</MenuItem>
                                        <MenuItem>ALL FEEDBACK</MenuItem>
                                        <MenuItem>ALL CRIMES REPORT</MenuItem>
                                        <MenuItem onClick={(e) => history.push('/criminals')}>ALL CRIMINALS REPORT</MenuItem>
                                        <MenuItem>ALL ARTICLE BOOKS</MenuItem>
                                    </Menu>
                                </ListItem>
                            </Link>
                            <Link href="/me/change-password" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="CHANGE PASSWORD" onClick={() => history.push('/me/change-password')} />
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
            <Typography variant="h4" className={classes.title}>Criminal Management System</Typography>
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
                           
                            <Link href="/criminals" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="ALL CRIMINALS" />
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