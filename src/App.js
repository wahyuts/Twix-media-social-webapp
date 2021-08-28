import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

//Tool untuk create custom theme Material UI (alias bikin css sendiri ala mat ui)
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles'


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

//perbandingan nya seperti global css : css khusus untuk komponent tertentu 
const theme = createTheme({
  palette:{
    primary:{
      light:'#ec407a',
      main:'#ec407a',
      dark:'#c2185b',
      contastText:'#fff'
    },
    secondary:{
      light:'#9575cd',
      main:'#673ab7',
      dark:'#4527a0',
      contastText:'#fff'
    }
  },
  typography: {
    useNextVariants: true
  }
});


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
          <div>
              <Router>
                  <div className="container">
                    <Navbar/>{/**Komponen yang berada diluar switch tapi masih berada didalam router tidak akan terganti komponennya */}
                    <Switch> {/**Komponen yang berada didalam switch akan terganti jika di klik komponennya */}
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/signup' component={SignUp}/>
                    </Switch>
                  </div>
              </Router>
          </div>
      </MuiThemeProvider>
    )
  }
}

export default App

