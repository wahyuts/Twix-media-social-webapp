//Tempat state yang berhubungan dengan semua atribut data user

import {SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_SCREAM, UNLIKE_SCREAM, MARK_NOTIFICATIONS_READ} from '../type';

const initialState = {
    authenticated: false,
    // credential ini jika di test pake postman maka isinya nama,email,uid dll,..cuma didalam object credential
    loading: false,
    credentials: {}, 
    likes: [],
    notifications: []
};

export default function(state = initialState, action) {
    switch(action.type){
        case SET_AUTHENTICATED:
            return{
                ...state, // ...state artinya memakai seluruh data yang ada di state tersebut
                authenticated: true
            };
        case SET_UNAUTHENTICATED: // UNTUK SIGN OUT
            return{
                initialState,
                credentials: {}
            };
        case SET_USER:
            return{
                authenticated: true,
                loading: false,
                ...action.payload 
                // kenapa spread ...action.payload karena pas kita melakukan request data by API "/user" di userAction
                // kita akan mendapat res berupa sama persis yang ada di initialState
                // so ...action.payload disini itu artinya kita memakai seluruh data hasil respon get tadi lalu membind nya
                // misal,...email to email, name to name dsb
            };
        case LOADING_USER:
            return{
                ...state,
                loading: true
            }
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach(not => not.read = true);
            return{
                ...state
            }
        case LIKE_SCREAM:
            return{
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.name,
                        screamId: action.payload.screamId
                    }
                ]
            }
        case UNLIKE_SCREAM:
            // let index2 = state.likes.findIndex((like) => like.screamId === action.payload.screamId);
            // state.likes[index2] = action.payload;
            return{
                ...state,
                likes: state.likes.filter((like) => like.screamId !== action.payload.screamId)
            }
        default:
            return state;
    }
}

