import React, { Component, PureComponent } from 'react'
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input'
import MButton from './MButton'
import MItemSelector from './MItemSelector'
import { addRace, addRaceEntry, setNewRaceEntryHelm, setNewRaceEntryBoat, setNewRaceEntryHelmSearch, setNewRaceEntryBoatSearch, addNewRaceEntry, clearNewRace, removeNewRaceEntry } from './Actions.js'
import { Person, Race, RaceEntry } from './DataObjects.js';
import { connect } from 'react-redux'
import { helmFilteredPeopleSelector, boatsFilteredSelector } from './Selectors'


class RaceEntriesList extends PureComponent {
    render() {
        return <FlatList
            data={this.props.entries}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => 
                <View
                    style={styles.entryListItem}>
                    <Text>{item.helmName} {item.boatSailNumber}</Text>
                    <Button title="X" onPress={() => this.props.onPressRemove(item)}/>
                </View>}
            />
    }
}

class AddRaceScreen extends PureComponent {
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

    constructor(props) {
        super(props)
        this.onPressSave = this.onPressSave.bind(this)
        this.addRaceEntry = this.addRaceEntry.bind(this)
        props.navigation.setParams({ onPressSave: this.onPressSave })
    }

    onPressSave() {
        let race = new Race({entries: this.props.entries})
        this.props.saveNewRace(race)
        this.props.clearNewRace()
        this.props.navigation.goBack()
    }

    addRaceEntry() {
        let helmId = this.props.newEntryHelm ? this.props.newEntryHelm.id : ""
        let boatId = this.props.newEntryBoat ? this.props.newEntryBoat.id : ""
        
        let raceEntry = new RaceEntry({helmId: helmId, boatId: boatId})
        console.log("Adding race entry with helm " + raceEntry.helmName + " boat " + raceEntry.boatSailNumber)
        this.props.addNewRaceEntry(raceEntry)
    }

    render() {
        return <View>
            <View>
                <MItemSelector
                    style={styles.autoComplete1}
                    suggestions={this.props.people}
                    searchText={this.props.newEntryHelmSearch}
                    setSearchText={text => this.props.setHelmSearch(text)}
                    selectedItem={this.props.newEntryHelm}
                    setSelectedItem={(item) => this.props.setNewEntryHelm(item)}
                    itemToString={(item) => item.name}
                    placeholder="Helm name"/>
                <MItemSelector
                    style={styles.autoComplete2}
                    suggestions={this.props.boats}
                    searchText={this.props.newEntryBoatSearch}
                    setSearchText={text => this.props.setBoatSearch(text)}
                    selectedItem={this.props.newEntryBoat}
                    setSelectedItem={(item) => this.props.setNewEntryBoat(item)}
                    itemToString={(item) => item.sailNumber}
                    placeholder="Sail number"/>
                <MButton
                    style={styles.addEntryButton}
                    onPress={this.addRaceEntry}
                    title="Add"/>
            </View>
            <View style={styles.restContainer}>
                <RaceEntriesList 
                    entries={this.props.entries}
                    onPressRemove={(entry) => this.props.removeEntry(entry)}/>
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

function mapStateToProps(state) {
    return {
        entries: state.newRace.entries,
        people: helmFilteredPeopleSelector(state),
        boats: boatsFilteredSelector(state),
        newEntryHelm: state.newRace.helm,
        newEntryBoat: state.newRace.boat,
        newEntryHelmSearch: state.newRace.helmSearch,
        newEntryBoatSearch: state.newRace.boatSearch,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveNewRace: (race) => dispatch(addRace(race)),
        clearNewRace: () => dispatch(clearNewRace()),
        addNewRaceEntry: (entry) => dispatch(addNewRaceEntry(entry)),
        removeEntry: (entry) => dispatch(removeNewRaceEntry(entry)),
        setNewEntryHelm: (helm) => dispatch(setNewRaceEntryHelm(helm)),
        setNewEntryBoat: (boat) => dispatch(setNewRaceEntryBoat(boat)),
        setHelmSearch: (query) => dispatch(setNewRaceEntryHelmSearch(query)),
        setBoatSearch: (query) => dispatch(setNewRaceEntryBoatSearch(query)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRaceScreen)