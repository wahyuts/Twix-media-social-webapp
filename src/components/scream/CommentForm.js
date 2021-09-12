import React, {Fragment, useEffect,useState,useRef} from 'react';
import PropTypes from 'prop-types';

//Mui stuff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

//Redux stuff
import { useDispatch, useSelector } from "react-redux";
import {submitComment} from '../../redux/actions/dataActions';


const useStyles = makeStyles(theme=>({
    visibleSeperator:{
        width:'100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
}))


const CommentForm = (props) => {
    const {screamId} = props
    const classes = useStyles();
    const dispatch = useDispatch();
    const {errors, loading} = useSelector(state => state.UI);
    const {authenticated} = useSelector(state => state.user);

    CommentForm.propTypes = {
        submitComment: PropTypes.func.isRequired,
        screamId: PropTypes.string.isRequired,
        authenticated: PropTypes.bool.isRequired,
    }

    const [body,setBody] = useState("");
    const [showErrors,setShowErrors] = useState({});


    const handleChange = (event) => {
        setBody(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const commentData = {
            body: body
        } 
        // if(!errors && !loading){
        //     dispatch(submitComment(screamId,commentData));
        //     setBody("");
        // }
        // else{
        //     setShowErrors(errors);

        // }
        dispatch(submitComment(screamId,commentData));
    }

    useEffect(()=>{
        if(errors){
            setShowErrors(errors)
        }
        // console.log(showErrors)
        if(!errors && !loading){
            setBody("")
        }
    },[])

    const commentFormMarkUp = authenticated ? (
        <Grid item sm={12} style={{ textAlign: 'center' }}>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="body"
                    typr="text"
                    label="Comment on scream"
                    error={showErrors.comment ? true : false}
                    helperText={showErrors.comment}
                    value={body}
                    onChange={handleChange}
                    fullWidth
                    className={classes.textField}
                    />
                <Button type="submit" variant="contained" color="primary"
                         className={classes.button}>
                            Submit
                        {/* {loading && ( 
                        <CircularProgress size={30} className={classes.progress}/>
                    )} */}
                </Button>
            </form>
            <hr className={classes.visibleSeperator}/>
        </Grid>
    ) : (
        null
    )

    return ( 
        commentFormMarkUp
     );
}
 
export default CommentForm;
