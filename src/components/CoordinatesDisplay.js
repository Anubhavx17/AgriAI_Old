// CoordinatesDisplay.js
import React from "react";

const CoordinatesDisplay = ({ lat, lng }) => (
  <div className="coordinates-display">
    Lat: {lat.toFixed(6)}, Lng: {lng.toFixed(6)}
  </div>
);

export default CoordinatesDisplay;
