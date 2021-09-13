import React, {Fragment} from 'react';
import dayjs from 'dayjs';


//MatUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Typography}  from '@material-ui/core';

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
          position: 'relative'
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
      }
    
}) ) ;

const StaticProfile = (props) => {
    const classes = useStyles();
    const {profile:{ name, createdAt, imageUrl, bio, website, location}} = props

    return ( 
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={imageUrl} alt="profile" className="profile-image"/>
                </div>
                <hr/>
                <div className="profile-details">
                    <Typography variant="h5" color="primary">
                        @{name}
                    </Typography>
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
            </div>
        </Paper>
     );
}
 
export default StaticProfile;
