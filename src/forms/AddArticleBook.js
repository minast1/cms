import { Grid, TextField, Divider, Typography, makeStyles, Button, LinearProgress, TextareaAutosize } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MainNav from '../components/MainNav';
import { AppConstants } from '../constants/AppConstants';
import Axios from 'axios';
import CustomDialog from '../components/CustomDialog';
import cuffs from '../images/investigation.jpg';
import { authMiddleWare } from '../utils/auth';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    subTitle: {
        paddingTop: 10,
        marginLeft: 20
    }
}));

const AddArticleBook = () => {
    const classes = useStyles();
    const history = useHistory();
    const [formData, setFormData] = useState({
        title: null,
        description: null,
        fileUrl: null
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
            ...response, isDialogOpen: true, loading: { boolean: true, text: 'Saving article book.'}
        });

        const newArticleBook = {
            title: formData.title,
            description: formData.description
		};
        Axios.post(`${AppConstants.apiEndpoint}/article-books/add`, newArticleBook, {
            headers: {
                'Authorization': localStorage.getItem('AuthToken')
            }
        })
        .then(res => {
            if (res.status == 200) {
                setResponse({
                    ...response, isDialogOpen: true, loading: { boolean: false, text: 'Successfully added article book.'}
                });
                let form_data = new FormData();
                form_data.append('file', formData.fileUrl);
                Axios.post(`${AppConstants.apiEndpoint}/article-books/upload`, form_data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': localStorage.getItem('AuthToken'),
                        'id': res.data.id
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        setResponse({
                            ...response, isDialogOpen: true, loading: { boolean: false, text: 'Successfully saved article book.'}
                        })
                    } else {
                        setResponse({
                            ...response, isDialogOpen: true, loading: { boolean: true, text: 'Failed to upload file.'}
                        })
                    }
                })
            }
            else{
                setResponse({
                    ...response, isDialogOpen: true, loading: { boolean: false, text: 'Failed to add article book.'}
                });
            }
        })
        .catch(err => {
            console.log(err);
            setResponse({
                ...response, isDialogOpen: true, loading: { boolean: false, text: err}
            })
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
                })} title="Processing" content={response.loading.text} />
            </React.Fragment>
            <MainNav />
            <div  style={{marginLeft: 20, marginRight: 20}}>
                <Grid container spacing={2}>
                    <Grid item lg={7}>
                        <Typography variant="h5" className={classes.subTitle}>ADD ARTICLE BOOK</Typography>
                        <Divider />
                        <br />
                        {response.loading.boolean ? <LinearProgress /> : <div></div>}
                        <form>
                            <Grid container spacing={3}>
                                <Grid item lg={7}>
                                    <TextField
                                        fullWidth
                                        label="Article Title"
                                        name="title"
                                        size="small"
                                        type="text"
                                        onChange={e => setFormData({...formData, title: e.target.value})}
                                        variant="outlined"
                                    />
                                    <br />
                                    <br />
                                    <input type="file" onChange={e => setFormData({...formData, fileUrl: e.target.files[0]})} />
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

export default AddArticleBook;