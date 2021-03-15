import React from "react";
import { geolocated } from "react-geolocated";
 
class GeoLoc extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    };
    
    handleChange(e) {
        console.log(e.target.name, e.target.value)
        this.props.onSortByChange(e);  
    };

    render() {
        return !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div>Geolocation isch usgschautet</div>
        ) : this.props.coords ? (
            <p>Dini Position: lat {this.props?.coords?.latitude}, lon {this.props.coords.longitude}&nbsp; 
                enabled={this.props.isGeolocationEnabled ? 'y' : 'n'} activated={this.props.isGeolocationAvailable ? 'y' : 'n'} sort={this.props.sortBy}
                <br/>
                <select value={this.props.sortBy} name="sortBySelect" onChange={this.handleChange}>
                    <option value="SORT_DATE">nach Datum</option>
                    <option value="SORT_DIST">nach Witwäg</option>
                </select>
            </p>

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