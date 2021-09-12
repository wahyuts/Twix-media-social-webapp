import React, {useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import themeFile from './util/theme';
import AuthRoute from './util/AuthRoute';
import jwtDecode from 'jwt-decode';
import './App.css';

//Tool untuk create custom theme Material UI (alias bikin css sendiri ala mat ui)
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles'

//Redux
import {Provider} from 'react-redux';  
import store from './redux/store';
// import { useDispatch, useSelector } from "react-redux";
import {SET_AUTHENTICATED} from './redux/type';
import {logoutUser, getUserData} from './redux/actions/userActions';

//Components
import Navbar from './components/layout/Navbar';

//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import axios from 'axios';

//Setting custom theme nya Mat ui (dok nya liat di material ui customization)
// Tujuan dari custom theme ini adalah untuk mengganti style default bawaan dari mat ui sesuai dengan selera kita, karena kalo gak diganti ke lock sama style mat ui
// Theme beda dari style mat ui,...Theme adalah sekelompok style yang di sharing ke berbagai komponent agar bisa dipakai sama2
// sedangkan style mat ui atau withStyle mat ui adalah  styles khusus untuk komponent itu aja tempat withStyles digunakan
// jadi jika ada 2 komponen menggunakan style yang sama maka className nya bisa di masukan disini

//perbandingan nya seperti global css : css khusus untuk komponent tertentu 
const theme = createTheme(themeFile); // baris ini menyimpan them di ecternal (disini di theme.js)


const App = () => {

  //menyimpan token dari local strogae di variable token
  const token = localStorage.FBIdToken;

  const history = useHistory();
  const changePage = () => history.push('/login');

  // const dispatch = useDispatch();

  useEffect (()=>{
  // conditional logic jika token kita expired atau habis masa berlakunya maka user akan diarahkan ke halaman login untuk login ulang
  if(token) {
    //token adalah kode rahasia yang di encrypt jadi untuk mengetahui isi token diperlukan decode token
    // untuk decode token kita pake lib jwt-decode
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    //jika tanggal yang ada didalam token kurang dari hari ini, maka token expired dan otomatis log out
    // jika lebih dari tanggal hari ini maka tampilkan userData
    if(decodedToken.exp * 1000 < Date.now()){
      store.dispatch(logoutUser());
      changePage();
      // window.loaction.href = '/login';
    } else {
      store.dispatch({type: SET_AUTHENTICATED})
      // dispatch({type: SET_AUTHENTICATED});
      axios.defaults.headers.common['Authorization'] = token
      store.dispatch(getUserData())
      // dispatch(getUserData())
    }
  }

})

    return (
      // Provider dari redux harus me wrap semua komponen agar kompenen tersebut bisa kases global store
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <div>
                <Router>
                    <div className="container">
                      <Navbar/>{/**Komponen yang berada diluar switch tapi masih berada didalam router tidak akan terganti komponennya */}
                      <Switch> {/**Komponen yang berada didalam switch akan terganti jika di klik komponennya */}
                          <Route exact path='/' component={Home}/>
                          <AuthRoute exact path='/login' component={Login}  />
                          <AuthRoute exact path='/signup' component={SignUp}  />
                      </Switch>
                    </div>
                </Router>
            </div>
          </Provider>
        </MuiThemeProvider>
    )
  // }
}

export default App

