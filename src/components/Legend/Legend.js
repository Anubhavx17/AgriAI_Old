import React, { useState } from "react";
import chroma from "chroma-js";
import "./Legend.css";
import { useEffect } from "react";
import '@fontsource/red-hat-display';
import PropTypes from 'prop-types';
import '@fontsource/red-hat-display';

console.log("this is legend.js"
)

const createLegendItems = (data, minValue, maxValue) => {
  if(!data || (!minValue && minValue!== 0)) return []
  if (maxValue === 0) {
    return [];
  }
  const rasterBand = data[0];
  
  var minValue = rasterBand.reduce(
    (min, value) => Math.min(min, value),
    rasterBand[0]
  );
  var maxValue = rasterBand.reduce(
    (max, value) => Math.max(max, value),
    rasterBand[0]
  );

  const numItems = 18;
  const legendItems = [...Array(numItems)].map((_, i) => {
    const value = minValue + ((maxValue - minValue) / numItems) * i;
    const nextValue = minValue + ((maxValue - minValue) / numItems) * (i + 1);
    const color = chroma
      .scale("viridis")
      .domain([minValue, maxValue])(value)
      .css();

    return {
      label: `${value.toFixed(1)} - ${nextValue.toFixed(1)}`,
      color,
    };
  });

  return legendItems;
};

const Legend = ({ data, legendString, minValue, maxValue }) => {
 
 const [legendItems, setLegendItems] = useState(null) 

function init(){
 const res = createLegendItems(data, minValue, maxValue);
 console.log({data, minValue, maxValue,res});
 setLegendItems(res)
 }

  useEffect(() => {
    init()
  }, []);

   if(!(data && legendString) || !legendItems || legendItems.length ===0 ){
    return <div className="legend" >Loading...</div>
  }

  return (
  <div className="legend" style={{ display: "flex" }}>
  <div className="legend-title" style={{ fontFamily: "Red Hat Display" }}>{legendString}</div>

  {legendItems.map((item, index) => (
    <div key={index} className="legend-item" style={{ display: "flex" }}>
      <div
        className="legend-color"
        style={{
          backgroundColor: item.color,
          fontFamily: "Red Hat Display",
        }}
      ></div>
      <div className="legend-label" style={{ fontFamily: "Red Hat Display" }}>
        {item.label}
      </div>
    </div>
  ))}

</div>

  );
};

Legend.propTypes = {
  data: PropTypes.array.isRequired,
  legendString: PropTypes.string.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
};

export default Legend;