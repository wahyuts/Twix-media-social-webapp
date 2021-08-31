import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
// import withStyles from '@material-ui/core/styles/withStyles';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import dayjs from 'dayjs';

//Mui stuff
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import {Typography}  from '@material-ui/core';

//Redux stuff
import { useDispatch, useSelector } from "react-redux";
import { Paper } from '@material-ui/core';

//Icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'

// const styles =  {
const useStyles = makeStyles(theme => ({
    paper: {
        padding: 20
      },
      profile: {
        '& .image-wrapper': {
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

const Profile = (props) => {

    const {credentials: {name, createdAt, imageUrl, bio, website, location, loading},authenticated} = useSelector (state => state.user);

    // const {classes} = props
    const classes = useStyles();


    let profileMarkup = !loading ? (authenticated ? (
        // Paper itu cuma mengelompokan mirip div, mirip card tapi bukan card
        // Card bisa bi bangun pakai paper bisa juga tidak
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={imageUrl} alt="profile" className="profile-image"/>
                </div>
                <hr/>
                <div className="profile-details">
                    <MuiLink component={Link} to={`/users/${name}`} color='primary' variant="h5">
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
                    <CalendarToday color="primary"/>{' '}
                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
            </div>
        </Paper>
    ) : (
        <Paper className={classes.paper}>
            <Typography variant="body2" align="center">
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