import {SET_SCREAMS, SET_SCREAM, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM, POST_SCREAM, SUBMIT_COMMENT} from '../type';

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
            //tentukan index terlebih dahulu dari state screams dan simpan di variable index
            let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
            //setelah index ditentukan, barulah update state screams berdasarkan indexnya
            state.screams[index] = action.payload;
            // conditional if untuk state  scream (ingat state scream dan screams berbeda yah)
            if(state.scream.screamId === action.payload.screamId){
                state.scream.likeCount = action.payload.likeCount;
                // state.scream = action.payload;
            }
            return{
                ...state
            }

        case UNLIKE_SCREAM:
            let index2 = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
            state.screams[index2] = action.payload;
            if(state.scream.screamId === action.payload.screamId){
                state.scream.likeCount = action.payload.likeCount
                // state.scream = action.payload;
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
        //untuk case submit comment ini agak berbeda dikarenakan kita akan mengupdate 2 state langsung dari action yang sama
        //ingat setiap state terupdate redux akan melakukan rerender,...oleh karena itu kali ini tricknya akan berbeda
        //kita akan mengupdate 2 state dengan 1 x re render (bukan 2 kali)
        case SUBMIT_COMMENT:
            // Menentukan index yang dituju dari list state screams
            let index4 = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
            // Mengkopi seluruh state screams agar dapat digunakan di action ini tanpa harus re render state
            let updatedScreams = JSON.parse(JSON.stringify(state.screams));  
            updatedScreams[index4].commentCount += 1; // update commentCount di updateScreams
            return{
                ...state,
                screams:updatedScreams, // update screams secara keseluruhan berdasarkan variable updateScreams
                scream: { // update scream
                    ...state.scream,
                    comments: [action.payload, ...state.scream.comments],
                    commentCount:state.scream.commentCount+1
                }
            }
        default:
            return state;
    }
}