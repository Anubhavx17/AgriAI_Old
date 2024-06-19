import React, { useState, useRef, useEffect } from "react";
import { styled } from "@mui/system";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

const CustomSlider = styled(Slider)({
  color: "#4CD159", // Changes the color of the track and thumb
  height: 4, // Changes the height of the track
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#4CD159",
    border: "2px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(76, 185, 99, 0.16)", // Changes the shadow color on hover
    },
    "&.Mui-focusVisible": {
      // Correct class for the thumb focus, without a space
      boxShadow: "none", // Remove the focus ring
    },
  },
  "& .MuiSlider-track": {
    height: 3, // Makes the track thinner
  },
  "& .MuiSlider-rail": {
    color: "rgba(255, 255, 255, 0.48)", // Changes the color of the rail
    height: 4, // Matches the track height
    opacity: 1,
  },
});

function CustomizedSlider({ setMainSliderValue }) {
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    setMainSliderValue(sliderValue); // Update the value in the parent component whenever sliderValue changes
  }, [sliderValue, setMainSliderValue]);

  return (
    <Box
      sx={{
        position: "absolute",
        width: "320px", // Increased width to accommodate both slider and value display
        height: 0,
        left: 30,
        top: "170px",
        display: "flex", // Added to align slider and value display horizontally
      }}
    >
      <Box sx={{ width: "270px" }}>
        {" "}
        {/* Container for the slider with fixed width */}
        <CustomSlider
          defaultValue={0}
          min={0}
          max={100}
          aria-label="Default"
          valueLabelDisplay="off"
          onChange={(event, newValue) => setSliderValue(newValue)} // Updates the state variable when the slider value changes
        />
      </Box>
      <Box
        sx={{
          width: "30px",
          marginLeft: "16px",
          marginTop: "3px", // Decrease the top of the box by 10px
          fontFamily: "Red Hat Display",
          color: "white",
        }}
      >
        {sliderValue}%
      </Box>
    </Box>
  );
}

export default CustomizedSlider;
