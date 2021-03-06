import React, { PureComponent } from 'react'
import Svg, {Path} from 'react-native-svg'

export default class PersonIcon extends PureComponent {
    render() {
        return (    
            <Svg 
                width={this.props.width}
                height={this.props.height}
                viewBox="0 0 24 24">
                <Path fill={this.props.tintColor || "#000000"} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </Svg>
        )
    }
}