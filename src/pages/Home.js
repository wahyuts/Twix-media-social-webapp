import React, { useEffect,useState } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import ScreamDetail from '../components/scream/ScreamDetail';
import Profile from '../components/profile/Profile';
import ScreamSkeleton from '../util/ScreamSkeleton.js';

import {getScreams} from '../redux/actions/dataActions'

//Redux stuff
import { useDispatch, useSelector } from "react-redux";

const Home = () => {

    const { screams, loading} = useSelector (state => state.data);

    const dispatch = useDispatch();

    // const [screams,setScreams] = useState(null)

        useEffect(()=>{
            axios.defaults.baseURL = "https://asia-southeast1-loginreg-api-wts.cloudfunctions.net/api"

            dispatch(getScreams())
        },[])
        // console.log('liat screams', screams);

        let recentScreamsMarkup = !loading ? ( // !loading ini artinya
            screams.map((scream)=>{
                return (
                    <ScreamDetail key={scream.screamId} scream={scream}/> // screamDetail ini sperti komponen card list
                    // <p key={i}>{scream.body}</p>
                )
            })
        ) : 
        <ScreamSkeleton/>
        // <p>Loading...</p>

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
                        <Profile/>
                    </Grid>
                </Grid>
            </div>
        )
    
}

export default Home
