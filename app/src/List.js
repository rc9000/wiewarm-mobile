import React, { useState, useEffect } from 'react';
import BadCard from "./BadCard.js";
import haversine from 'haversine-distance'
import { geolocated } from "react-geolocated";

function List(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [shortLat, setShortLat] = useState(0);
  const shortenPos = (pos) => {
    // truncate pos to 4 decimal digits aka "individual street, large buildings"
    const spos = pos.toString().replace(/^(.*)\.(....).*/, "$1.$2");
    console.log("shortpos:", pos, spos);
    return spos;
  };

  //useEffect(() => {console.log("geolocated update", props?.coords?.latitude)}, [props]);

  useEffect(() => {
    fetch("https://beta.wiewarm.ch:443/api/v1/temperature/all_current.json/0")
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        console.log("reload list", props);
        console.log("reload list shortLat", shortLat);
        result = result.filter(item => item.ortlat);

        if (props.isGeolocationEnabled && ! props.coords){
          setShortLat(46.94);
        }

        if (props.isGeolocationEnabled && props.coords){
          var userpos = {'latitude': props.coords.latitude, 'longitude': props.coords.longitude};
          setShortLat(shortenPos(props.coords.latitude));
          result = result.map(item => {
            var badpos = {'latitude': item.ortlat, 'longitude': item.ortlong} 
            item.dist = haversine(userpos, badpos);
            return item;
          });
        }

        if (props.sortBy === "SORT_DATE"){
          result.sort((a, b) => {                
            if (a.date < b.date) { return 1; }
            if (a.date > b.date) { return -1; }
            return 0;
          });
          console.log("sort_date'ed", result);

        }else if (props.sortBy === "SORT_DIST"){
          result.sort((a, b) => {                
            if (a.dist > b.dist) { return 1; }
            if (a.dist < b.dist) { return -1; }
            if (a.dist === b.dist){
                if (a.date < b.date) { return 1; }
                if (a.date > b.date) { return -1; }
            }
            return 0;
          });
          console.log("sort_dist'ed", result);
        }
        setItems(result);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
      )
    }, [
      props.sortBy, 
      shortLat
    ])

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <span>
        {items.map(item => {
          return <BadCard bad={item} dist={item.dist} key={item.badid_text + '.' + item.beckenid}/>;
        })}
        </span>
        );
      } 
    }
    
    export default geolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      onSuccess: () => console.log("succ"),
      watchPosition: true,
      isOptimisticGeolocationEnabled: true,
      userDecisionTimeout: 15000,
    })(List) 
    