import React, {Fragment, useEffect,useState,useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

//Mui Stuff
import Grid from '@material-ui/core/Grid';
import {Typography}  from '@material-ui/core';

//Redux stuff
import { useDispatch, useSelector } from "react-redux";


const useStyles = makeStyles ( theme =>({

    commentImage: {
        maxWidth: '100%',
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData: {
        marginLeft: 20
    },

    invisibleSeperator:{
        border: "none",
        margin: 4
    },
    visibleSeperator:{
        width:'100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    TopvisibleSeperator:{
        width:'100%',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        // marginBottom: 20
    },

}))

const Comments = (props) => {
    const classes = useStyles();
    // const {comments} = props;
    const {scream : {comments}} = useSelector (state => state.data);

    Comments.propTypes = {
        comments: PropTypes.array.isRequired
    }

    return (
        <Grid container>
            {comments.map((comment, index)=>{
                const {body, createdAt, userImage, userHandle} = comment;
                return(
                    <Fragment key={createdAt}>
                        {index === comments.length-1 && (
                            <hr className={classes.TopvisibleSeperator}/>
                        )}
                        <Grid item sm={12}>
                            <Grid container> {/** container ini berarti flex */}
                                <Grid item sm={2}>
                                    <img src={userImage} alt="comment" className={classes.commentImage}/>
                                </Grid>
                                <Grid item sm={9}>
                                    <div className={classes.commentData}>
                                        <Typography
                                            variant="h5"
                                            component={Link}
                                            to={`users/${userHandle}`}
                                            color="primary"
                                        >
                                            {userHandle}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                        </Typography>
                                        <hr className={classes.invisibleSeperator}/>
                                        <Typography variant="body1">
                                            {body}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        {index !== comments.length -1 && (
                            <hr className={classes.visibleSeperator}/>
                        )}
                    </Fragment>
                )
            })}
        </Grid>
    )

}
 
export default Comments;