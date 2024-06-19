import React, { useState } from "react";
import chroma from "chroma-js";
import { FcSettings } from "react-icons/fc";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

const ColorBar = ({ minValue, maxValue, color, legendString }) => {
  const numColors = 8;
  const colorScale = chroma.scale(color).domain([minValue, maxValue]);
  const colors = Array.from({ length: numColors }, (_, index) => {
    const value = minValue + ((maxValue - minValue) * index) / (numColors - 1);
    return colorScale(value).hex();
  });
  const [discreteMode, setDiscreteMode] = useState(false);
  const toggleMode = () => {
    setDiscreteMode(!discreteMode);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        zIndex: 2000,
        display: "flex",
        flexFlow: "column",
        position: "absolute",
        left: "30px",
        bottom: 20,
        fontFamily: "Arial, sans-serif",
        alignItems: "center",
        padding: "5px",
        width: "380px",
        height: "40px",
        marginLeft: "10px",
        paddingRight: "10px",
        paddingTop: "10px",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "17px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          onClick={toggleMode}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            borderRadius: "50%",
            outline: "none",
            color: "pink",
          }}
        >
          <FcSettings style={{ fontSize: "22px" }} />
        </Button>
        {!discreteMode ? (
          colors.map((color, index) => (
            <div
              key={index}
              style={{
                backgroundColor: color,
                flex: "1",
                height: "100%",
                margin: "0",
              }}
            ></div>
          ))
        ) : (
          <div
            style={{
              flex: "1",
              height: "100%",
              backgroundImage: `linear-gradient(to right, ${colors.join(
                ", "
              )})`,
            }}
          ></div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "9px",
          fontFamily: "Red Hat Display",
          fontSize: "10px",
          marginLeft: "37px",
          marginRight: "20px",
          fontWeight: "bold",
          color: "black",
          width: "340px",
          marginLeft: "73px",
        }}
      >
        {[...Array(8)].map((_, index) => {
          const value = minValue + (index * (maxValue - minValue)) / 7;
          const formattedValue = value.toFixed(1);

          return (
            <div key={index} style={{ flex: "1", textAlign: "center" }}>
              {index === 0 ? (
                <span
                  style={{
                    display: "inline-block",
                    marginRight: "-3px",
                    transform: "translateX(-36px)",
                    fontWeight: "bold",
                  }}
                >
                  {legendString}
                </span>
              ) : null}
              <span style={{ marginLeft: index === 0 ? "-8px" : "0" }}>
                {formattedValue}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

ColorBar.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
};

export default ColorBar;
