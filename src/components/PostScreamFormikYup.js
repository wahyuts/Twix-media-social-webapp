import React, {Fragment, useEffect,useState,useRef} from 'react';
// import { CSSTransition } from "react-transition-group";
import MyButton from '../util/MyButton';
import '../util/styles.css'
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

//Redux stuff
import { useDispatch, useSelector } from "react-redux";
import {postScream} from '../redux/actions/dataActions';
import {bersihinError} from '../redux/actions/dataActions';

//Form by FormikYup
import {useFormik} from 'formik';
import * as Yup from 'yup';

//Mui stuff
import {IconButton, Typography}  from '@material-ui/core';
// import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
// import Fade from '@material-ui/core/Fade';

//Icon Mui
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles (theme =>({
    textField:{
        margin: '10px auto 10px auto'
    },
    submitButton:{
        position: "relative",
        float: 'right',
        marginTop: 10
    },
    progress:{
        position: "absolute"
    },
    closeButton:{
        position: "absolute",
        left: "90%",
        top: "5%"
    },
    errorMsg:{
        color: "#d41a1a",
        fontSize: 12
    }
}))

const PostScreamFormikYup = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {loading} = useSelector (state => state.UI);

    const [open, setOpen] = useState(false);
    // const dialogRef = useRef();

    // handleOpen buat open dialog
    const handleOpen = () => {
        setOpen(true);
    }

    // handleClose buat close dialog
    const handleClose = () => {
        dispatch(bersihinError());
        clearErrorFormik();
        clearBody();
        setOpen(false);
    }

    const clearErrorFormik = () => {
        formik.errors.body = ""
    }

    const clearBody = () => {
        formik.values.body = ""
    }


    // useEffect(() => {
    //     console.log("Dialog Ref", dialogRef.current);
    //   }, []);

    const formik = useFormik(
        {
            initialValues:{
                body: ""
            },
            validationSchema: Yup.object({
                body: Yup.string()
                    .required("Must not be empty!")
            }),
            onSubmit: values => {
                dispatch(postScream(values));
                formik.errors.body = ""
                formik.values.body = ""
                setOpen(false);
            }

        }
    )

    return ( 
        <Fragment>
            <MyButton onClick={handleOpen} tip="Post a scream!" > {/**reuseable custom button */}
                <AddIcon/>
            </MyButton>
            {/**dibawah ini modal dialog nya,..kalo gak di klik ga keliatan */}

            {/* <CSSTransition
                unmountOnExit
                in={open}
                timeout={20000}
                classNames="my-node"
            > */}
            <Dialog 
                open={open} 
                onClose={handleClose} 
                fullWidth 
                maxWidth="sm"
                //TransitionComponent={Transition} 
            >
                <MyButton tip="close" onClick={handleClose} tipClassName={classes.closeButton}>
                    <CloseIcon/>
                </MyButton>
                <DialogTitle>
                    Post a new scream
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            name="body"
                            type="text"
                            label="SCREAM!!"
                            multiline
                            rows="3"
                            placeholder="Scream at your fellow apes"
                            // error={showErrors.body ? true : false}
                            // helperText={showErrors.body}
                            className={classes.textField}
                            onChange={formik.handleChange}
                            value={formik.values.body}
                            fullWidth 
                            />
                            {formik.errors.body && formik.touched.body && (
                            <p className={classes.errorMsg}>{formik.errors.body}</p>
                        )}
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
            {/* </CSSTransition> */}
        </Fragment>
     );
}
 
export default PostScreamFormikYup;