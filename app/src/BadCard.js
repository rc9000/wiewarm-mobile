import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { geolocated } from "react-geolocated";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 2,
  },
});

function BadCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.bad.bad} {props.bad.ort}, xx km von hier
        </Typography>
        <Typography variant="h5">
            {props.bad.becken} {props.bad.temp}&deg; 
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
            Stand {props.bad.date_pretty}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Mehr</Button>
      </CardActions>
    </Card>
  );
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 15000,
})(BadCard);