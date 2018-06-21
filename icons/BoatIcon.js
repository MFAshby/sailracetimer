import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Svg, {G, Circle, Path} from 'react-native-svg'

export default class BoatIcon extends PureComponent {
    render() {
        return (            
            <Svg
                width={this.props.width}
                height={this.props.height}
                viewBox="0 0 256 256"
                version="1.1"
                id="svg4601">
                <G
                    id="layer1"
                    transform="translate(-1.0496591,-7.207054)">
                    <G
                    id="g4830"
                    transform="matrix(1.2469334,0,0,1.2906187,-62.324693,5.2434256)"
                    style="fill:#000000;fill-opacity:1;stroke:none">
                    <Path
                        id="path3691"
                        d="m 128.26483,170.32383 c 0,0 -106.171235,-43.58263 42.27187,-132.058423 0,0 -232.659157,68.486773 -42.27187,132.058423 z"
                        style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.22938222px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
                    <Path
                        id="path4498"
                        d="m 91.23595,166.06387 c 0,0 15.90171,-110.099678 121.41754,-161.5468297 0,0 -35.56301,81.2631307 -31.63075,143.5239397 -3.93226,-0.65538 -41.61648,-4.91533 -89.78679,18.02289 z"
                        style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.22938222px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
                    </G>
                    <Path
                    style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.2582075px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
                    d="M 7.6267087,219.87741 254.39933,219.13967 c 0,0 9.59056,89.63489 -246.7726213,0.73774 z"
                    id="path5156"/>
                </G>
            </Svg>
        )
    }
}

