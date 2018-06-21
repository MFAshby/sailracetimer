import React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = props => (
  <Svg width="256mm" height="256mm" viewBox="0 0 256 256" {...props}>
    <Path
      d="M168.713 145.834C4.073 191.984 4.073 138.35 1.89 118.082c.624-19.644 11.537-66.417 165.264-23.074l-19.645 5.924L253.528 121.2l-104.772 18.398z"
      fill="#ff7f2a"
      strokeWidth={0.873}
    />
  </Svg>
);

export default SvgComponent;
