import React, { Component, PureComponent } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Alert } from 'react-native'
import { connect } from 'react-redux'
import { racesListSelector } from './Selectors'
import { setSelectedRace, deleteRace } from './Actions';

class RacesList extends PureComponent {
    _keyExtractor = (race, index) => {
        return race.id
    }

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
        return <FlatList 
                data={this.props.races}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}/>
    }
}

class RacesScreen extends Component {
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

    constructor(props) {
        super(props)
        this.state = {
            confirmDeleteShowing: false,
            selectedItem: undefined,
        }
    }

    _onPressItem = (item) => {
        this.props.setSelectedRace(item)
        if (item.finish) {
            this.props.navigation.navigate('RaceResults') 
        } else {
            this.props.navigation.navigate('RunRaceScreen') 
        }
    }

    _onLongPressItem = (item) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this race?',
            [
                {text: 'No'},
                {text: 'Yes', onPress: () => this.props.deleteRace(item)},
            ]
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <RacesList 
                    onPressItem={this._onPressItem}
                    onLongPressItem={this._onLongPressItem}
                    {...this.props}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'green'
    },
    listItem: {
        height: 30,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

function mapStateToProps(state) {
    return {
        races: racesListSelector(state),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSelectedRace: race => dispatch(setSelectedRace(race)),
        deleteRace: race => dispatch(deleteRace(race))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RacesScreen)