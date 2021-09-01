//Tempat state yang berhubungan dengan semua atribut data user

import {SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER} from '../type';

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
        default:
            return state;
    }
}

