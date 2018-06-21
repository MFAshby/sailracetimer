import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class MButton extends PureComponent {
    render() {
        let textStyle = this.props.textStyle ? 
            [this.props.textStyle, styles.textStyle] :
            [styles.textStyle]
        let containerStyle = this.props.style ? 
            [this.props.style, styles.containerStyle] : 
            [styles.containerStyle]

        return <TouchableOpacity
            style={containerStyle}
            onPress={this.props.onPress}>
                <Text style={textStyle}>{this.props.title.toUpperCase()}</Text>
            </TouchableOpacity>
    }
}

// Defualt button colors, 
const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#2196f3',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        margin: 4,
        elevation: 5,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold'
    }
})