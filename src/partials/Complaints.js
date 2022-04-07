/* eslint-disable react-hooks/exhaustive-deps */
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

const Complaints = () => {
    const classes = useStyles();
    const history = useHistory();
    const [complaints, setComplaints] = useState([]);
    const [responseValues, setResponseValues] = useState({
        success: false,
        failed: false,
        loading: false
    });

    const handleCloseSnackbar = (event, reason) => {
        if(reason === 'clickaway'){
            return
        }
        setResponseValues({...responseValues, success: false, failed: false});
    }

    const getMyComplaints = () => {
        const headers = {
            'Authorization': localStorage.getItem('AuthToken')
        }
        setResponseValues({...responseValues, loading: true});
        Axios.get(`${AppConstants.apiEndpoint}/me/complaints`, {
            headers: headers
        })
        .then(res => {
            const tableData = [];
            if (res.status === 200) {
                const response = res;
                Axios.get(`${AppConstants.apiEndpoint}/user`, {
                    headers: headers
                })
                .then(res => {
                    if (res.status === 200) {
                        let i = 1;
                        response.data.forEach(complaint => {
                            tableData.push({
                                sn: i++,
                                title: complaint.title,
                                loggedBy: res.data.userCredentials.fullName,
                                email: complaint.email,
                                status: complaint.status,
                                phone: res.data.userCredentials.phoneNumber
                            });
                        });
                        setComplaints(tableData);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
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
        getMyComplaints();
    }, []);

    return (
        <div>
            <React.Fragment>
                <Snackbar open={responseValues.success} onClose={handleCloseSnackbar} autoHideDuration={6000}>
                    <Alert severity="success" onClose={handleCloseSnackbar}>Success</Alert>
                </Snackbar>
                <Snackbar open={responseValues.failed} onClose={handleCloseSnackbar} autoHideDuration={6000}>
                    <Alert severity="error" onClose={handleCloseSnackbar}>Failed</Alert>
                </Snackbar>
            </React.Fragment>
            <MainNav />
            <Typography variant="h5" className={classes.subTitle}>MY COMPLAINTS</Typography>
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
                        title: 'Title',
                        field: 'title',
                        filtering: false
                    },
                    {
                        title: 'Logged By',
                        field: 'loggedBy',
                        filtering: false
                    },
                    {
                        title: 'Email',
                        field: 'email',
                        filtering: false
                    },
                    {
                        title: 'Status',
                        field: 'status',
                        filtering: false
                    },
                    {
                        title: 'phone',
                        field: 'Phone',
                        filtering: false
                    }
                    ]}
                    options={{
                    rowStyle,
                    headerStyle,
                    toolbar: false
                    }}
                    data={complaints}
                />
                </Container>
            </form>
        </div>
    );
};

export default Complaints;