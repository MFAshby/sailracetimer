import React, { Component } from 'react'
import { View, TextInput, Button, StyleSheet, Picker } from 'react-native'
import ClassListItem from './ClassListItem'
import MItemSelector from './MItemSelector'
import { inject, observer } from 'mobx-react';

@inject("boatStore", "bClassStore")
@observer
export default class AddBoatScreen extends Component {
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
        props.navigation.setParams({ onPressSave: this.onPressSave })

        this.state = {
            sailNumber: "",
            boatClass: null,
        }
    }

    onPressSave = () => {
        this.props.boatStore.newBoat({
            sailNumber: this.state.sailNumber, 
            boatClass: this.state.boatClass
        })
        this.props.navigation.goBack()
    }

    searchBoatClasses = (searchText) => {
        searchText = searchText.toLowerCase()
        let boatClasses = this.props.bClassStore.boatClasses
        return boatClasses.filter(boatClass => boatClass.name.toLowerCase().startsWith(searchText))
    }

    render() {
        return <View styles={styles.container}>
            <TextInput 
                style={styles.textInput}
                keyboardType="numeric"
                value={this.state.sailNumber}
                onChangeText={ text => this.setState({sailNumber: text}) }
                placeholder="Sail Number"/>
            <MItemSelector
                    style={ styles.autoComplete1 }
                    search={ this.searchBoatClasses }
                    selectedItem={ this.state.boatClass }
                    setSelectedItem={ item => this.setState({boatClass: item}) }
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