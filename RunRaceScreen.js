import React, { Component, PureComponent } from 'react'
import { View, Text, FlatList, StyleSheet, Button } from 'react-native'
import { validStartRace, validLapEntry, validFinishEntry } from './Validation'
import { inject, observer } from 'mobx-react'

class Elapsed extends Component {
    componentDidMount() {
        this._interval = setInterval(() => this.forceUpdate(), 100)
    }

    componentWillUnmount() {
        clearInterval(this._interval)
    }

    render() {
        return <Text>{this.props.elapsedDesc()}</Text>
    }
}

@observer
class Entry extends Component {
    render() {
        let entry = this.props.entry
        let validLap = validLapEntry(entry)
        let validFinish = validFinishEntry(entry, new Date())
        return <View style={styles.listItem}>
                <Text>Helm: {entry.helmName}</Text>
                <Text>Sail: {entry.boatSailNumber}</Text>
                <Text>Laps: {entry.laps}</Text>
                <Elapsed elapsedDesc={ () => entry.elapsedDesc }/>
                <Button 
                    title="Lap" 
                    onPress={ () => entry.addLap() }
                    disabled={ !validLap }/>
                <Button 
                    title="Finish" 
                    onPress={ () => entry.setFinished() }
                    disabled={ !validFinish }/>
            </View>
    }
}

@inject("raceStore")
@observer
export default class RunRaceScreen extends Component {
    static navigationOptions = {
        title: "Race in Progress"
    }

    render() {
        let race = this.props.raceStore.selectedRace
        if (!race) {
            return <Text>No race selected</Text>
        }

        // Ensure we access the @observable property race.entries
        let entries = race.entries.slice()

        return <View style={ styles.container }>
            <Elapsed elapsedDesc={() => race.elapsedDesc}/>
            <Button 
                title="Start" 
                onPress={ () => race.start = new Date() }
                disabled={ !validStartRace(race) }/>
            <FlatList
                data={ entries }
                keyExtractor={ entry => entry.id }
                renderItem={ ({item}) => 
                    <Entry entry={ item }/> 
                }/>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listItem: {
        padding: 5,
        alignItems: 'flex-start',
    }
})