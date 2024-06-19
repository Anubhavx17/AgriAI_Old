import { Slider } from '@material-ui/core';

const MySlider = ({ value, onChange, min, max }) => (
  <Slider
    value={value}
    min={min}
    max={max}
    onChange={onChange}
    aria-labelledby="continuous-slider"
  />
);
