import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import UIReducer from './reducers/UIReducer';

//State dasar /base pada redux (bentuknya object)
const initialState = {};

//kumpulan middleware
const middleware = [thunk]


// create rootReducer or combine reducer disini dimana setiap state disini menyimpan hasil dari reducer masing2
const reducers = combineReducers({
    user: userReducer, // semua hasil dari userReducer akan disimpan kedlam state user
    data: dataReducer,
    UI: UIReducer
});


//buat store (terdiri dari combineReducer, initialState, compose)
const store = createStore(
    reducers, 
    initialState, 
    compose( // compose berfungsi untuk menerapkan middleware kedalam store dan extension redux_devtool
        applyMiddleware(...middleware), 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store



