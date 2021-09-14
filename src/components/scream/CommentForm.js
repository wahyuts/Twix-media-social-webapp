import React, {useEffect,useState} from 'react';

//Mui stuff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

//Redux stuff
import { useDispatch, useSelector } from "react-redux";
import {submitComment} from '../../redux/actions/dataActions';


const useStyles = makeStyles(theme=>({
    invisibleSeperator:{
        border: "none",
        margin: 4
    },
    visibleSeperator:{
        width:'100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    formWidth:{
        [theme.breakpoints.down('sm')]: {
            width: '130%'
        }
    },
    forWidthOnly:{
        textAlign: 'center',
        // [theme.breakpoints.down('sm')]: {
        //     marginLeft: '5%',
        //     marginRight: '5%'
        // }
    }
}))


const CommentForm = (props) => {
    const {screamId} = props
    const classes = useStyles();
    const dispatch = useDispatch();
    const {errors, loading} = useSelector(state => state.UI);
    const {authenticated} = useSelector(state => state.user);

    // CommentForm.propTypes = {
    //     submitComment: PropTypes.func.isRequired,
    //     screamId: PropTypes.string.isRequired,
    //     authenticated: PropTypes.bool.isRequired,
    // }

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
        dispatch(submitComment(screamId,commentData));
    }

    useEffect(()=>{
        if(errors){
            setShowErrors(errors)
        }
        if(!errors && !loading){
            setBody("")
        }
    },[])

    const commentFormMarkUp = authenticated ? (
        <Grid item sm={12} className={classes.forWidthOnly} >
            <form onSubmit={handleSubmit}  className={classes.formWidth}>
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
                <hr className={classes.invisibleSeperator}/>
                <Button type="submit" variant="contained" color="primary"
                         className={classes.button}>
                            Submit
                </Button>
            </form>
        </Grid>
    ) : (
        null
    )

    return ( 
        commentFormMarkUp
     );
}
 
export default CommentForm;
