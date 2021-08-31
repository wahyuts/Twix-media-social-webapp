import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";


// const AuthRoute = ({ component: Component,  ...rest }) => {

const AuthRoute = ({ component: Component, ...rest }) => {
  const {authenticated} = useSelector (state => state.user)


    return (
        <div>
            {/* <Route 
                {...rest}
                { ...ss ?  <Redirect to="/"/> : <Component {...props}/> }
            /> */}
            <Route 
                {...rest}
                render={(props) => authenticated === true ?  <Redirect to="/"/> : <Component {...props}/> }
            />
            
        </div>
    )
}

export default AuthRoute
