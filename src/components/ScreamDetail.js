import React from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MyButton from '../util/MyButton';
import LikeButton from './LikeButton';
import DeleteScream from './DeleteScream';
import ScreamExtendDialog from './ScreamExtendDialog';
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
// import {likeScream, unlikeScream} from '../redux/actions/dataActions';
import {useDispatch, useSelector} from 'react-redux';

//icons
import ChatIcon from '@material-ui/icons/Chat'


const styles = {
    card:{
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image:{
        width: 200,
    },
    content: {
        padding: 25,
        objectFit: 'cover',
        width:690
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
    }
}

const ScreamDetail = (props,i) => { // pengirim props disini dari home page

    // untuk membuat postingan tanggal seperti "14 jam yang lalu", "satu hari yang lalu" cara nya
    //1. import dayjs from 'dayjs';
    //2. import relativeTime from 'dayjs/plugin/relativeTime';
    //3. gunakan extend function   dayjs.extend(relativeTime)  di fungsi utama
    //4. tulis  dayjs(createdAt).fromNow()   di dalam return,..createAt bisa diganti variable yang isinya tanggal
    
    dayjs.extend(relativeTime) // code ini untuk mengaktifkan plugin relativeTime yang sudah diimport

    // const { classes,xxx, xxx } = props   adalah destructuring dari parameter props   const ScreamDetail = (props) => {}
    const {classes, scream: {body, createdAt, userImage, userHandle, screamId, commentCount, likeCount }} = props

    // const dispatch = useDispatch();
    const {likes,authenticated, credentials: {name}} = useSelector (state => state.user);

    // cth pembuatan button dengan logic conditional didalamnnya
    // jadi logic buttonnya di taruh didalam sebuah variable which is variable tersebut yang akan digunakan sebagai buttonnya
    const deleteButton = authenticated && userHandle === name ? (
        <DeleteScream screamId={screamId}/>
    ) : (
        null
    )

    return ( 
        <div>
            <Card className={classes.card}>
                <div>
                    {/* <img src={userImage} alt="Profil Image" className={classes.image}/> */}
                     {/* <CardMedia 
                            image={userImage} 
                            title='Profile Image'
                             className={classes.image}/> */}
                </div>

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
                    
                    {/** cth variable custom conditional button diterapkan */}
                    {deleteButton}

                    <Typography 
                        variant='body2' 
                        color='textSecondary'>
                            {dayjs(createdAt).fromNow()} {/** code untuk membuat tanggal "since 14 days ago" */}
                    </Typography>

                    <Typography variant='body1'>{body}</Typography>
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
                        <ScreamExtendDialog screamId={screamId} userHandle={userHandle}/>
                    </div>
                </CardContent>
            </Card>
        </div>
     );
}
 
export default withStyles(styles)(ScreamDetail);