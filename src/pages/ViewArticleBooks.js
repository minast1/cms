import { Divider, Typography, makeStyles, LinearProgress, Grid, Paper, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MainNav from '../components/MainNav';
import { AppConstants } from '../constants/AppConstants';
import Axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import { authMiddleWare } from '../utils/auth';

const headerStyle = {
    fontStyle: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.01em',
    color: 'white',
    backgroundColor: 'grey',
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

const useStyles = makeStyles(() => ({
    subTitle: {
        paddingTop: 10,
        marginLeft: 20
    },
    innerPaper: {
        margin: 5,
        padding: 5
    },
    descriptionText: {
        fontWeight: 'bolder'
    }
}));

const ViewArticleBooks = () => {
    const classes = useStyles();
    const history = useHistory();
    const [articleBooks, setArticleBooks] = useState([]);
    const [responseValues, setResponseValues] = useState({
        loading: false
    });

    const getArticleBooks = () => {
        setResponseValues({...responseValues, loading: true});
        Axios.get(`${AppConstants.apiEndpoint}/article-books`, {
            headers: {
                'Authorization': localStorage.getItem('AuthToken')
            }
        })
        .then(res => {
            console.log(res);
            setArticleBooks(res.data);
            setResponseValues({...responseValues, loading: false});
        })
        .catch(error => {
            setResponseValues({...responseValues, loading: false});
            console.log(error);
        })
    }

    useEffect(() => {
        authMiddleWare(history);
        getArticleBooks();
    }, []);

    return (
        <div>
            <MainNav />
            <div style={{marginLeft: 20, marginRight: 20}}>
                <Typography variant="h5" className={classes.subTitle}>ARTICLE BOOKS</Typography>
                <Divider />
                <br />
                {responseValues.loading ? <LinearProgress /> : (
                    <MaterialTable
                        columns={[
                            {
                                title: 'Title',
                                field: 'title',
                                filtering: false
                            },
                            {
                                title: 'Description',
                                field: 'description'
                            },
                            {
                                title: 'File Download',
                                field: 'action',
                                filtering: false,
                                sorting: false,
                                render: record => (
                                    <Link onClick={(e) => Axios.get(record.fileUrl).then(res => console.log(res)).catch(error => console.log(error))}>
                                        Download File
                                    </Link>
                                )
                            }
                        ]}
                        options={{
                            headerStyle,
                            rowStyle,
                            toolbar: false
                        }}
                        data={articleBooks}
                    />
                )}
            </div>
            <br />
            <Divider />
            <Typography style={{textAlign: 'center'}}>&copy; Criminal Management System</Typography>
            <br />
        </div>
    );
};

export default ViewArticleBooks;