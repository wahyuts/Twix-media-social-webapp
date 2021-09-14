import React, {Fragment} from 'react';
import NoImage from '../images/NoImage.png';

//MaT UI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

//Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';



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
      },
      handle:{
          height: 20,
          backgroundColor: theme.palette.primary.main,
          width: 60,
          margin: '0 auto 7px auto'
      },
      fullLine:{
          height: 15,
          backgroundColor: 'rgba(0,0,0,0.6)',
          width: '100%',
          marginBottom: 10
      },
      halfLine:{
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '50%',
        marginBottom: 10
    }
    
}) ) ;

const ProfileSkeleton = () => {
    const classes = useStyles()
    return ( 
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={NoImage} alt="Profile" className="profile-image"/>
                </div>
                <hr/>
                <div className="profile-details">
                    <div className={classes.handle}/>
                    <hr/>
                    <div className={classes.fullLine}/>
                    <div className={classes.halfLine}/>
                    <hr/>
                    <LocationOn color="primary"/><span>Location</span>
                    <hr/>
                    <LinkIcon color="primary"/> https://website.com
                    <hr/>
                    <CalendarToday color="primary"/> Joined date

                </div>
            </div>
        </Paper>
     );
}
 
export default ProfileSkeleton;
