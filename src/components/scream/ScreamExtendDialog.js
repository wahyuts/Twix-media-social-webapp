import React, {Fragment, useEffect,useState,useRef} from 'react';
import MyButton from '../../util/MyButton';
import {Link} from 'react-router-dom';
import '../../util/styles.css'
import dayjs from 'dayjs';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
import { makeStyles } from '@material-ui/core/styles';

//Mui stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import {Typography}  from '@material-ui/core';

//Icon Mui
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

//Redux stuff
import { useDispatch, useSelector } from "react-redux";
import {getOneScream} from '../../redux/actions/dataActions';
import {bersihinError} from '../../redux/actions/dataActions';


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
    profileImage:{
        maxWidth:200,
        height:200,
        borderRadius: '50%',
        objectFit: 'cover' // objectFit ini agar gambar tidak ter strech kalo ukurannya ga pas
    },
    DialogContent:{
        padding: 20
    },
    expandButton:{
        position: 'absolute',
        left: '90%',
        bottom:'15%'
    },
    spinnerDiv:{
        textAlign:'center',
        marginTop: 50,
        marginBottom: 50
    },
    superDiv: {
        display: 'flex',
        alignItems: 'center',
    },
    disDiv1: {
        display: 'flex',
        alignItems: 'center',
    },
    disDiv2: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 2
    },
    spanLike: {
        marginBottom: 2
    },
    spanComment: {
        marginBottom: 5
    },
    closeButton:{
        position: 'absolute',
        left: '90%',
    }
}))

const ScreamExtendDialog = (props) => {
    const {screamId, openDialog, userHandle} = props // screamId, openDialog, userHandle dikirim dari screamDetail
    const {scream : { body, createdAt, likeCount, commentCount, userImage, comments}} = useSelector (state => state.data);
    const {likes,authenticated} = useSelector (state => state.user);
    const {loading,errors} = useSelector (state => state.UI);

    const classes = useStyles();
    const dispatch = useDispatch();

    const [open,setOpen] = useState(false);
    const [oldPath,setOldPath] = useState(null); // Tempat menampung lokasi url lama
    const [newPath,setNewPath] = useState(''); // Tempat menampung lokasi url baru

    const handleOpen = () => {

        window.history.pushState(null,null,newPath); //menuju URL  baru ketika di klik 
        setOpen(true);
        dispatch(getOneScream(screamId));
    }

    const handleClose = () => {
        window.history.pushState(null,null,oldPath); //menuju URL lama
        setOpen(false);
        dispatch(bersihinError());
    }

    useEffect(()=>{
        // if(oldPath === newPath){
        //     setOldPath(`/user/${userHandle}`);
        // }
        setOldPath(window.location.pathname); // set URL lama
        setNewPath(`/user/${userHandle}/scream/${screamId}`); //set URL baru

        if(openDialog){
            handleOpen();
        }

        
    },[])

    const dialogMarkUp = loading ? (
        <div className={classes.spinnerDiv}>
            <CircularProgress size={200} thickness={2}/>
        </div>
    ) : (
        <Grid container spacing ={16}>
            <Grid item sm={5}> 
                <img src={userImage} alt="Profile" className={classes.profileImage}/>
            </Grid>
            <Grid item sm={7}> 
                <Typography
                    component={Link}
                    color="primary"
                    variant="h5"
                    to={`/user/${userHandle}`}
                >
                    @{userHandle}
                </Typography>
                <hr className={classes.invisibleSeperator}/> {/** hr disini fungsinya sebagai space */}
                <Typography
                    variant="body2"
                    color="textSecondary"
                >
                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                </Typography>
                <hr className={classes.invisibleSeperator}/>
                <Typography
                    variant="body1"
                    color="textSecondary"
                >
                    {body}
                </Typography>
                <div className={classes.superDiv}>
                        <div className={classes.disDiv1}>
                            <LikeButton screamId={screamId} likes={likes} authenticated={authenticated}/> 
                            {/* {likeButton} */}
                            <span className={classes.spanLike}>{likeCount} likes</span>
                        </div>
                        <div className={classes.disDiv2}>
                            <MyButton tip="comments">
                                <ChatIcon color="primary"/>
                            </MyButton>
                            <span className={classes.spanComment}>{commentCount} comments</span>
                        </div>
                </div>
            </Grid>
            <CommentForm screamId={screamId}/>
            {/* <hr className={classes.visibleSeperator}/>  */}
            <Comments comments={comments}/> 
        </Grid>
    )

    return ( 
        <Fragment>
            <MyButton onClick={handleOpen} tip="Expand scream" tipClassName={classes.expandButton}>
                <UnfoldMore color="primary"/>
            </MyButton>
            <Dialog
                open={open} 
                onClose={handleClose} 
                fullWidth 
                maxWidth="sm"
            >
                <MyButton tip="close" onClick={handleClose} tipClassName={classes.closeButton}>
                    <CloseIcon/>
                </MyButton>
                <DialogContent className={classes.DialogContent}>
                    {dialogMarkUp}
                </DialogContent>
            </Dialog>
        </Fragment>
     );
}
 
export default ScreamExtendDialog;