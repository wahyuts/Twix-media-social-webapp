import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import MyButton from '../util/MyButton';

//Mui tool HeadNav
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//Icons
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';


//Redux stuff
import { useDispatch, useSelector } from "react-redux";


const Navbar = () => {
    const {authenticated} = useSelector (state => state.user);

// class Navbar extends Component {
    // render() {
        return (
            <div>
                <AppBar>
                    <Toolbar className="nav-container">
                        {authenticated ? ( 
                            <Fragment>
                                <MyButton tip="Post a scream!">
                                    <AddIcon color="primary"/>
                                </MyButton>

                                <Link to="/">
                                    <MyButton tip="Home">
                                        <HomeIcon color="primary"/>
                                    </MyButton>
                                </Link>
                                
                                <MyButton tip="Notifications">
                                    <Notifications color="primary"/>
                                </MyButton>
                            </Fragment>
                        ) : ( 
                            <Fragment>
                            <Button color="inherit" component={Link} to='/login'>Login</Button>
                            <Button color="inherit" component={Link} to='/'>Home</Button>
                            <Button color="inherit" component={Link} to='/signup'>SignUp</Button>
                            </Fragment>
                        )}
                        
                    </Toolbar>
                </AppBar>
            </div>
        )
    // }
}

export default Navbar
