import React, {Fragment, useEffect,useState} from 'react';
import MyButton from '../../util/MyButton';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

//Redux stuff
import { useDispatch, useSelector } from "react-redux";
import {postScream} from '../../redux/actions/dataActions';
import {bersihinError} from '../../redux/actions/dataActions';


//Mui stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

//Icon Mui
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles (theme =>({
    textField:{
        margin: '10px auto 10px auto'
    },
    submitButton:{
        position: "relative"
    },
    progress:{
        position: "absolute"
    },
    closeButton:{
        position: "absolute",
        left: "90%",
        top: "5%"
    }
}))

const PostScream = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {loading, errors} = useSelector (state => state.UI);

    const [open, setOpen] = useState(false);
    const [body, setBody] = useState('');
    const [showErrors,setShowErrors] = useState({});

    // handleOpen buat open dialog
    const handleOpen = () => {
        setOpen(true);
    }

    // handleClose buat close dialog
    const handleClose = () => {
        setOpen(false);
        dispatch(bersihinError());
        setShowErrors("");
    }

    const handleChange = (event) => {
        setBody(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newScream = {
            body: body
        } 
        if(!errors && !loading){
            dispatch(postScream(newScream));
            setBody("");
            handleClose();
        }
        else{
            setShowErrors(errors);

        }
        // dispatch(postScream(newScream));
    }

    useEffect(()=>{
        if(errors){
            setShowErrors(errors)
        }
        console.log(showErrors)
        if(!errors && !loading){
            setBody("")
            
        }
    })

    return ( 
        <Fragment>
            <MyButton onClick={handleOpen} tip="Post a scream!" >
                <AddIcon/>
            </MyButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <MyButton tip="close" onClick={handleClose} tipClassName={classes.closeButton}>
                    <CloseIcon/>
                </MyButton>
                <DialogTitle>
                    Post a new scream
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="body"
                            type="text"
                            label="SCREAM!!"
                            multiline
                            rows="3"
                            placeholder="Scream at your fellow apes"
                            error={showErrors.body ? true : false}
                            helperText={showErrors.body}
                            className={classes.textField}
                            onChange={handleChange}
                            value={body}
                            fullWidth 
                            />
                            <Button type="submit" variant="contained" color="primary"
                                    className={classes.submitButton} disabled={loading}>
                                    Submit
                                    {loading && ( // jika loading true maka tampilkan spinner
                                    <CircularProgress size={30} className={classes.progress}/>
                                )}
                            </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Fragment>
     );
}
 
export default PostScream;