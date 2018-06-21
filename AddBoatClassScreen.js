import React, { Component } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { setNewBoatClassName, setNewBoatClassPyNumber, addBoatClass } from './Actions.js'
import { BoatClass } from './DataObjects.js';
import { connect } from 'react-redux'

class AddBoatClassScreen extends Component {
    static navigationOptions = ({navigation}) => {
        let { params = {} } = navigation.state 
        let { onPressSave = () => {} }=  params 
        return {
            headerTitle: "Add Boat Class",
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
        let boatClass = new BoatClass({name: this.props.name, pyNumber: this.props.pyNumber})
        this.props.onSaveBoatClass(boatClass)
        // Reset defaults
        this.props.onChangeName()
        this.props.onChangePyNumber()
        this.props.navigation.goBack()
    }

    render() {
        return <View styles={styles.container}>
            <TextInput 
                style={styles.textInput}
                value={this.props.name}
                onChangeText={(text) => this.props.onChangeName(text)}
                placeholder="Name"/>
            <TextInput 
                style={styles.textInput}
                value={`${this.props.pyNumber}`}
                keyboardType="numeric"
                onChangeText={(text) => this.props.onChangePyNumber(parseInt(text))}
                placeholder="Portsmouth Yardstick Number"/>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
    }, 
    textInput: {
        margin: 8,
        height: 50,
    }
})

function mapStateToProps(state) {
    return {
        name: state.newBoatClass.name,
        pyNumber: state.newBoatClass.pyNumber
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeName: (name) => dispatch(setNewBoatClassName(name)),
        onChangePyNumber: (pyNumber) => dispatch(setNewBoatClassPyNumber(pyNumber)),
        onSaveBoatClass: (boatClass) => dispatch(addBoatClass(boatClass))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBoatClassScreen)