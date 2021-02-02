import React, { useEffect, useState } from 'react';
import axios from "../config/axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createStyles, Grid, makeStyles, Typography } from '@material-ui/core';

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

function Grade() {
    const [score, setScore] = useState(0);
    const [grade, setGrade] = useState("");
    const [error, setError] = useState({ status: false, message: "" });
    const [username, setUsername] = useState("");
    const classes = useStyles();

    useEffect(() => {
        axios.get("/auth/profile", { withCredentials: true })
            .then(res => {
                setUsername(res.data.username);
            });
    }, []);

    const calculateGrade = () => {
        axios.get(`/grade/calculate?score=${score}`, { withCredentials: true })
            .then(res => {
                setGrade(res.data.grade);
                setError({
                    status: false,
                    message: ""
                });
            })
            .catch(err => {
                setGrade("");
                setError({
                    status: true,
                    message: err?.response?.data?.message
                });
            });
    };

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    ยินดีต้อนรับ {username}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    id="filled-required"
                    label="Your score"
                    type="number"
                    error={error.status}
                    variant="filled"
                    onChange={(e) => setScore(e.target.value)}
                />
            </Grid>
            {error?.status && <Grid item xs={12}>
                <Typography variant="caption" display="block" gutterBottom color="error">
                    {error?.message}
                </Typography>
            </Grid>}
            <Grid item xs={12}>
                <Button onClick={calculateGrade} variant="contained" color="primary">
                    Calculate
                </Button>
            </Grid>
            {!error?.status && grade && <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    Your grade is {grade}
                </Typography>
            </Grid>}
        </Grid>
    );
}

export default Grade;
