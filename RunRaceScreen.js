import React, { Component, PureComponent } from 'react'
import { View, Text, FlatList, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import { startRace, lapEntry, finishEntry } from './Actions'
import { selectedRaceSelector } from './Selectors'
import { validStartRace, validLapEntry, validFinishEntry } from './Validation';

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

class Entry extends PureComponent {
    render() {
        let validLap = validLapEntry(this.props.race, this.props.entry)
        let validFinish = validFinishEntry(this.props.race, this.props.entry, new Date())
        return <View style={styles.listItem}>
                <Text>Helm: {this.props.entry.helmName}</Text>
                <Text>Sail: {this.props.entry.boatSailNumber}</Text>
                <Text>Laps: {this.props.entry.laps.length}</Text>
                <Elapsed elapsedDesc={() => this.props.entry.elapsedDesc}/>
                <Button 
                    title="Lap" 
                    onPress={this.props.onPressLap}
                    disabled={!validLap}/>
                <Button 
                    title="Finish" 
                    onPress={this.props.onPressFinish}
                    disabled={!validFinish}/>
            </View>
    }
}

class RunRaceScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: "Race in Progress"
        }
    }

    render() {
        if (!this.props.race) {
            return <Text>No race selected</Text>
        }
        let race = this.props.race
        let raceId = this.props.race.id
        let validStart = validStartRace(this.props.race)
        return <View>
            <Elapsed elapsedDesc={() => this.props.race.elapsedDesc}/>
            <Button 
                title="Start" 
                onPress={ () => this.props.startRace(race) }
                disabled={!validStart}/>
            <FlatList
                data={this.props.race.entries}
                keyExtractor={entry => entry.id}
                renderItem={ ({item}) => 
                    <Entry 
                        race={race}
                        entry={item}
                        onPressLap={(entry) => this.props.lapEntry(race, item)}
                        onPressFinish={(entry) => this.props.finishEntry(race, item)} /> 
                }/>
        </View>
    }
}

function mapStateToProps(state) {
    return {
        race: selectedRaceSelector(state),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        startRace: (race) => dispatch(startRace(race)),
        lapEntry: (race, entry) => dispatch(lapEntry(race, entry)),
        finishEntry: (race, entry) => dispatch(finishEntry(race, entry))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunRaceScreen)

const styles = StyleSheet.create({
    listItem: {
        padding: 5,
        alignItems: 'flex-start',
    }
})