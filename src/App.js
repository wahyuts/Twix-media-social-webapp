import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import themeFile from './util/theme';
import AuthRoute from './util/AuthRoute';
import jwtDecode from 'jwt-decode';
import './App.css';

//Tool untuk create custom theme Material UI (alias bikin css sendiri ala mat ui)
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles'

//Redux
import {Provider} from 'react-redux';  // saluran untuk menyalurkan tempat penyimpanan
import store from './redux/store';

//Components
import Navbar from './components/Navbar';

//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

//Setting custom theme nya Mat ui (dok nya liat di material ui customization)
// Tujuan dari custom theme ini adalah untuk mengganti style default bawaan dari mat ui sesuai dengan selera kita, karena kalo gak diganti ke lock sama style mat ui
// Theme beda dari style mat ui,...Theme adalah sekelompok style yang di sharing ke berbagai komponent agar bisa dipakai sama2
// sedangkan style mat ui atau withStyle mat ui adalah  styles khusus untuk komponent itu aja tempat withStyles digunakan
// jadi jika ada 2 komponen menggunakan style yang sama maka className nya bisa di masukan disini

//perbandingan nya seperti global css : css khusus untuk komponent tertentu 
const theme = createTheme(themeFile);


const App = () => {
// class App extends Component {
  // render() {

  //menyimpan token dari local strogae di variable token
  const token = localStorage.FBIdToken;

  // jika suatu variable di deklare tanpa value,..berati variable tersebut bernilai kosong saat itu
  let authenticated;

  // conditional logic jika token kita expired atau habis masa berlakunya maka user akan diarahkan ke halaman login untuk login ulang
  if(token) {
    //token adalah kode rahasia yang di encrypt jadi untuk mengetahui isi token diperlukan decode token
    // untuk decode token kita pake lib jwt-decode
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    if(decodedToken.exp * 1000 < Date.now()){
      window.loaction.href = '/login';
      authenticated = false;
    } else {
      authenticated = true;
    }
  }

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
                          <AuthRoute exact path='/login' component={Login} authenticated={authenticated}/>
                          <AuthRoute exact path='/signup' component={SignUp} authenticated={authenticated}/>
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

