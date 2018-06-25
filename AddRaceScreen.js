import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import MButton from './MButton'
import MItemSelector from './MItemSelector'
import { RaceEntry } from './RacesStore'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'

import PeopleListItem from './PeopleListItem'
import BoatListItem from './BoatListItem'

@inject("raceStore", "peopleStore", "boatStore")
@observer
export default class AddRaceScreen extends Component {
    static navigationOptions = ({navigation}) => {
        let { params = {} } = navigation.state
        let { onPressSave = () => {} } = params 
        return {
            headerTitle: "New Race",
            headerRight: (
                <Button
                    onPress={onPressSave}
                    title="Save"/>
            ),
        }
    }

    @observable entries = []
    @observable newEntryHelm = null
    @observable newEntryBoat = null

    constructor(props) {
        super(props)
        props.navigation.setParams({ onPressSave: this.onPressSave })
    }

    onPressSave = () => {
        this.props.raceStore.newRace({ entries: this.entries })
        this.props.navigation.goBack()
    }

    addRaceEntry = () => {
        let raceEntry = new RaceEntry({
            helm: this.newEntryHelm, 
            boat: this.newEntryBoat
        })
        this.entries.push(raceEntry)
        this.newEntryBoat = null
        this.newEntryHelm = null
    }

    removeEntry = (entry) => {
        this.entries.splice(this.entries.indexOf(entry), 1)
    }

    searchPeople = (text) => {
        text = text.toLowerCase()
        let people = this.props.peopleStore.people
        return people.filter(person => person.name.toLowerCase().startsWith(text))
    }

    searchBoats = (text) => {
        let boats = this.props.boatStore.boats
        return boats.filter(boat => boat.sailNumber.startsWith(text))
    }

    render() {
        
        // Need to actually access entries in order for re-render to happen
        // when entries is changed
        let entries = this.entries.slice()
        return <View>
            <View>
                <MItemSelector
                    style={ styles.autoComplete1 }
                    search={ this.searchPeople }
                    selectedItem={ this.newEntryHelm }
                    setSelectedItem={ item  => this.newEntryHelm = item }
                    renderItem={ item => <PeopleListItem person={item} />}
                    itemToString={ item => item.name }
                    placeholder="Helm name"/>
                <MItemSelector
                    style={styles.autoComplete2}
                    search={ this.searchBoats }
                    selectedItem={ this.newEntryBoat }
                    setSelectedItem={ item => this.newEntryBoat = item }
                    renderItem={ item => <BoatListItem boat={item}/> }
                    itemToString={ item => item.sailNumber}
                    placeholder="Sail number"/>
                <MButton
                    style={ styles.addEntryButton }
                    onPress={ this.addRaceEntry }
                    title="Add"/>
            </View>
            <View style={styles.restContainer}>
            <FlatList
                data={entries}
                keyExtractor={ entry => entry.id}
                renderItem={({item}) => 
                    <View
                        style={ styles.entryListItem }>
                        <Text>{item.helmName} {item.boatSailNumber}</Text>
                        <Button title="X" onPress={() => this.removeEntry(item)}/>
                    </View>}
                />
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    autoComplete1: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 80,
        top: 0,
        zIndex: 3
    },
    autoComplete2: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 80,
        top: 50,
        zIndex: 2
    },
    addEntryButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: 72,
        width: 72,
    },
    restContainer: {
        marginTop: 115,
    },
    rowLayout: {
        flexDirection: "row"
    },
    entryListItem: {
        backgroundColor: 'orange', 
        height: 50,
        flexDirection: 'row',
        alignContent: "center",
        justifyContent: 'space-between',
    }
})