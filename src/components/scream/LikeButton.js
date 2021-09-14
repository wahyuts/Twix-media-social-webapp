import React, {useEffect} from 'react';
import MyButton from '../../util/MyButton';
import {Link} from 'react-router-dom';

//icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import { FavoriteBorder } from '@material-ui/icons';

//Redux
import {likeScream, unlikeScream} from '../../redux/actions/dataActions';
import {useDispatch, useSelector} from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    sizeIcon:{
        [theme.breakpoints.down('sm')]: {
            fontSize: 20,
        }
    }
}))


const LikeButton = (props) => {
    const classes = useStyles();
    const {screamId,likes,authenticated} = props // nilai prop ini dikirim dari ScreamDetail component
    // const {likes} = useSelector (state => state.user);
    const dispatch = useDispatch();

    const likedScream = () => {
        if(likes && likes.find(like => like.screamId === screamId))
            return true;
            else return false
    }

    const likeScreammm = () => {
        dispatch(likeScream(screamId));
    }

    const unlikeScreammm = () => {
        dispatch(unlikeScream(screamId));
    }

    useEffect(()=>{
        likedScream();
    },[])
    const likeButton = !authenticated ? (
        <Link to="/login">
            <MyButton tip="Like">
                    <FavoriteBorder color="primary" className={classes.sizeIcon}/>
            </MyButton>
        </Link>

    ) : (
        likedScream() ? (
            <MyButton tip="Undo like" onClick={unlikeScreammm}>
                <FavoriteIcon color="primary" className={classes.sizeIcon}/>
            </MyButton>
        ) : (
            <MyButton tip="Like" onClick={likeScreammm}>
                <FavoriteBorder color="primary" className={classes.sizeIcon}/>
            </MyButton>
        )
    )
    return ( 
        likeButton
     );
}
 
export default LikeButton;