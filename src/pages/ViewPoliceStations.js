/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, Typography, makeStyles, Container, LinearProgress, Link } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MainNav from '../components/MainNav';
import { AppConstants } from '../constants/AppConstants';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { authMiddleWare, handleLogout } from '../utils/auth';
import MaterialTable from 'material-table';

const columns = localStorage.getItem('UserType') === 'police' || localStorage.getItem('UserType') === 'admin' ? [
    {
        title: 'Sr. No',
        field: 'sn',
        filtering: false
    },
    {
        title: 'Name',
        field: 'name',
        filtering: false
    },
    {
        title: 'Email',
        field: 'email',
        filtering: false
    },
    {
        title: 'City',
        field: 'city',
        filtering: false
    },
    {
        title: 'Action',
        field: 'action',
        filtering: false,
        sorting: false,
        render: record => (
            <div>
                <Link>
                    Edit
                </Link>{'   '}
                | {'   '}
                <Link style={{color: 'red'}}>
                    Delete
                </Link>
            </div>
        )
    }
    ] : [
        {
            title: 'Sr. No',
            field: 'sn',
            filtering: false
        },
        {
            title: 'Name',
            field: 'name',
            filtering: false
        },
        {
            title: 'Email',
            field: 'email',
            filtering: false
        },
        {
            title: 'City',
            field: 'city',
            filtering: false
        }
    ];
const headerStyle = {
    fontStyle: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.01em',
    color: 'white',
    backgroundColor: 'grey',
    fontFamily: 'Poppins, sans-serif',
    textAlign: 'center'
};

const rowStyle = {
  fontStyle: 'normal',
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '0.01em',
  color: '#000000',
  fontFamily: 'Poppins, sans-serif'
};

const useStyles = makeStyles(() => ({
    subTitle: {
        paddingTop: 10,
        marginLeft: 20
    }
}));

const ViewPoliceStations = () => {
    const classes = useStyles();
    const history = useHistory();
    const [stations, setStations] = useState([]);
    const [response, setResponse] = useState({
        loading: {
            boolean: false,
            text: '',
            title: ''
        },
        errors: null,
        isDialogOpen: false
    });

    const getAllPoliceStations = () => {
        const headers = {
            'Authorization': localStorage.getItem('AuthToken')
        }
        setResponse({...response, isDialogOpen: true, loading: {boolean: true, title: 'Loading', text: 'Loading stations...'}});
        Axios.get(`${AppConstants.apiEndpoint}/police-stations`, {
            headers: headers
        })
        .then(res => {
            console.log(res);
            const tableData = [];
            if (res.status === 200) {
                let i = 1;
                res.data.forEach(item => {
                    tableData.push({
                        sn: i++,
                        name: item.stationName,
                        email: item.email,
                        city: item.city.name,
                        phone: item.feedbackNumber
                    });
                });
                setStations(tableData);
            }
            setResponse({...response, isDialogOpen: false, loading: {boolean: false}});
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status === 403 ) {
                    handleLogout(history);
                } else if (error.response.status === 404) {
                    setResponse({
                        ...response, isDialogOpen: true, loading: { boolean: false, text: 'Page not found', title: 'Not found' }
                    });
                } else {
                    setResponse({
                        ...response, isDialogOpen: true, loading: { boolean: false, text: error.response.body.message, title: 'Error' }
                    });
                }
            } else if (error.request) {
                setResponse({
                    ...response, isDialogOpen: true, loading: {boolean: false, text: 'Failed to communicate with the server. Ensure you have a stable internet connection', title: 'Error'}
                });
            } else {
                setResponse({
                    ...response, isDialogOpen: true, loading: {boolean: false, text: error, title: 'Unknown Error'}
                });
            }
        });
    }

    useEffect(() => {
        authMiddleWare(history);
        getAllPoliceStations();
    }, []);

    return (
        <div>
            <MainNav />
            
            {response.loading.boolean ? <LinearProgress /> : <div></div>}
            <form>
                <Container>
                <Typography variant="h5" className={classes.subTitle}>All Police Stations</Typography>
            <Divider />
            <br />
                <MaterialTable
                    columns={columns}
                    options={{
                        rowStyle,
                        headerStyle,
                        toolbar: false
                    }}
                    data={stations}
                />
                </Container>
            </form>
        </div>
    );
};

export default ViewPoliceStations;