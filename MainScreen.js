import React, { Component, PureComponent } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button, AsyncStorage } from 'react-native'
import Icon from './Icon.js'
import { observer, inject } from 'mobx-react'

class MainScreenButton extends PureComponent {
    render() {
        return (<TouchableOpacity
            onPress={this.props.onPress}>
            <View style={styles.cell}>
                <Icon name={this.props.iconName}/>
                <Text>{this.props.dataDescription}</Text>
            </View>
        </TouchableOpacity>)
    }
}

async function clearData() {
    await AsyncStorage.clear()
    console.log("Cleared!")
}

@inject("raceStore", "bClassStore", "boatStore", "peopleStore")
@observer
export default class MainScreen extends Component {
    static navigationOptions = {
        title: "Sail Race Timer",
        // headerRight: <Button title="Clear data" onPress={clearData}/>
    }

    render() {
        let racesCount = this.props.raceStore.races.length
        let boatClassesCount = this.props.bClassStore.boatClasses.length
        let boatsCount = this.props.boatStore.boats.length
        let peopleCount = this.props.peopleStore.people.length
        return (
        <View style={styles.container}>
            <View style={styles.row}>
                <MainScreenButton 
                    iconName='race'
                    onPress={() => this.props.navigation.navigate('RacesScreen')}
                    dataDescription={`${racesCount} Races `}/>
                <MainScreenButton
                    iconName='person'
                    onPress={() => this.props.navigation.navigate('PeopleScreen')}
                    dataDescription={`${peopleCount} People`}/>
            </View>
            <View style={styles.row}>
                <MainScreenButton
                    iconName='boat'
                    onPress={() => this.props.navigation.navigate('BoatsScreen')}
                    dataDescription={`${boatsCount} Boats`}/>
                <MainScreenButton
                    iconName='class'
                    onPress={() => this.props.navigation.navigate('ClassesScreen')}
                    dataDescription={`${boatClassesCount} Boat Classes`}/>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        alignItems: 'center',
        padding: 20,
    },
})
