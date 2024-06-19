import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useRef, useEffect } from "react";

const CustomSearchInput = ({ map }) => {
  const searchInputRef = useRef();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: "bar",
      showMarker: true,
      showPopup: true,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      customContainer: searchInputRef.current,
      placeholder: "Search for a location",
    });

    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return <div ref={searchInputRef} />;
};
export default CustomSearchInput;
