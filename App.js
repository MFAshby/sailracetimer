import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'
import { Provider } from 'mobx-react'

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

import raceStore from './RacesStore'
import bClassStore from './BoatClassesStore'
import boatStore from './BoatsStore'
import peopleStore from './PeopleStore'

import { } from './FakeData'

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
    return (<Provider 
        raceStore={raceStore} 
        bClassStore={bClassStore}
        boatStore={boatStore}
        peopleStore={peopleStore}>
      <StackNav/>
    </Provider>)
  }
}