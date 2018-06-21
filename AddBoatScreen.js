import React, { Component, PureComponent } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native'
import ClassListItem from './ClassListItem'
import MItemSelector from './MItemSelector'

import { addBoat, setNewBoatSailNumber, setNewBoatClass, setBoatClassSearch } from './Actions.js'
import { Boat } from './DataObjects.js';
import { connect } from 'react-redux'
import { boatClassesListSelector, boatClassesFilteredSelector }  from './Selectors.js'

class AddBoatScreen extends PureComponent {
    static navigationOptions = ({navigation}) => {
        let { params = {} } = navigation.state 
        let { onPressSave = () => {} }=  params 
        return {
            headerTitle: "Add Boat",
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
        props.navigation.setParams({ onPressSave: this.onPressSave })
    }

    onPressSave() {
        let boat = new Boat({
            sailNumber: this.props.sailNumber, 
            boatClassId: this.props.boatClass ? this.props.boatClass.id : ""
        })
        this.props.onSaveBoat(boat)
        this.props.onChangeSailNumber()
        this.props.onChangeClass()
        this.props.navigation.goBack()
    }

    render() {
        let pickerItems = this.props.boatClasses.map(boatClass => {
            return <Picker.Item label={boatClass.name} value={boatClass} key={boatClass.id}/>
        })
        return <View styles={styles.container}>
            <TextInput 
                style={styles.textInput}
                keyboardType="numeric"
                value={this.props.sailNumber}
                onChangeText={(text) => this.props.onChangeSailNumber(text)}
                placeholder="Sail Number"/>
            <MItemSelector
                    style={styles.autoComplete1}
                    suggestions={this.props.boatClasses}
                    searchText={this.props.boatClassSearch}
                    setSearchText={text => this.props.onChangeClassSearch(text)}
                    selectedItem={this.props.boatClass}
                    setSelectedItem={item => this.props.onChangeClass(item)}
                    renderItem={ item => <ClassListItem boatClass={item}/> }
                    itemToString={ item => item.name }
                    placeholder="Boat Class"/>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
    }, 
    textInput: {
        margin: 8,
        height: 50,
    }, 
    autoComplete1: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 50,
        zIndex: 1
    }
})

function mapStateToProps(state) {
    return {
        sailNumber: state.newBoat.sailNumber,
        boatClass: state.newBoat.boatClass,
        boatClassSearch: state.boatClassSearch,
        boatClasses: boatClassesFilteredSelector(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeSailNumber: (sailNumber) => dispatch(setNewBoatSailNumber(sailNumber)),
        onChangeClass: (boatClass) => dispatch(setNewBoatClass(boatClass)),
        onChangeClassSearch: (text) => dispatch(setBoatClassSearch(text)),
        onSaveBoat: (boat) => dispatch(addBoat(boat))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBoatScreen)