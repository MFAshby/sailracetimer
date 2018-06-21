import React from "react";
import Svg, { Circle } from "react-native-svg";

const SvgComponent = props => (
  <Svg viewBox="0 0 256 256" {...props}>
    <Circle
      r={96}
      cx={128}
      cy={128}
      fill="#ff2a2a"/>
  </Svg>
);

export default SvgComponent;
