import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router, Switch, Route, Link,
    useRouteMatch, useParams, useHistory
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function BadDetail(props) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [bad, setBad] = useState({});
    const [error, setError] = useState(null);
    let { badidText } = useParams();
    let url = "https://beta.wiewarm.ch/api/v1/bad/" + badidText;
    const history = useHistory();

    const fun2 = ((b) => {
        console.log("b---------", b);
        //console.log("b---------", b, Object.getOwnPropertyNames(b));
        var becken = [ (<p key="1">{JSON.stringify(b["Ka-We-De"])}</p>) ];
        return (<p>balls {JSON.stringify(b)}</p>);

        var bjsx = Object.getOwnPropertyNames(b).map((k) => (
            
            <h2>{b[k].beckenname} {b[k].temp}&deg;</h2>
        
        ));
        becken.push(bjsx);

        return becken;

    });

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setBad(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Grid container spacing={1} alignItems="center" justify="center">
                <Grid item xs={12}>
                    <h1> {bad.badname}, {bad.plz} {bad.ort} </h1>

                        {/*
                       {Object.entries(bad?.becken).map((k, v) => {     
                            console.log(k);                 
                            return (<p>{k}</p>) ;           
                        })};
                    */}

                    {fun2(bad.becken)};

                    <Button onClick={() => { history.push("/"); }} variant="contained" size="large" color="primary">
                        Zrügg zur Lischte
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default BadDetail;
