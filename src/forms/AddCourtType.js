import { Grid, TextField, Divider, Typography, makeStyles, Button, LinearProgress, TextareaAutosize } from '@material-ui/core';
import React, { useState } from 'react';
import MainNav from '../components/MainNav';
import { AppConstants } from '../constants/AppConstants';
import Axios from 'axios';
import CustomDialog from '../components/CustomDialog';
import cuffs from '../images/investigation.jpg';

const useStyles = makeStyles(() => ({
    subTitle: {
        paddingTop: 10,
        marginLeft: 20
    }
}));

const AddCourtType = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        name: null,
        description: null
    });

    const [response, setResponse] = useState({
        loading: {
            boolean: false,
            text: ''
        },
        errors: null,
        isDialogOpen: false
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setResponse({
            ...response, isDialogOpen: true, loading: { boolean: true, text: 'Saving court type.'}
        });

        const newCourtType = {
            name: formData.name,
            description: formData.description
		};
        Axios.post(`${AppConstants.apiEndpoint}/court-types`, newCourtType, {
            headers: {
                'Authorization': localStorage.getItem('AuthToken')
            }
        })
        .then(res => {
            console.log(res);
            if (res.status == 200) {
                setResponse({
                    ...response, isDialogOpen: true, loading: { boolean: false, text: 'Successfully added court type.'}
                });
            }
            else{
                setResponse({
                    ...response, isDialogOpen: true, loading: { boolean: false, text: 'Failed to add court type.'}
                });
            }
        })
        .catch(err => {
            console.log(err);
            setResponse({
                ...response, isDialogOpen: true, loading: { boolean: false, text: `Error: ${err}`}
            })
        });
    };

    return (
        <div>
            <React.Fragment>
                <CustomDialog isOpen={response.isDialogOpen} onClose={() => setResponse({
                    ...response, isDialogOpen: false
                })} title="Processing" content={response.loading.text} />
            </React.Fragment>
            <MainNav />
            <div  style={{marginLeft: 20, marginRight: 20}}>
                <Grid container spacing={2}>
                    <Grid item lg={7}>
                        <Typography variant="h5" className={classes.subTitle}>ADD COURT TYPE</Typography>
                        <Divider />
                        <br />
                        {response.loading.boolean ? <LinearProgress /> : <div></div>}
                        <form>
                            <Grid container spacing={3}>
                                <Grid item lg={7}>
                                    <TextField
                                        fullWidth
                                        label="Name"
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

export default AddCourtType;