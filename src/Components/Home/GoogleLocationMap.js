import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const containerStyle = {
    width: '100%',
    height: '60%'
}

class GoogleLocationMap extends Component {
    render() {
        return (
            <section className='pb-[460px]'>
                <div className='text-center mb-6'>
                    <h2 className='text-4xl mb-2 text-orange-500 font-bold'>Our Location</h2>
                    <h4 className='text-2xl'>Our location is available on google map</h4>
                </div>
                <div className="">
                    <Map containerStyle={containerStyle} google={this.props.google} zoom={14}>

                        <Marker onClick={this.onMarkerClick}
                            name={'Current location'} />

                        <InfoWindow onClose={this.onInfoWindowClose}>
                        </InfoWindow>
                    </Map>
                </div>
            </section>
        );
    };
};

export default GoogleApiWrapper({
    apiKey: ("AIzaSyCT9VxlQ6qaHeGSG7JyBTlVXbtwZ4rkcFM")
})(GoogleLocationMap)