import React, { PureComponent } from 'react'
import Svg, {Path} from 'react-native-svg'

export default class BoatIcon extends PureComponent {
    render() {
        return (  
            <Svg width={this.props.width} height={this.props.height} viewBox="0 0 24 24">
                <Path 
                    fill={this.props.tintColor || "#000000"}
                    d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
            </Svg>
        )
    }
}

