import React, {useEffect, useState } from "react";
import InputLatLng from "react-input-latlng";
import "bulma/css/bulma.css";
import "./App.css";

var foursquare = require("react-foursquare")({
  //clientID: "32GCNLUZ0KGFSX2MMXJMQGPLUBW21QQ1-----XXXXXXXX",
  clientSecret: "XWK2LKKRBJ0Z3RNETSNK-----XXXX",
});

function App() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);

      setData(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  function setData(lat, lng) {
    const LatLng = lat.toString() + "," + lng.toString();
    foursquare.venues
      .getVenues({
        ll: LatLng,
        limit: 5,
      })
      .then((res) => {
        setVenues(res.response.venues);
      });
  }

  return (
    <section className="hero is-fullheight has-background-light">
      <div className="hero-body">
        <div className="container">
          <div className="column is-8 is-offset-2">
            <h3 className="title has-text-grey has-text-centered">
              Venues Demo
            </h3>
            <div className="box">
              <div className="field">
                <label className="label">Input - Latitude, Longitude(Default is your location)</label>

                <InputLatLng
                  lat={lat}
                  lng={lng}
                  decimal={true}
                  onChange={(lat, lng) => setData(lat, lng)}
                />
              </div>

              <div className="field">
                <label className="label">Venues</label>
                <div className="control">
                  <pre>
                    {venues.map((v) => (
                      <option key={v.id}>{v.name}</option>
                    )).sort((a, b) => a[1] - b[1])}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
