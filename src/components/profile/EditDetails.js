import React, {Fragment, useEffect,useState} from 'react';
import {editUserDetails} from '../../redux/actions/userActions';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

//Redux stuff
import { useDispatch, useSelector } from "react-redux";

//Mui stuff
import {IconButton, Typography}  from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog'; // modal nya mat ui
import DialogActions from '@material-ui/core/DialogActions'; // buat container button didalam modal
import DialogContent from '@material-ui/core/DialogContent'; // buat isi modalnya
import DialogTitle from '@material-ui/core/DialogTitle'; // judul didalam modalnya

//Icon Mui
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
    color: theme.palette.primary.main,
    button: {
        float: 'right'
    }
}));

const EditDetails = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {credentials} = useSelector (state => state.user);

    const [bio,setBio] = useState("");
    const [website,setWebsite] = useState("");
    const [location,setLocation] = useState("");
    const [open,setOpen] = useState(false);

    const anotherUserDetails = () => {
        credentials.bio ? setBio(credentials.bio) : setBio("")
        credentials.website ? setWebsite(credentials.website) : setWebsite("")
        credentials.location ? setLocation(credentials.location) : setLocation("")
    }

    useEffect(()=>{
        anotherUserDetails()
    },[])

    // EditDetails.PropTypes = {
    //     editUserDetails: PropTypes.func.isRequired
    // }
    
    const handleOpen = ()=> {
        setOpen(true);
        anotherUserDetails();
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = () => {
        const userDetails = {
            bio: bio,
            website: website,
            location: location
        }
        dispatch(editUserDetails(userDetails));
        handleClose();
    }

    const handleChangeBio = (event) => {
        setBio(event.target.value)
    }

    const handleChangeWebsite = (event) => {
        setWebsite(event.target.value)
    }

    const handleChangeLocation = (event) => {
        setLocation(event.target.value)
    }

    return ( 
        <Fragment> 
            <Tooltip title="Edit Details" placement="top">
                <IconButton onClick={handleOpen} className={classes.button}>
                    <EditIcon color="primary"/>
                </IconButton>
            </Tooltip>

            {/* Dialog adalah the real modalnya (yang biasa menu pop upnya) */}
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm" // ini untuk mengatur lebar modal dialog secara otomati pake ukuran mat ui
                              // untuk jenis ukurannya bisa liat di dokumentasi dialog mat ui
                >
                {/** ini judul didalam modalnya */}
                <DialogTitle>Edit your details</DialogTitle>
                {/*Dialog content isinya */}
                <DialogContent>
                    <form>
                        <TextField
                            name="bio"
                            type="text"
                            label="Bio"
                            multiline
                            rows="3"
                            placeholder="A short bio about your self"
                            className={classes.textField}
                            value={bio}
                            onChange={handleChangeBio}
                            fullWidth
                            />

                            <TextField
                            name="website"
                            type="text"
                            label="Website"
                            placeholder="Your website"
                            className={classes.textField}
                            value={website}
                            onChange={handleChangeWebsite}
                            fullWidth
                            />

                            <TextField
                            name="location"
                            type="text"
                            label="Location"
                            placeholder="Where you live?"
                            className={classes.textField}
                            value={location}
                            onChange={handleChangeLocation}
                            fullWidth
                            />
                        
                    </form>
                </DialogContent>
                {/**Dialog action biasa buat tempat button button diletakan */}
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment> 
        
     );
}
 
export default EditDetails;