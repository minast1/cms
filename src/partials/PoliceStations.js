import { Divider, Typography, makeStyles, Container, LinearProgress, Snackbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MainNav from '../components/MainNav';
import { Alert } from '@material-ui/lab';
import { AppConstants } from '../constants/AppConstants';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { authMiddleWare } from '../utils/auth';
import MaterialTable from 'material-table';

const headerStyle = {
    fontStyle: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.01em',
    color: '#A6ACBE',
    opacity: '0.5',
    fontFamily: 'Poppins, sans-serif'
  };

  const rowStyle = {
    fontStyle: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.01em',
    color: '#000000',
    fontFamily: 'Poppins, sans-serif'
  };

const useStyles = makeStyles((theme) => ({
    subTitle: {
        paddingTop: 10,
        marginLeft: 20
    }
}));

const PoliceStations = () => {
    const classes = useStyles();
    const history = useHistory();
    const [stations, setStations] = useState([]);
    const [responseValues, setResponseValues] = useState({
        loading: false
    });

    const getAllPoliceStations = () => {
        const headers = {
            'Authorization': localStorage.getItem('AuthToken')
        }
        setResponseValues({...responseValues, loading: true});
        Axios.get(`${AppConstants.apiEndpoint}/police-stations`, {
            headers: headers
        })
        .then(res => {
            const tableData = [];
            if (res.status === 200) {
                let i = 1;
                res.data.forEach(item => {
                    tableData.push({
                        sn: i++,
                        name: item.name,
                        email: item.email,
                        city: item.city,
                        phone: item.phoneNumber
                    });
                });
                setStations(tableData);
            }
            setResponseValues({...responseValues, loading: false});
        })
        .catch(error => {
            setResponseValues({...responseValues, loading: false});
            console.log(error);
        })
    }

    useEffect(() => {
        authMiddleWare(history);
        getAllPoliceStations();
    }, []);

    return (
        <div>
            <MainNav />
            <Typography variant="h5" className={classes.subTitle}>All Police Stations</Typography>
            <Divider />
            <br />
            {responseValues.loading ? <LinearProgress /> : <div></div>}
            <form>
                <Container>
                <MaterialTable
                    columns={[
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
                        title: 'Phone',
                        field: 'phone',
                        filtering: false
                    }
                    ]}
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

export default PoliceStations;