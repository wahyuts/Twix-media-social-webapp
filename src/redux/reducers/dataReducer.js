import {SET_SCREAMS, SET_SCREAM, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM, POST_SCREAM} from '../type';

const initialState = {
    screams: [],
    scream: {},
    loading: false
}

export default function (state=initialState, action) {
    switch (action.type){
        case LOADING_DATA:
            return{
                ...state,
                loading:true
            }
        case SET_SCREAMS:
            return{
                ...state,
                screams: action.payload,
                loading: false
            }
        case SET_SCREAM:
            return{
                ...state,
                scream: action.payload,
            }
        case LIKE_SCREAM:
            let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            if(state.scream.screamId === action.payload.screamId){
                state.scream = action.payload;
            }
            return{
                ...state
            }

        case UNLIKE_SCREAM:
            let index2 = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
            state.screams[index2] = action.payload;
            if(state.scream.screamId === action.payload.screamId){
                state.scream = action.payload;
            }
            return{
                ...state
            }
        case DELETE_SCREAM:
            let index3 = state.screams.findIndex(scream => scream.screamId === action.payload);
            state.screams.splice(index3,1);
            return{
                ...state
            }
        case POST_SCREAM:
            return{
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            }
        default:
            return state;
    }
}