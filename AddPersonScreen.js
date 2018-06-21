import React, { Component, PureComponent } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { addPerson, setNewPersonName } from './Actions.js'
import { Person } from './DataObjects.js';
import { connect } from 'react-redux'

class AddPersonScreen extends PureComponent {
    static navigationOptions = ({navigation}) => {
        let { params = {} } = navigation.state
        let { onPressSave = () => {} } = params 
        return {
            headerTitle: "Add Person",
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
        let person = new Person({name: this.props.name})
        this.props.onSavePerson(person)
        this.props.onChangeName()
        this.props.navigation.goBack()
    }

    render() {
        return <View styles={styles.container}>
            <TextInput 
                style={styles.textInput}
                value={this.props.name}
                onChangeText={(text) => this.props.onChangeName(text)}
                placeholder="Name"/>
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
        name: state.newPerson.name
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeName: (name) => dispatch(setNewPersonName(name)),
        onSavePerson: (person) => dispatch(addPerson(person))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPersonScreen)