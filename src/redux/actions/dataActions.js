//Tempat semua fungsi yang berbunungan dengan user dimana akan ke trigger jika suatu action dilakukan

// CTH SEDERHANANYA : ketika lu pencet tombol login nah baru fungsi yang ada di mari dijalankan misal fungsi 
                    //login user

import axios from 'axios';
import {
    SET_SCREAMS, 
    SET_SCREAM, 
    LOADING_DATA, 
    LIKE_SCREAM, 
    UNLIKE_SCREAM, 
    DELETE_SCREAM, 
    STOP_LOADING_UI, 
    LOADING_UI, 
    POST_SCREAM, 
    SET_ERRORS, 
    CLEAR_ERRORS,
    SUBMIT_COMMENT
} from '../type';

// get all screams
export const getScreams = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get('/screams')
        .then((res)=>{
            dispatch({ 
                type: SET_SCREAMS,
                payload: res.data
            })
        })
        .catch((err)=>{
            dispatch({
                type: SET_SCREAMS,
                payload: []
            })
        })
}

//Get one scream full detail
export const getOneScream = (screamId) => dispatch => {
    dispatch({ type: LOADING_UI});
    axios.get(`/scream/${screamId}`)
        .then((res)=>{
            dispatch({
                type: SET_SCREAM,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI});
        })
        .catch((err)=>{
            console.log(err);
        });
}

//Post a scream
export const postScream = (newScream) => dispatch =>{
    dispatch({type: LOADING_UI})
    axios.post('/scream',newScream)
        .then((res)=>{
            dispatch({
                type: POST_SCREAM,
                payload: res.data
            });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch((err)=>{
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}

//Like a scream
export const likeScream = (screamId) => dispatch => {
    axios.get(`/scream/${screamId}/like`)
        .then((res)=>{

            dispatch({
                type: LIKE_SCREAM,
                payload: res.data
            })
        })
        .catch((err)=>{
            console.log(err)
        })
}

//Unlike a scream
export const unlikeScream = (screamId) => dispatch => {
    axios.get(`/scream/${screamId}/unlike`)
        .then((res)=>{
            getAuthorizationHeader()
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data
            })
        })
        .catch((err)=>{
            console.log(err)
        })
}

//Submit a comment
export const submitComment = (screamId, commentData) => dispatch => {
    dispatch({type: LOADING_UI})
    axios.post(`/scream/${screamId}/comment`, commentData)
        .then((res)=>{
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            });
            dispatch(bersihinError());
            dispatch({ type: STOP_LOADING_UI});
        })
        .catch((err)=>{
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

//Delete a scream
export const deleteScream = (screamId) => (dispatch) => {
    axios.delete(`/scream/${screamId}`)
        .then(()=>{
            dispatch({ 
                type: DELETE_SCREAM, 
                payload: screamId 
            })
        })
        .catch((err)=>{
            console.log(err)
    })
}

// get other user data (hanya data scream user saja yang didapet,..untuk data user nya bisa di dapet dari getUserData)
export const getOtherUserData = (userHandle) => dispatch => {
    dispatch({ type: LOADING_DATA })
    axios.get(`/user/${userHandle}`)
        .then((res)=>{
            dispatch({
                type: SET_SCREAMS,
                   payload: res.data.screams
            });
        })
        .catch(()=>{
            dispatch({
                type: SET_SCREAMS,
                payload: null
            });
        });
}

//Khusus bersihin error aja
export const bersihinError = () => dispatch =>{
    dispatch({ type: CLEAR_ERRORS });
}

const getAuthorizationHeader = () => {
    const FBIdToken=localStorage.getItem('FBIdToken');
    axios.defaults.headers.common['Authorization'] = FBIdToken; // code ini itu pengganti Authorization: Bearer token di postman
}