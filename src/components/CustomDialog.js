import React from 'react';
import {Dialog, DialogTitle, Slide, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDialog({ isOpen, onClose, title, content }){
    return(
        <div>
            <Dialog
                aria-labelledby="title"
                aria-describedby="content"
                open={isOpen}
                onClose={onClose}
                keepMounted
                TransitionComponent={Transition}
            >
                <DialogTitle id="title" style={{color: '#0047F7'}}>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="content">{content}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">Okay</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
