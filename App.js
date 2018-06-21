import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import MainScreen from './MainScreen'
import ClassesScreen from './ClassesScreen'
import PeopleScreen from './PeopleScreen'
import BoatsScreen from './BoatsScreen'
import RacesScreen from './RacesScreen'
import AddBoatClassScreen from './AddBoatClassScreen'
import AddBoatScreen from './AddBoatScreen'
import AddPersonScreen from './AddPersonScreen'
import AddRaceScreen from './AddRaceScreen'
import RunRaceScreen from './RunRaceScreen'
import RaceResults from './RaceResults'

import { connect, Provider } from 'react-redux'
import { store } from './Store'

import {} from './Loader'

const StackNav = createStackNavigator(
  {
    MainScreen: MainScreen,
    ClassesScreen: ClassesScreen,
    BoatsScreen: BoatsScreen,
    PeopleScreen: PeopleScreen,
    RacesScreen: RacesScreen,
    AddPersonScreen: AddPersonScreen,
    AddBoatClassScreen: AddBoatClassScreen,
    AddBoatScreen: AddBoatScreen,
    AddRaceScreen: AddRaceScreen,
    RunRaceScreen: RunRaceScreen,
    RaceResults: RaceResults
  },
  {
    initialRouteName: 'MainScreen'
  }
)

export default class Root extends Component {
  render() {
    return <Provider store={store}>
      <StackNav/>
    </Provider>
  }
}