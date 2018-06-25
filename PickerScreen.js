import React, { Component } from 'react'
import SettingsList, { Header, Item } from 'react-native-settings-list'

export default class PickerScreen extends Component {
    render() {
        return <SettingsList>
            <Item 
                title="1"/>
        </SettingsList>
    }
}