import { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "420px",
};

const center = {
  lat: 22.356852,
  lng: 91.78318,
};

const GoogleLocationMap = () => {
  const [showInfo, setShowInfo] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_APIKEY,
  });

  if (loadError) {
    return <p>Google Maps failed to load.</p>;
  }

  return (
    <section>
      <div className="text-center mb-6">
        <h2 className="text-4xl mb-2 text-green-600 font-bold">Our Location</h2>
      </div>

      {isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
          <Marker
            position={center}
            title="Current location"
            onClick={() => setShowInfo(true)}
          />

          {showInfo && (
            <InfoWindow
              position={center}
              onCloseClick={() => setShowInfo(false)}
            >
              <div>
                <p>Current location</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      ) : (
        <p className="text-center">Loading map...</p>
      )}
    </section>
  );
};

export default GoogleLocationMap;
