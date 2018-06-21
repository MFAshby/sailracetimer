import React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = props => (
  <Svg width="256mm" height="256mm" viewBox="0 0 256 256" {...props}>
    <Path
      d="M54.711 16.207h143.492v25.84H85.416v67.187h108.075v25.84H85.416v82.234H200.94v25.84H54.71z"
      aria-label="E"
      fontWeight={400}
      fontSize={311.303}
      fontFamily="sans-serif"
      letterSpacing={0}
      wordSpacing={0}
      strokeWidth={7.783}
    />
  </Svg>
);

export default SvgComponent;
