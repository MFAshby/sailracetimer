import React, { Component, PureComponent } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Button } from 'react-native'
import { connect } from 'react-redux'
import Icon from './Icon.js'
import {  boatsListSelector } from './Selectors'

class BoatsList extends PureComponent {
    _keyExtractor = (boat, index) => {
        return boat.id
    }

    _renderItem = ({item}) => {
        return (
            <TouchableOpacity 
                onLongPress={() => this.props.onLongPressItem(item)}
                onPress={() => this.props.onPressItem(item)}>
                <View style={styles.listItem}>
                    <Text>{item.sailNumber}</Text>
                </View>
            </TouchableOpacity>)
    }

    render() {
        return <FlatList 
                data={this.props.boats}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}/>
    }
}

class BoatsScreen extends PureComponent {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: "Boats",
            headerRight: <Button
                title="Add"
                onPress={() => navigation.navigate('AddBoatScreen')}/>
        }
    }

    render() {
        return (
        <View style={styles.container}>
            <BoatsList       
                {...this.props}/>
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'steelblue'
    },
    listItem: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
})

function mapStateToProps(state) {
    return {
        boats: boatsListSelector(state)
    }
}

export default connect(mapStateToProps)(BoatsScreen)