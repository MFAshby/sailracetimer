import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Alert } from 'react-native'
import { inject, observer } from 'mobx-react'

@inject("raceStore")
@observer
class RacesList extends Component {
    _renderItem = ({item}) => {
        return (
            <TouchableOpacity 
                onLongPress={() => this.props.onLongPressItem(item)}
                onPress={() => this.props.onPressItem(item)}>
                <View style={styles.listItem}>
                    <Text>{item.statusDesc}</Text>
                    <Text>{item.entries.length} Entries</Text>
                </View>
            </TouchableOpacity>)
    }

    render() {
        let races = this.props.raceStore.races.slice()
        return <FlatList 
                data={ races }
                keyExtractor={ race => race.id }
                renderItem={this._renderItem}/>
    }
}

@inject("raceStore")
export default class RacesScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: "Races",
            headerRight: (
                <Button
                    onPress={() => navigation.navigate('AddRaceScreen') }
                    title="Add"/>
            ),
        }
    }

    raceSelected = (item) => {
        this.props.raceStore.selectedRace = item
        if (item.finish) {
            this.props.navigation.navigate('RaceResults') 
        } else {
            this.props.navigation.navigate('RunRaceScreen') 
        }
    }

    confirmDeleteRace = race => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this race?',
            [
                {text: 'No'},
                {text: 'Yes', onPress: () => race.delete()},
            ]
        )
    }

    render() {        
        return (
            <View style={styles.container}>
                <RacesList 
                    onPressItem={ this.raceSelected }
                    onLongPressItem={ this.confirmDeleteRace }/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'green'
    },
    listItem: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10
    }
})