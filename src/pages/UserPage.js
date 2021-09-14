import React,{useEffect, useState} from 'react';
import axios from 'axios';
import ScreamDetail from '../components/scream/ScreamDetail';
import StaticProfile from '../components/profile/StaticProfile';
import ScreamSkeleton from '../util/ScreamSkeleton.js';
import ProfileSkeleton from '../util/ProfileSkeleton';


//Mat UI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

//Redux Stuff
import {useDispatch,useSelector} from 'react-redux';
import {getOtherUserData} from '../redux/actions/dataActions';

const UserPage = (props) => {
    const {screams,loading} = useSelector (state => state.data);
    const [profile,setProfile] = useState(null);
    const [screamIdParam,setScreamIdParam] = useState(null);


    const dispatch = useDispatch();

    useEffect(()=>{
        //props.match.params.handle artinya mengambil nilai yang terkandung di dalam param handle
        // handle sendiri disini di ambil dari <Route exact path='/user/:handle' component={UserPage}  />
        // jika paramnya : handle berati .handle,..kalo paramnya :screamId berati .screamId
        const handle=props.match.params.handle;

        // props.match.params.screamId mengambil nilai dari  param <Route exact path='/user/:handle/scream/:screamId' component={UserPage}/>
        const screamId = props.match.params.screamId;
        if(screamId){
            setScreamIdParam(screamId)
        }
        dispatch(getOtherUserData(handle));
        axios.get(`/user/${handle}`)
            .then((res)=>{
                setProfile(res.data.user)
            })
            .catch((err)=>{
                console.log(err)
            })

    },[])
    // screamsMarkUp base coding

    // const screamsMarkup = loading ? (
    //     <p>Loading Data ...</p>
    // ) : screams === null ? (
    //     <p>No screams from this user</p>
    // ) : (
    //     screams.map(scream => {
    //         return(
    //             <ScreamDetail key={scream.screamId} scream={scream}/>
    //         )
    //     })
    // )

    const screamsMarkup = loading ? (
        <ScreamSkeleton/>
        // <p>Loading Data ...</p>
    ) : screams === null ? (  // jika screams null
        <p>No screams from this user</p>
    ) : !screamIdParam ? ( 
        // jika  screams ada isinya (not null) maka cek screamIdParam apakah ada isinya ? 
        // jika screamIdParam KOSONG maka tampilkan screamDetail
        screams.map(scream => {
            return(
                <ScreamDetail key={scream.screamId} scream={scream}/>
            )
        })
    ) : ( // Jika screamIdParam ada isinya alias TIDAK KOSONG maka tampilkan ScreamDetail beserta langsung skelaian buka jendela modalnya
        screams.map(scream => {
            if(scream.screamId !== screamIdParam)
                return <ScreamDetail key={scream.screamId} scream={scream}/>
            else return <ScreamDetail key={scream.screamId} scream={scream} openDialog/>
        })
    )

    return ( 
        <div>
            <Grid container spacing={5}>
                    <Grid item sm={8} xs={12}>
                        {screamsMarkup}
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        {profile === null ? (
                            <ProfileSkeleton/>
                            // <p>Loading profile...</p>
                        ) : (
                            <StaticProfile profile={profile}/>
                        )}
                    </Grid>
                </Grid>
        </div>
     );
}
 
export default UserPage;