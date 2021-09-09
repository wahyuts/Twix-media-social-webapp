//Tempat semua fungsi yang berbunungan dengan user dimana akan ke trigger jika suatu action dilakukan

// CTH SEDERHANANYA : ketika lu pencet tombol login nah baru fungsi yang ada di mari dijalankan misal fungsi 
                    //login user

import axios from 'axios';
import {SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM} from '../type';

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

const getAuthorizationHeader = () => {
    const FBIdToken=localStorage.getItem('FBIdToken');
    axios.defaults.headers.common['Authorization'] = FBIdToken; // code ini itu pengganti Authorization: Bearer token di postman
}