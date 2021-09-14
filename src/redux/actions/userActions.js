//Tempat semua fungsi yang berbunungan dengan user dimana akan ke trigger jika suatu action dilakukan

// CTH SEDERHANANYA : ketika lu pencet tombol login nah baru fungsi yang ada di mari dijalankan misal fungsi 
                    //login user

import axios from 'axios';
import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, MARK_NOTIFICATIONS_READ} from '../type';


// Fungsi User ketika login
export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI}); 
    axios.post('/signin', userData)
        .then((res)=>{
            // console.log('babi',res.data);
            // const FBIdToken = `Bearer ${res.data.token}`;
            // localStorage.setItem('FBIdToken', FBIdToken);
            // axios.defaults.headers.common['Authorization'] = FBIdToken;
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS});
            history.push("/"); // untuk redirect ke tempat tujuan url
        })
        .catch((err)=>{
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
    
}

//Fungsi user ketika signup
export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI});
    axios.post('/signup', newUserData)
        .then((res)=>{
            // console.log(res.data);
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS});
            history.push("/"); // untuk redirect ke tempat tujuan url
        })
        .catch((err)=>{
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
    
}

//Logout user
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    // dispatch({ type: SET_AUTHENTICATED});
    dispatch({ type: SET_UNAUTHENTICATED});
}

//Fungsi mau dapetin data2 user (biasanya buat user profile atau mau cantumin nama di headnav)
export const getUserData = () => (dispatch) => {
    dispatch({type: LOADING_USER});
    // axios.get('https://asia-southeast1-loginreg-api-wts.cloudfunctions.net/api/user')
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch((err)=>{
            console.log(err)
        })
}

//Fungsi buat bisa upload image
export const uploadImage = (formData) => (dispatch) => {
    dispatch({type: LOADING_USER});
    axios.post('/user/image', formData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch((err)=>{
            console.log(err)
        })
}

//FUngsi buat edit user detail
export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({type: LOADING_USER});
    axios.post('/user', userDetails)
        .then(()=>{
            dispatch(getUserData());
        })
        .catch((err)=>{
            console.log(err)
        })
}

export const markNotificationsRead = (notificationIds) => (dispatch) => {
    axios.post('/notifications', notificationIds)
        .then((res)=>{
            dispatch({
                type: MARK_NOTIFICATIONS_READ,
            });
        })
        .catch((err)=>{
            console.log(err)
        })
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken; // code ini itu pengganti Authorization: Bearer token di postman
}