import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MyButton from '../util/MyButton';
import withStyles from '@material-ui/core/styles/withStyles'; //1

// Cara implementasi  style withStyle di komponent tertentu (untuk urutan prosesnya liat no disamping line code)
// cth screamDetail adalah komponentnya yang inigin diberi style
// 1. import withStyles from '@material-ui/core/styles/withStyles'; 
// 2. bikin object   const styles = {}  atau kalo mau pakai theme nya juga  const styles = theme = {}
// 3. pada bagian bawah sekali  ubah kode seperti ini   export default withStyles(styles)(ScreamDetail);
// 4. buat  const {classes} = props   di dalam fungsi komponen utama 
// 5. jangan lupa masukan props sebagai parameter di fungsi utama  ( cth  const ScreamDetail = (props) =>{}  )

//Mui tool Card
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Typography}  from '@material-ui/core';

//Redux stuff
import {likeScream, unlikeScream} from '../redux/actions/dataActions';
import {useDispatch, useSelector} from 'react-redux';

//icons
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { FavoriteBorder } from '@material-ui/icons';


const styles = {
    card:{
        display: 'flex',
        marginBottom: 20
    },
    image:{
        width: 200,
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

const ScreamDetail = (props,i) => {
    // untuk membuat postingan tanggal seperti "14 jam yang lalu", "satu hari yang lalu" cara nya
    //1. import dayjs from 'dayjs';
    //2. import relativeTime from 'dayjs/plugin/relativeTime';
    //3. gunakan extend function   dayjs.extend(relativeTime)  di fungsi utama
    //4. tulis  dayjs(createdAt).fromNow()   di dalam return,..createAt bisa diganti variable yang isinya tanggal
    
    dayjs.extend(relativeTime) // code ini untuk mengaktifkan plugin relativeTime yang sudah diimport

    // const { classes,xxx, xxx } = props   adalah destructuring dari parameter props   const ScreamDetail = (props) => {}
    // const {classes, scream: {body, createdAt, userImage, userHandle, screamId, likeCount, commentCount }} = props
    const {classes, scream: {body, createdAt, userImage, userHandle, screamId, commentCount, likeCount }} = props

    const dispatch = useDispatch();
    const {likes,authenticated} = useSelector (state => state.user);


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
        <MyButton tip="Like">
            <Link to="/login">
                <FavoriteBorder color="primary"/>
            </Link>
        </MyButton>
    ) : (
        likedScream() ? (
            <MyButton tip="Undo like" onClick={unlikeScreammm}>
                <FavoriteIcon color="primary"/>
            </MyButton>
        ) : (
            <MyButton tip="Like" onClick={likeScreammm}>
                <FavoriteBorder color="primary"/>
            </MyButton>
        )
       
    )

    return ( 
        <div>
            <Card className={classes.card}>
                
                <CardMedia 
                    image={userImage} 
                    title='Profile Image'
                    className={classes.image}/>
            
                <CardContent className={classes.content}>
                    {/** untuk setiap penulisan text misal paragraph, h1, body dsb jika itu di dalam komponen mat ui maka harus memakain Typhography */} 
                    <Typography 
                        variant='h5' 
                        component={Link} to={`/users/${userHandle}`}
                        color='primary'>
                            {userHandle}
                    </Typography>

                    <Typography 
                        variant='body2' 
                        color='textSecondary'>
                            {dayjs(createdAt).fromNow()}
                    </Typography>

                    <Typography variant='body1'>{body}</Typography>
                    {likeButton}
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} comments</span>
                </CardContent>
            </Card>
        </div>
     );
}
 
export default withStyles(styles)(ScreamDetail);