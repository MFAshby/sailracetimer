import React, { Component } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import { inject } from 'mobx-react';

@inject("bClassStore")
export default class AddBoatClassScreen extends Component {
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

        this.state = {
            name: "",
            pyNumber: 1000
        }
    }

    onPressSave() {
        this.props.bClassStore.newBoatClass({name: this.state.name, 
            pyNumber: this.state.pyNumber})
        this.props.navigation.goBack()
    }

    render() {
        return <View styles={styles.container}>
            <TextInput 
                autoFocus
                style={styles.textInput}
                value={this.state.name}
                onChangeText={text => this.setState({name: text}) }
                placeholder="Name"/>
            <TextInput 
                style={styles.textInput}
                value={`${this.state.pyNumber}`}
                keyboardType="numeric"
                onChangeText={text => this.setState({pyNumber: parseInt(text)}) }
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