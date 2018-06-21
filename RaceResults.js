import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { selectedRaceSelector } from './Selectors'

class RaceResults extends PureComponent {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: "Race Results"
        }
    }

    render() {
        return <FlatList
            data={this.props.race.entries}
            keyExtractor={(race) => race.id}
            renderItem={ ({item}) =>
                <View>
                    <Text>Position: {item.position}</Text>
                    <Text>Helm: {item.helmName}</Text>
                    <Text>Sail Number: {item.boatSailNumber}</Text>
                    <Text>Laps: {item.laps.length}</Text>
                    <Text>Elapsed: {item.elapsedDesc}</Text>
                    <Text>Adjusted: {item.elapsedAdjustedDesc}</Text>
                </View>
            }
            ItemSeparatorComponent={() => <View style={styles.separator}></View>}
            />
    }
}

function mapStateToProps(state) {
    return {
        race: selectedRaceSelector(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(RaceResults)

const styles = StyleSheet.create({
    separator: {
        height: 1,
        width: "100%",
        backgroundColor: "lightgrey", 
    }
})