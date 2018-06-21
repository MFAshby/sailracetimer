import React, { Component, PureComponent } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, Button } from 'react-native'
import Icon from './Icon.js'
import { connect } from 'react-redux'
import { racesCountSelector, peopleCountSelector, boatsCountSelector, boatClassesCountSelector } from './Selectors'

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

class MainScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: "Sail Race Timer",
            headerRight: (<Button title="Clear data" onPress={ () => AsyncStorage.clear() }/>)
        }
    }

    render() {
        return (
        <View style={styles.container}>
            <View style={styles.row}>
                <MainScreenButton 
                    iconName='race'
                    onPress={() => this.props.navigation.navigate('RacesScreen')}
                    dataDescription={`${this.props.racesCount} Races `}/>
                <MainScreenButton
                    iconName='person'
                    onPress={() => this.props.navigation.navigate('PeopleScreen')}
                    dataDescription={`${this.props.peopleCount} People`}/>
            </View>
            <View style={styles.row}>
                <MainScreenButton
                    iconName='boat'
                    onPress={() => this.props.navigation.navigate('BoatsScreen')}
                    dataDescription={`${this.props.boatsCount} Boats`}/>
                <MainScreenButton
                    iconName='class'
                    onPress={() => this.props.navigation.navigate('ClassesScreen')}
                    dataDescription={`${this.props.boatClassesCount} Boat Classes`}/>
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
  
const mapStateToProps = (state) => {
    return {
        racesCount: racesCountSelector(state),
        peopleCount: peopleCountSelector(state),
        boatsCount: boatsCountSelector(state),
        boatClassesCount: boatClassesCountSelector(state),
    }
}

export default connect(mapStateToProps)(MainScreen)