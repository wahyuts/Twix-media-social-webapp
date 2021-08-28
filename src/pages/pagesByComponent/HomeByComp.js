import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

class HomeByComp extends Component {

    // Didalam class component state dinyatakan dalam bentuk object type
    state = {
        screams: null
    }

    // untuk ngeload data firsttime pake componentDidMount
    componentDidMount(){
        axios.get("/screams")
            .then((res)=>{
                console.log(res.data)
                this.setState({
                    screams: res.data
                })
            })
            .catch(err => console.log(err));
    }

    // Wrender wajib di masukan pada class component
    render(){
        let recentScreamsMarkup = screams ? (
            screams.map((scream,i)=>{
                return (
                    <p key={i}>{scream.body}</p>
                )
            })
        ) : 
        <p>Loading...</p>
        return (
            // container pada grid ini adalah property grid dari mat ui,... efeknya adalah flex
            // karena nilainya boolean jika true tidak usah ditulis
            // item juga sama efeknya flex, beda a item lebih ke flex detainya nya bukan container
            <div>
                <Grid container spacing={5}>
                    <Grid item sm={8} xs={12}>
                        {recentScreamsMarkup}
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <p>Profile</p>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default HomeByComp
