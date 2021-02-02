import { createStyles, Grid, makeStyles, Typography } from '@material-ui/core';
import axios from '../config/axios';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            height: 140,
            width: 100,
        },
        control: {
            padding: theme.spacing(2),
        },
    }),
);


function Profile() {
    const [profile, setProfile] = useState({});
    const classes = useStyles();

    useEffect(() => {
        axios.get("/auth/profile", { withCredentials: true })
            .then(res => {
                setProfile(res.data);
            });
    }, []);

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    Username: {profile.username}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    Firstname: {profile.name}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    Lastname: {profile.surname}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    Birthday: {profile.birthday}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default Profile;
