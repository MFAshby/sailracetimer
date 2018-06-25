import React, { Component } from 'react'
import SettingsList, { Header, Item } from 'react-native-settings-list'
import { observable } from 'mobx';

export default class SettingsScreen extends Component {
    static navigationOptions = {
        title: "Settings"
    }

    @observable startMinutes = 6

    render() { 
        let startTimeDesc = `${this.startMinutes} minutes start`
        return <SettingsList>
                <Header headerText="Race Start"/>
                <Item
                    onPress={ () => this.props.navigation.navigate('PickerScreen') }
                    title={startTimeDesc}/>
            </SettingsList>
    }
}

// const styles = StyleSheet.create({
//     container: {
//         marginTop: Constants.statusBarHeight
//     }
// })