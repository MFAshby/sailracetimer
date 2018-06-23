import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { inject, observer } from 'mobx-react'

@inject("raceStore")
@observer
export default class RaceResults extends Component {
    static navigationOptions = {
        title: "Race Results"
    }

    render() {
        let raceStore = this.props.raceStore
        let race = raceStore.selectedRace
        let entries = race.entriesOrdered.slice() // For passing to FlatList
        return <FlatList
            data={ entries }
            keyExtractor={ entry => entry.id }
            renderItem={ ({item}) =>
                <View>
                    <Text>Position: {item.position}</Text>
                    <Text>Helm: {item.helmName}</Text>
                    <Text>Sail Number: {item.boatSailNumber}</Text>
                    <Text>Laps: {item.laps}</Text>
                    <Text>Elapsed: {item.elapsedDesc}</Text>
                    <Text>Adjusted: {item.elapsedAdjustedDesc}</Text>
                </View>
            }
            ItemSeparatorComponent={() => <View style={styles.separator}></View>}
            />
    }
}

const styles = StyleSheet.create({
    separator: {
        height: 1,
        width: "100%",
        backgroundColor: "lightgrey", 
    }
})