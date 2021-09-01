import axios from 'axios';
import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER} from '../type';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI});
    axios.post('/signin', userData)
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

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    // dispatch({ type: SET_AUTHENTICATED});
    dispatch({ type: SET_UNAUTHENTICATED});
}

export const getUserData = () => (dispatch) => {
    dispatch({type: LOADING_USER});
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

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken; // code ini itu pengganti Authorization: Bearer token di postman
}