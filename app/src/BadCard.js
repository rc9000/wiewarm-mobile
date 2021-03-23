import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { geolocated } from "react-geolocated";
import { randomArrayIndex } from './index.js'
import { BrowserRouter as Router, Switch, Route, Link, 
    useRouteMatch, useParams, useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        //minWidth: 275,
        marginBottom: "1em",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 2,
    },
    media: {
        height: "100%",
    },   

});

function BadCard(props) {
    const classes = useStyles();
  
    const [taps, setTaps] = useState(0);
    const history = useHistory();

    return (
        <Card className={classes.root} variant="outlined">
            <CardActionArea onClick={e => { 
                    console.log(e) ; 
                    history.push("/badi/" + props.bad.badid_text);
                    }}>
            <CardContent>
            <Grid container spacing={1}>
                <Grid item xs={10} sm={8}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {props.bad.bad} {props.bad.ort}, {Math.floor(props.dist)} Meter wyt wäg
                    </Typography>
                    <Typography variant="h5">
                                {props.bad.becken} {props.bad.temp}&deg;
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Aktualisiert {props.bad.date_pretty} {/*Geo {props.bad.ortlat} {props.bad.ortlong}*/}
                    </Typography>
                    {/*
                     <CardActions>
                        <Button size="small">Mehr</Button>
                    </CardActions>
                    */}
                </Grid>
                <Grid item xs={2} sm={4}>
                {props.bad?.images && props.bad.images[0] && (
                <CardMedia
                    className={classes.media}
                    image={"https://www.wiewarm.ch/img/baeder/" + props.bad.badid + "/" + props.bad.images[0]}
                    title={props.bad.bad}
                />)}
                </Grid>
                </Grid>
            </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 15000,
})(BadCard);
