import React, { Component } from 'react'
import SettingsList, { Header, Item } from 'react-native-settings-list'
import { observable } from 'mobx';
import { AsyncStorage } from 'react-native'
import { Updates } from 'expo'

export default class SettingsScreen extends Component {
    static navigationOptions = {
        title: "Settings"
    }

    @observable startMinutes = 6

    clearStorage = async () => {
        await AsyncStorage.clear()
        alert("Storage cleared!")
        Updates.reloadFromCache()
    }

    render() { 
        let startTimeDesc = `${this.startMinutes} minutes start`
        return <SettingsList>
                <Header headerText="Race Start"/>
                <Item
                    onPress={ () => this.props.navigation.navigate('PickerScreen') }
                    title={startTimeDesc}/>
                <Header headerText="Storage"/>
                <Item 
                    title="Clear storage & reload"
                    onPress={ this.clearStorage } />
            </SettingsList>
    }
}

// const styles = StyleSheet.create({
//     container: {
//         marginTop: Constants.statusBarHeight
//     }
// })