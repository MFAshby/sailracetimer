import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from './Icon'

export default class BoatListItem extends PureComponent {
    render() {
        return <View style={styles.listItem}>
            <Text>{this.props.boat.sailNumber}</Text>
            <Icon 
                style={styles.listItemLogo}
                name={this.props.boat.iconName} 
                width={30} 
                height={30}/>
        </View>
    }
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
    listItemLogo: {

    }
})