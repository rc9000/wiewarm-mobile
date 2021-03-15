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
        var sel = (
            <select value={this.props.sortBy} name="sortBySelect" onChange={this.handleChange}>
            <option value="SORT_DATE">nach Datum</option>
            <option value="SORT_DIST">nach Dischtanz</option>
            </select>
        );

        if (!this.props.isGeolocationAvailable){
            
            return(        
                <p>
                <em>Dä Browser cha ke Geolocation</em>
                    {sel}
                </p>
            )

        } else if (!this.props.isGeolocationEnabled){
            this.props.onSortByChange({"target": {"value": "SORT_DATE"}});
            return(        
                <p>
                <em>Geolocation isch usgschautet</em>
                {sel}
                </p>
            )

        } else if (!this.props.coords){
            return(        
                <p>
                <em>Warte uf dini Position...</em>
                {sel}
                </p>
            )


        }else{
            return (
                <p>Dini Position: lat {this.props?.coords?.latitude}, lon {this.props.coords.longitude}&nbsp; 
                enabled={this.props.isGeolocationEnabled ? 'y' : 'n'} activated={this.props.isGeolocationAvailable ? 'y' : 'n'} sort={this.props.sortBy}
                <br/>
                {sel}
                </p>
            );
        }
    }
}
                    
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 15000,
})(GeoLoc);
