import React from "react";
import { geolocated } from "react-geolocated";
 
class GeoLoc extends React.Component {
    render() {
        return !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div>Geolocation isch usgschautet</div>
        ) : this.props.coords ? (
            <p>Dini Position: lat {this.props.coords.latitude}, lon {this.props.coords.longitude} </p>

        ) : (
            <div>Getting the location data&hellip; </div>
        );
    }
}
 
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 15000,
})(GeoLoc);