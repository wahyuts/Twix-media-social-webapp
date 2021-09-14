import React, { Fragment,useState } from 'react';
import MyButton from '../../util/MyButton';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//MaT UI Stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ToolTip from '@material-ui/core/Tooltip';
import {Typhography, Typography} from '@material-ui/core';
import Badge from '@material-ui/core/Badge';

//Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';



import { makeStyles } from '@material-ui/core/styles';

//Redux stuff
import { useDispatch, useSelector } from "react-redux";
import {markNotificationsRead} from '../../redux/actions/userActions';

const Notifications = () => {
    const dispatch = useDispatch();
    // const classes = useStyles();

    const [anchorEl,setAnchorEl] = useState(null);
    const {notifications} = useSelector (state => state.user);

    dayjs.extend(relativeTime);

    const handleOpen = (event) => {
        setAnchorEl(event.target)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const onMenuOpened = () => {
        let unreadNotificationsIds = notifications
            .filter(not => !not.read)
            .map(not => not.notificationId);

        dispatch(markNotificationsRead(unreadNotificationsIds))
    }

    let notificationIcon;
    // Jika notif ada dan length notif lebih dari 0
    if(notifications && notifications.length > 0){
        // Jika notif setelah di filter jumlah read=false nya lebih dari 0 maka
        // tampilkan badge dengan jumlah notif yang belum dibaca
        notifications.filter(not => not.read === false).length > 0  
            ? notificationIcon = (
                <Badge badgeContent={notifications.filter(not => not.read === false).length}
                        color="primary">
                        <NotificationsIcon/>
                </Badge>
            ) : (
                notificationIcon = <NotificationsIcon/>
            )
    } else {
        notificationIcon = <NotificationsIcon/>
    }


    let notificationsMarkup =
        // Jika notif ada dan length notif lebih dari 0
        notifications && notifications.length > 0 ? (
            notifications.map(not=>{ //map notifications
                const verb = not.type === 'like' ? 'liked' : 'commented on';
                const time = dayjs(not.createdAt).fromNow();
                // const iconColor = not.read ? 'primary' : 'secondary';
                // const icon = not.type === 'like' ? (
                //     <FavoriteIcon color= {iconColor} style={{marginRight: 10}}/>
                // ) : (
                //     <ChatIcon color={iconColor} style={{marginRight: 10}}/>
                // )

                const icon = not.type === 'like' ? (
                    not.read ? ( <FavoriteIcon color= "primary" style={{marginRight: 10}}/> )
                             : ( <FavoriteIcon color= "secondary" style={{marginRight: 10}}/> )
                ) : (
                    not.read ? ( <ChatIcon color= "primary" style={{marginRight: 10}}/> )
                             : ( <ChatIcon color= "secondary" style={{marginRight: 10}}/> )
                )

                return(
                    <MenuItem key={not.cretedAt} onClick={handleClose}>
                        {icon}
                        <Typography
                            component={Link}
                            color="secondary"
                            variant="body1"
                            to={`/user/${not.recipient}/scream/${not.screamId}`}
                            >
                                {not.sender} {verb} your scream {time}
                        </Typography>
                    </MenuItem>
                )
            })
        ) : (
            <MenuItem onClick={handleClose}>
                You have no notifications yet
            </MenuItem>
        )

    return ( 
        <Fragment>
            <ToolTip placement='top' title="Notifications">
                <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup='true'
                    onClick={handleOpen}
                >
                    {notificationIcon}
                </IconButton>
            </ToolTip>
            <Menu 
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onEntered={onMenuOpened} // ini atribute yang bakal digunakan buat send MarkNotificationRead ke Backend
                >
                    {notificationsMarkup}
            </Menu>
        </Fragment>
     );
}
 
export default Notifications;

