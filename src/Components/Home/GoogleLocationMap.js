import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import React, { Component } from "react";

const containerStyle = {
  width: "100%",
  height: "60%",
};

class GoogleLocationMap extends Component {
  render() {
    return (
      <section className="pb-[380px]">
        <div className="text-center mb-6">
          <h2 className="text-4xl mb-2 text-orange-500 font-bold">
            Our Location
          </h2>
        </div>
        <div className="">
          <Map
            containerStyle={containerStyle}
            google={this.props.google}
            zoom={14}
            initialCenter={{
              lat: 22.356852,
              lng: 91.78318,
            }}
          >
            <Marker onClick={this.onMarkerClick} name={"Current location"} />

            <InfoWindow onClose={this.onInfoWindowClose}></InfoWindow>
          </Map>
        </div>
      </section>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_APIKEY,
})(GoogleLocationMap);
