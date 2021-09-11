import React, {Fragment, useState} from 'react';
import MyButton from '../util/MyButton';
// import withStyles from '@material-ui/core/styles/withStyles'; //1

//Mui Stuff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

//Redux stuff
import {useDispatch, useSelector} from 'react-redux';
import {deleteScream} from '../redux/actions/dataActions';

const useStyles = makeStyles(theme => ({
    deleteButton: {
        position: 'absolute',
        top: '10%',
        left: '90%'
    }
}))

const DeleteScream = (props) => {
    const {screamId} = props

    const classes = useStyles();

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    // handleOpen buat open dialog
    const handleOpen = () => {
        setOpen(true);
    }

    // handleClose buat close dialog
    const handleClose = () => {
        setOpen(false);
    }

    const delScream = () => {
        dispatch(deleteScream(screamId));
        setOpen(false);
    }

    return ( 
        <Fragment>
            <MyButton tip="Delete Scream" onClick={handleOpen} btnClassName={classes.deleteButton} >
                <DeleteOutline color="secondary"/>
            </MyButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>
                    Are you sure you want to delete this scream ?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={delScream} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
     );
}
 
export default DeleteScream;