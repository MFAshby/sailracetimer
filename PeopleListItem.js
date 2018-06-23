import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

export default class PeopleListItem extends Component {
    render() {
        let person = this.props.person
        return <View style={styles.listItem}>
                <Text>{person.name}</Text>
                <Image source={ {uri: person.imageUri, width: 40, height: 40} } />
            </View>
    }
}

const styles = StyleSheet.create({
    listItem: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10
    }
})
