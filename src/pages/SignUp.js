import React,{useState} from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import AppIcon from '../images/logo-trans.png';
import axios from 'axios'
import withStyles from '@material-ui/core/styles/withStyles';

//Mui Grid and othet stuff 
import Grid from '@material-ui/core/Grid';
import {Typography}  from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


// Code or fungsi dibawah ini untuk mengambil styles dari global custom theme yang ada di app agar bisa dipakai di kompoen ini
//  *jika hanya ingin mengambil pallete or attribut default lainya bawaan mat ui (bukan bikinan sendiri) 
//   yang ada di global thme maka tidak perlu meng input code dibawah ini,..karena tinggal langsung pakai saja

// const styles = (theme) => ({
//     ...theme
// })


// styles dibawah ini untuk penggunaan styles mat ui seperti biasa dengan withStyles
// penggunaannya dimana satu object styles hanya untuk satu komponen tempat styles di deklar (disini komponen SignUp)
// kalo mau pake styles ini uncomment saja

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


const SignUp = (props) => {
// class Login extends Component {
    // render() {
const {classes} = props;

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");
const [loading,setLoading] = useState(false);
const [errors,setErrors] = useState({});

// const history = useHistory();

SignUp.propTypes = {
    classes: PropTypes.object.isRequired
}

//Dibawah ini adalah berbagai tipe jenis fetch dari async await, .then bahkan di combine antara async await dan .then
// cth kasus nya Login form,..tapi bisa digunakan juga untuk kasus lain (sesuaikan kondisinya)

//Fetch data via async await try catch (dalam hal ini cth kasus login form)

const fetchingData = async () => {
    //const userData boleh pake boleh tidak,..ini buat merapihkan saja
    // kalo tidak pake jadi seperti ini  const response = await axios.post('/signin', email,password);
    const newUserData = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    }

    try{
        const response = await axios.post('/signup', newUserData);
        console.log('hasil login', response.data);
        setLoading(false);
        props.history.push("/"); // untuk redirect ke tempat tujuan url

    }
    catch(err){
        setErrors(err.response.data);
        setLoading(false);
    }
}

//Fetching data sekaligus menyimpan token di local storage agar data tidak hilang ketika di refresh
//(untuk kasus ini memakai asyn await BUT untuk menyimpan token di local bisa dicombine dengan method lainnya)

const fetchingDataAndStoredToken = async () => {
    //const userData boleh pake boleh tidak,..ini buat merapihkan saja
    // kalo tidak pake jadi seperti ini  const response = await axios.post('/signin', email,password);
    const newUserData = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    }

    try{
        const response = await axios.post('/signup', newUserData);
        console.log('hasil login', response.data);
        localStorage.setItem('FBIdToken', `Bearer ${response.data.token}`); // This line untuk menyimpan token di local storage
        setLoading(false);
        props.history.push("/"); // untuk redirect ke tempat tujuan url

    }
    catch(err){
        setErrors(err.response.data);
        setLoading(false);
    }
}


//Fetch data via .then (dalam hal ini cth kasus login form)

const fetchingData2 = () => {
    const newUserData = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    }

    axios.post('/signin', newUserData)
        .then((res)=>{
            console.log(res.data);
            setLoading(false);
            props.history.push("/");
        })
        .catch((err)=>{
            setErrors(err.response.data);
            setLoading(false)
        });
}


//Fetch data via combine antara async await dan .then (dalam hal ini cth kasus login form)

const fetchingData3 = async () => {
    const newUserData = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    }
    
    try{
        axios.post('/signup', newUserData)
        .then((res)=>{
            console.log(res.data);
            setLoading(false);
            props.history.push("/");
        })
        .catch((err)=>{
            setErrors(err.response.data);
            setLoading(false)
        });

    }
    catch(err){
        setErrors(err.response.data);
        setLoading(false);
    }
}

// fungsi untuk mengirim sebuah isiian yang ada di formulir ke server
// cara pakai: (hanya bisa di tag <form> dan form lainnya yang sejenis) pakaikan di method onSubmit pada tag <form>
const handleSubmit = async (event) => {
    // preventDefault mencagah supaya data yang dikirimkan by form tidak tampil di url param sehingga tidak bisa dilihat orang lain
    event.preventDefault(); 
    setLoading(true);
    fetchingDataAndStoredToken();
}

// fungsi untuk mengubah value name pada setiap ketikan yang kita ketik
// cara pakai: jalankan di sebuah <input> atau textField lainnya dengan method onChange
const handleChangeName = (event) => {
    setName(event.target.value)
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

// fungsi untuk mengubah value confirmPassword pada setiap ketikan yang kita ketik
// cara pakai: jalankan di sebuah <input> atau textField lainnya dengan method onChange
const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value)
}

console.log(name)
console.log(email)
console.log(password)
console.log(confirmPassword)


    return (
        <div>
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="monkey" className={classes.image}/>
                    <Typography variant="h4" className={classes.pageTitle}>
                        Sign Up
                    </Typography>

                    <form noValidate onSubmit={handleSubmit}>
                        <TextField 
                            id="name" 
                            name="name" 
                            type="text" 
                            label="Your Name" 
                            className={classes.textField}
                            // helperText adalah method yang disediakan oleh textField by mat ui untuk membantu memunculkan
                            // error jika ada
                            helperText={errors.name} 
                            //error property ini yang dipake untuk memunculkan helperText nya,..kalo ada error muncul
                            error={errors.name ? true : false}
                            value={name} 
                            onChange={handleChangeName} 
                            fullWidth
                        />
                        <TextField 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            className={classes.textField}
                            // helperText adalah method yang disediakan oleh textField by mat ui untuk membantu memunculkan
                            // error jika ada
                            helperText={errors.email} 
                            //error property ini yang dipake untuk memunculkan helperText nya,..kalo ada error muncul
                            error={errors.email ? true : false}
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
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={password} 
                            onChange={handleChangePassword} 
                            fullWidth
                            />
                        <TextField 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            label="Confirm Password" 
                            className={classes.textField}
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            value={confirmPassword} 
                            onChange={handleChangeConfirmPassword} 
                            fullWidth
                            />
                            
                            {errors.general && ( // baris code ini untuk validasi or cek ke database apakah email or password yang kita masukin ud bener ?
                                <Typography variant="body2" className={classes.customError}>
                                    {errors.general}
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
                                Sign Up
                                {loading && ( // jika loading true maka tampilkan spinner
                                    <CircularProgress className={classes.progress}/>
                                )}
                            </Button>
                            <br/>
                            <small>Already have an account ? sign in <Link to="/login">here</Link></small>
                    </form>
                    
                </Grid>
                <Grid item sm/>
            </Grid>
        </div>
    )
    // }
}

export default withStyles(styles)(SignUp)