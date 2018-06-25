import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import { Provider, observer } from 'mobx-react'
import { AppLoading } from 'expo'

import Icon from './Icon'
import { Ionicons } from '@expo/vector-icons'
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
import { raceStore, peopleStore, bClassStore, boatStore, loadStores } from './Stores'
import SettingsScreen from './SettingsScreen'
import PickerScreen from './PickerScreen'

const ClassesStack = createStackNavigator({
  Home: ClassesScreen,
  AddBoatClassScreen: AddBoatClassScreen,
})

const BoatsStack = createStackNavigator({
  Home: BoatsScreen,
  AddBoatScreen: AddBoatScreen
})

const PeopleStack = createStackNavigator({
  Home: PeopleScreen,
  AddPersonScreen: AddPersonScreen
})

const RacesStack = createStackNavigator({
  Home: RacesScreen,
  AddRaceScreen: AddRaceScreen,
  RunRaceScreen: RunRaceScreen,
  RaceResults: RaceResults,
})

const SettingsStack = createStackNavigator({
  Home: SettingsScreen,
  PickerScreen: PickerScreen,
})

const TabNav = createBottomTabNavigator({
  RacesStack: {
    screen: RacesStack,
    navigationOptions: () => ({
      title: `${raceStore.racesCount} Races`,
      tabBarIcon: ({tintColor}) => <Icon name="race" width={64} height={64} tintColor={tintColor}/>
    })
  },
  PeopleStack: {
    screen: PeopleStack,
    navigationOptions: () => ({
      title: `${peopleStore.people.length} People`,
      tabBarIcon: ({tintColor}) => <Icon name="person" width={32} height={32} tintColor={tintColor}/>
    })
  },
  BoatsStack: {
    screen: BoatsStack,
    navigationOptions: () => ({
      title: `${boatStore.boats.length} Boats`,
      tabBarIcon: ({tintColor}) => <Icon name="boat" width={32} height={32} tintColor={tintColor}/>
    })
  },
  ClassesStack: {
    screen: ClassesStack,
    navigationOptions: () => ({
      title: `${bClassStore.boatClasses.length} Classes`,
      tabBarIcon: ({tintColor}) => <Icon name="class" width={32} height={32} tintColor={tintColor}/>
    })
  },  
  SettingsStack: {
    screen: SettingsStack,
    navigationOptions: {
      title: "Settings",
      tabBarIcon: ({tintColor}) => <Ionicons name="md-settings" size={32} color={tintColor}/>
    }
  }
}, {
  tabBarComponent: observer(BottomTabBar)
})

export default class Root extends Component {
  state = {
    loading: true
  }

  render() {
    if (this.state.loading) {
      return <AppLoading
        startAsync={ loadStores }
        onFinish={() => this.setState({loading: false})}
        onError={alert}/>
    }

    return (<Provider 
        raceStore={raceStore} 
        bClassStore={bClassStore}
        boatStore={boatStore}
        peopleStore={peopleStore}>
      <TabNav/>
    </Provider>)
  }
}