import { Grid, TextField, Divider, Typography, makeStyles, Button, LinearProgress, TextareaAutosize } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MainNav from '../components/MainNav';
import { AppConstants } from '../constants/AppConstants';
import Axios from 'axios';
import CustomDialog from '../components/CustomDialog';
import cuffs from '../images/investigation.jpg';
import { useHistory } from 'react-router-dom';
import { authMiddleWare, handleLogout } from '../utils/auth';

const useStyles = makeStyles(() => ({
    subTitle: {
        paddingTop: 10,
        marginLeft: 20
    }
}));

const AddCrimeCategory = () => {
    const classes = useStyles();
    const history = useHistory();
    const [formData, setFormData] = useState({
        name: null,
        description: null
    });

    const [response, setResponse] = useState({
        loading: {
            boolean: false,
            text: '',
            title: ''
        },
        errors: null,
        isDialogOpen: false
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setResponse({
            ...response, isDialogOpen: true, loading: { boolean: true, text: 'Saving category...', title: 'Processing'}
        });

        const category = {
            name: formData.name,
            description: formData.description
        };
        
        Axios.post(`${AppConstants.apiEndpoint}/crime-categories`, category, {
            headers: {
                'Authorization': localStorage.getItem('AuthToken')
            }
        })
        .then(res => {
            if (res.status == 200) {
                setResponse({
                    ...response, isDialogOpen: true, loading: { boolean: false, text: 'Successfully added category.', title: 'Success' }
                });
            }
            else{
                setResponse({
                    ...response, isDialogOpen: true, loading: { boolean: false, text: 'Failed to add category', title: 'Error' }
                });
            }
        })
        .catch(err => {
            if (err.response) {
                if (err.response.status == 403 ) {
                    handleLogout(history);
                } else if (err.response.status == 404) {
                    setResponse({
                        ...response, isDialogOpen: true, loading: { boolean: false, text: 'Page not found', title: 'Not found' }
                    });
                } else {
                    setResponse({
                        ...response, isDialogOpen: true, loading: { boolean: false, text: err.response.body.message, title: 'Error' }
                    });
                }
            } else if (err.request) {
                setResponse({
                    ...response, isDialogOpen: true, loading: {boolean: false, text: 'Failed to communicate with the server', title: 'Unknown Error'}
                });
            } else {
                setResponse({
                    ...response, isDialogOpen: true, loading: {boolean: false, text: err, title: 'Unknown Error'}
                });
            }
            
        });
    };

    useEffect(() => {
        authMiddleWare(history);
    })
    return (
        <div>
            <React.Fragment>
                <CustomDialog isOpen={response.isDialogOpen} onClose={() => setResponse({
                    ...response, isDialogOpen: false
                })} title={response.loading.title} content={response.loading.text} />
            </React.Fragment>
            <MainNav />
            <div  style={{marginLeft: 20, marginRight: 20}}>
                <Grid container spacing={2}>
                    <Grid item lg={7}>
                        <Typography variant="h5" className={classes.subTitle}>ADD CRIME CATEGORY</Typography>
                        <Divider />
                        <br />
                        {response.loading.boolean ? <LinearProgress /> : <div></div>}
                        <br />
                        <form>
                            <Grid container spacing={3}>
                                <Grid item lg={7}>
                                    <TextField
                                        fullWidth
                                        label="Category Name"
                                        name="name"
                                        size="small"
                                        type="text"
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                        variant="outlined"
                                    />
                                    <br />
                                    <br />
                                    <TextareaAutosize
                                        placeholder="Description"
                                        style={{width: 450, height: 200}}
                                        onChange={e => setFormData({...formData, description: e.target.value})}
                                    />
                                    <br />
                                    <br />
                                    <Button variant="contained" color="primary" disabled={response.loading.boolean} onClick={handleSubmit}>Submit</Button>
                                </Grid>
                            </Grid>    
                        </form>
                    </Grid>
                    <Grid item lg={5}>
                        <img src={cuffs} style={{width: 500, height: 500, paddingTop: 45}} />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default AddCrimeCategory;