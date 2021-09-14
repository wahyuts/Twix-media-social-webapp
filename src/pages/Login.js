import React,{useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import AppIcon from '../images/logo-trans.png';
import withStyles from '@material-ui/core/styles/withStyles';

//Mui Grid and othet stuff 
import Grid from '@material-ui/core/Grid';
import {Typography}  from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux stuff
import { useDispatch, useSelector } from "react-redux";
// import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions';


const styles = {
    form:{
        textAlign: 'center'
    },
    image:{
        width: 300,
        height: 100,
        margin: '10px auto 10px auto'
    },
    textField:{
        margin: '10px auto 10px auto'
    },
    button:{
        margin: '20px auto 20px auto',
        position: "relative"
    },
    customError:{
        color: 'red',
        fontSize: '0.8rem',
        marginTop: '10px'
    },
    progress:{
        position: "absolute"
    }
}


// why pake props padahal ini  fungsional component ? karena props ini buat mat ui doang
const Login = (props) => {

const {classes} = props;

// mengambil state dari reducer tertentu
const {loading} = useSelector (state => state.UI);
const {errors} = useSelector (state => state.UI);

//state locally
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [showErrors,setShowErrors] = useState({});
const dispatch = useDispatch()


Login.propTypes = {
    classes: PropTypes.object.isRequired
}

// useEffect kali ini digunakan untuk error karena:
//1. errors di call langsung di koponent ketika web di load untuk ngecek apakah ada error atau tidak
//2. khusus state errors di reducer ketika di call tidak bisa digunakan langsung kecuali memakai state perantara
//   jadi state errors dari reducer ditampung di state perantara(local), lalu dari state perantara itulah kita 
//   bisa memakai state errors dari reducer tersebut
//   cth disini state errors dari reducer di tampung di state showErrors
useEffect(()=>{
    if(errors){
        setShowErrors(errors)
    }
    console.log(showErrors)

})


const handleSubmit = async (event) => {
    // preventDefault mencagah supaya data yang dikirimkan by form tidak tampil di url param sehingga tidak bisa dilihat orang lain
    event.preventDefault();
    const userData = {
        email: email,
        password: password
    } 
    
    // mengirimkan data lewat dispatch yang diserahkan ke fungsi loginUser yang membawa userData dan props.history
    // props.history ini perlu dimasukan agar fungsi loginUser bisa menggunkannya nanti
    // buat apa props.history ? buat nge redirect halaman,..(props.history disini bukan punya react-router-dom,..tapi bawaan react js)
    dispatch(loginUser(userData, props.history))
}

// fungsi untuk mengubah value email pada setiap ketikan yang kita ketik
// cara pakai: jalankan di sebuah <input> atau textField lainnya dengan method onChange
const handleChangeEmail = (event) => {
    setEmail(event.target.value)
}

// fungsi untuk mengubah value password pada setiap ketikan yang kita ketik
// cara pakai: jalankan di sebuah <input> atau textField lainnya dengan method onChange
const handleChangePassword = (event) => {
    setPassword(event.target.value)
}

// console.log(email)
// console.log(password)

    return (
        <div>
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="monkey" className={classes.image}/>
                    <Typography variant="h4" className={classes.pageTitle}>
                        Login
                    </Typography>

                    <form noValidate onSubmit={handleSubmit}>
                        <TextField 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            className={classes.textField}
                            // helperText adalah method yang disediakan oleh textField by mat ui untuk membantu memunculkan
                            // error jika ada
                            helperText={showErrors.email} 
                            //error property ini yang dipake untuk memunculkan helperText nya,..kalo ada error muncul
                            error={showErrors.email ? true : false}
                            value={email} 
                            onChange={handleChangeEmail} 
                            fullWidth
                        />
                        <TextField 
                            id="password" 
                            name="password" 
                            type="password" 
                            label="Password" 
                            className={classes.textField}
                            helperText={showErrors.password}
                            error={showErrors.password ? true : false}
                            value={password} 
                            onChange={handleChangePassword} 
                            fullWidth
                            />
       
                            {showErrors.general && ( // baris code ini untuk validasi or cek ke database apakah email or password yang kita masukin ud bener ?
                                <Typography variant="body2" className={classes.customError}>
                                    {showErrors.general}
                                </Typography>
                            )}

                            {/** Button harus diletakan didalam component form agar onSubmit bisa digunakan  */}
                            {/** Button tidak perlu diberi onSubmit or onClick di tag nya karena sudah otmatis memakai onSubmit dari comp form  */}
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary"
                                disabled={loading}  // hanya masukin loading aja,..kalo loading true maka disable kalo false aktif
                                className={classes.button}
                            >
                                Login
                                {loading && ( // jika loading true maka tampilkan spinner
                                    <CircularProgress className={classes.progress}/>
                                )}
                            </Button>
                            <br/>
                            <small>dont have an account ? sign up <Link to="/signup">here</Link></small>
                    </form>
                    
                </Grid>
                <Grid item sm/>
            </Grid>
        </div>
    )
    // }
}

export default withStyles(styles)(Login)