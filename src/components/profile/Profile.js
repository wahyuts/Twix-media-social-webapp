import React, {Fragment} from 'react';
// import withStyles from '@material-ui/core/styles/withStyles';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import {uploadImage, logoutUser} from '../../redux/actions/userActions';
import dayjs from 'dayjs';
import EditDetails from './EditDetails'; 

//Mui stuff
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import {IconButton, Typography}  from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import { Paper } from '@material-ui/core';


//Redux stuff
import { useDispatch, useSelector } from "react-redux";

//Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import { KeyboardReturn } from '@material-ui/icons';

// Penggunaan style mat kali ini(dibawah ini) memadukan konsep material ui dengan css biasa
// untuk CSS biasa hanya akan aktif efeknya jika penempatannya masih didalam CSS material UI
// cth : classs .profile-image akan aktif jika komponennya (komponen yang ditanam class .profile-image) 
//       berada didalam komponen yang ditanam class profile (komponen yang pake classes.styles mat ui)
const useStyles = makeStyles(theme => ({
    paper: {
        padding: 20
      },
      profile: { // profile adalah cth penulisan class mat ui
        '& .image-wrapper': { // '.image-wrapper adalah penulisan name class css biasa (hanya bisa dilakukan didalam class mat ui)
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: theme.palette.primary.main
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      }
    
}) ) ;

const Profile = () => {

    const {credentials: {name, createdAt, imageUrl, bio, website, location},loading,authenticated} = useSelector (state => state.user);

    // const {classes} = props
    const classes = useStyles();
    const dispatch = useDispatch();

    //fungsi buat setor upload image ke server
    const handleImage = (event) => {
      const image = event.target.files[0];
      // send to server
      const formData =  new FormData();
      formData.append('image', image, image.name);
      dispatch(uploadImage(formData))

    }

    // fungsi untuk mengarahkan click ke komponent <input type=file/>
    // jadi begini <input type="file"/> itu kan diberi prop hidden makanya tersembunyi ga kelihatan
    // nah gimana cara klicknya ? cara nya pake fungsi ini yang ditanamkan di komponent mat ui
    const handleEditPicture = () => {
      const fileinput = document.getElementById('imageInput');
      fileinput.click()
    }

    const handleLogout = () => {
      dispatch(logoutUser())
    }
 

    let profileMarkup = !loading ? (authenticated ? (
        // Paper itu cuma mengelompokan mirip div, mirip card tapi bukan card
        // Card bisa di bangun pakai paper bisa juga tidak
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={imageUrl} alt="profile" className="profile-image"/>
                    {/** input file type itu untuk memunculkan menu upload gambar(hanya menu kotaknya bukan fungsi)*/}
                    <input type="file" id="imageInput" hidden="hidden" onChange={handleImage}/> {/** hidden untuk menyembunyikan ui nya */}
                    {/** Tooltip adalah menu dari mat ui untuk hover pada button,..efeknya akan muncul tulisan diatas/bawah ketika di hover */}
                    <Tooltip title="Edit profile picture" placement="top">
                        <IconButton onClick={handleEditPicture} className="button">
                            <EditIcon color="primary"/>
                        </IconButton>
                    </Tooltip>
                </div>
                <hr/>
                <div className="profile-details">
                    {/** MuiLink ini adalah Link pada mat ui fungsinya sama dengan link pada umumnya CUMA ini harus di combine dengan link versi react router dom */}
                    <MuiLink component={Link} to={`/user/${name}`} color='primary' variant="h5">
                        @{name}
                    </MuiLink>
                    <hr/>
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr/>
                    {location && (
                        <Fragment>
                            <LocationOn color="primary"/> <span>{location}</span>
                            <hr/>
                        </Fragment>
                    )}
                    {website && (
                        <Fragment>
                            <LinkIcon color="primary"/>
                            <a href={website} target="_blank" rel="noopener noreferrer">
                                {' '}{website}
                            </a>
                            <hr/>
                        </Fragment>
                    )}
                    {/**calendarToday ini icon kalender doang*/}
                    <CalendarToday color="primary"/>{' '}
                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
                <Tooltip title="logout" placement="top" >
                    {/** IconButton ini adalan button tapi cuma pake icon doang ga ada namanya,..ini dari mat ui */}
                    <IconButton onClick={handleLogout}>
                        <KeyboardReturn color="primary"/>
                    </IconButton>
                </Tooltip>

                {/*komponen tepat dibawah ini adalah modal dialog yang dibuat oleh mat ui,..cukup call aja,..ngoding nya didalem komponent tersebut*/}
                <EditDetails/>
            </div>
        </Paper>
    ) : (
        <Paper className={classes.paper}>
            <Typography component="div" variant="body2" align="center">
                No profile found, please login again
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">
                        SignUp
                    </Button>
                </div>
            </Typography>
        </Paper>
    )): (<p>Loading...</p>)

    return ( 
        <div>
            {profileMarkup}
        </div>
     );
}
 
// export default withStyles(styles)(Profile);
export default Profile;