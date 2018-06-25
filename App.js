import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'
import { Provider } from 'mobx-react'
import { AppLoading } from 'expo'

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
import { raceStore, peopleStore, bClassStore, boatStore, loadStores } from './Stores'

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
      <StackNav/>
    </Provider>)
  }
}