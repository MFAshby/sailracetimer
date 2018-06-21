import { addFakeData } from './FakeData.js'
import { loadData, addPerson, addBoatClass, addBoat, addRace } from './Actions.js'
import { AsyncStorage } from 'react-native'
import { racesCountSelector } from './Selectors'
import { store } from './Store'
import _ from 'lodash'
import { Person, BoatClass, Race, Boat, RaceEntry } from './DataObjects.js'
import DefaultClasses from './DefaultClasses'
import { listToObjectById, putInObjectByID, addObjById } from './Utils'

const DATA_STORAGE_KEY = "SailRaceTimerData"

function defaultData() {
    return {
        boatClasses: listToObjectById(DefaultClasses)
    }
}

function dataToSaveSelector(state) {
    return {
        races: state.races,
        people: state.people,
        boats: state.boats,  
        boatClasses: state.boatClasses,    
    }
}

function restoreStateActions(savedData) {
    let { people = {}, boatClasses = {}, boats = {}, races = {} } = savedData

    let peopleActions = Object.values(people)
        .map(personData => Person.fromJson(personData))
        .map(person => addPerson(person))

    let bClassActions = Object.values(boatClasses)
        .map(boatClassData => BoatClass.fromJson(boatClassData))
        .map(boatClass => addBoatClass(boatClass))

    let boatActions = Object.values(boats)
        .map(boatData => Boat.fromJson(boatData))
        .map(boat => addBoat(boat))

    let raceActions = Object.values(races)
        .map(racesData => Race.fromJson(racesData))
        .map(race => addRace(race))
    return [...peopleActions, ...bClassActions, ...boatActions, ...raceActions]
}


function startSaving() {
    var prevData = undefined
    store.subscribe(function() {  
        let state = store.getState()
        let data = dataToSaveSelector(state)

        // Compare to previous data before setting
        if (!_.isEqual(prevData, data)) {
            prevData = data
            AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data))
                .then(() => console.log("Saved changes"))
                .catch((reason) => console.log("Failed to save changes " + reason))
        }
    })
}

AsyncStorage.getItem(DATA_STORAGE_KEY)
    .then((dataString) => {
        let data = dataString ? JSON.parse(dataString) : {}
        Object.assign(data, defaultData())

        let actions = restoreStateActions(data)
        actions.forEach(action => store.dispatch(action))

        startSaving()
    })
    .catch((reason) => {
        alert("Failed to load data: " + reason)
    })

export {
    dataToSaveSelector,
    restoreStateActions
}