import React, { Component } from 'react'
import { Alert, StyleSheet, View, Text, FlatList, TouchableOpacity, Button } from 'react-native'
import { inject, observer } from 'mobx-react';
import BoatListItem from './BoatListItem';

// onPresssItem
// onLongPressItem
@inject("boatStore")
@observer
class BoatsList extends Component {
    _renderItem = ({item}) => {
        return (
            <TouchableOpacity 
                onLongPress={() => this.props.onLongPressItem(item)}
                onPress={() => this.props.onPressItem(item)}>
                <BoatListItem boat={item}/>
            </TouchableOpacity>)
    }

    render() {
        let boats = this.props.boatStore.boats.slice()
        return <FlatList 
                data={boats}
                keyExtractor={ boat => boat.id}
                renderItem={this._renderItem}/>
    }
}

export default class BoatsScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: "Boats",
            headerRight: <Button
                title="Add"
                onPress={() => navigation.navigate('AddBoatScreen')}/>
        }
    }

    confirmDeleteBoat = boat => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this boat?',
            [
                { text: 'No' },
                { text: 'Yes', onPress: () => boat.delete() }
            ]
        )
    }

    render() {
        return (
        <View style={styles.container}>
            <BoatsList
                onPressItem={ item => console.log("Pressed ", item) }
                onLongPressItem={ this.confirmDeleteBoat }/>
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
