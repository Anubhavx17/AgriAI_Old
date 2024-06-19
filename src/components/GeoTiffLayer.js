import { useEffect, useRef } from "react";
import proj4 from "proj4";
import { useLeafletContext } from "@react-leaflet/core";
import { useMap } from "react-leaflet";
import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";

window.proj4 = proj4;

const GeotiffLayer = ({ url, options }) => {
  const geoTiffLayerRef = useRef();
  const context = useLeafletContext();
  const map = useMap();
  const container = context.layerContainer || context.map;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const georaster = await parseGeoraster(arrayBuffer);
        
        const updatedOptions = {
          ...options,
          georaster,
          nodataValue: 0,
        };
        geoTiffLayerRef.current = new GeoRasterLayer(updatedOptions);
        container.addLayer(geoTiffLayerRef.current);
        map.fitBounds(geoTiffLayerRef.current.getBounds());
      } catch (error) {
        // Handle error
      }
    };

    fetchData();

    return () => {
      geoTiffLayerRef?.current && container?.removeLayer(geoTiffLayerRef.current);
    };
  }, [url]);

  return null;
};

export default GeotiffLayer;
