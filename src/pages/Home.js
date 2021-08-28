import React, { useEffect,useState } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import ScreamDetail from '../components/ScreamDetail';

const Home = () => {

    const [screams,setScreams] = useState(null)

        useEffect(()=>{
            const getData = async () => {
                try{
                    const response = await axios.get('/screams');
                    // const data = await response.json();
                    setScreams(response.data);
                    console.log('liat screams', screams);
                }
                catch(err){
                    console.log(err);
                }
            };
            getData();
        },[])
        console.log('liat screams', screams);

        let recentScreamsMarkup = screams ? (
            screams.map((scream)=>{
                return (
                    <ScreamDetail key={scream.screamId} scream={scream}/>
                    // <p key={i}>{scream.body}</p>
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

export default Home
