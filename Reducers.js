import { 
    SET_NEW_BOAT_CLASS_NAME, 
    SET_NEW_BOAT_CLASS_PY_NUMBER, 
    SET_NEW_PERSON_NAME,
    SET_NEW_BOAT_SAIL_NUMBER,
    ADD_BOAT_CLASS,
    ADD_BOAT,
    ADD_PERSON,
    ADD_RACE, 
    SET_NEW_BOAT_CLASS,
    SET_NEW_RACE_ENTRY_BOAT,
    SET_NEW_RACE_ENTRY_HELM,
    SET_NEW_RACE_ENTRY_BOAT_SEARCH,
    SET_NEW_RACE_ENTRY_HELM_SEARCH,
    CLEAR_NEW_RACE,
    ADD_NEW_RACE_ENTRY,
    REMOVE_NEW_RACE_ENTRY,
    SET_BOAT_CLASS_SEARCH,
    SET_SELECTED_RACE,
    DELETE_RACE,
    START_RACE,
    LAP_ENTRY,
    FINISH_ENTRY
} from './Actions.js'

import { addObjById, putInObjectByID } from './Utils'
import _ from 'lodash'

const initialState = {
    // Data state (should be loaded from file or database some time)
    races: {},
    people: {},
    boats: {},
    boatClasses: {},

    // UI state
    loading: true,
    newBoatClass: undefined,
    newPerson: undefined,
    newBoat: undefined,
    newRace: undefined,
 
    boatClassSearch: "",
    selectedRaceId: "",
}

const initialNewBoatState = {
    sailNumber: "",
    boatClass: null,
}

function newBoatReducer(state = initialNewBoatState, action) {
    switch (action.type) {
        case SET_NEW_BOAT_SAIL_NUMBER:
            return Object.assign({}, state, {sailNumber: action.sailNumber})
        case SET_NEW_BOAT_CLASS:
            return Object.assign({}, state, {boatClass: action.boatClass})
        default: 
            return state
    }
}

const initialNewPersonState = {
    name: ""
}
function newPersonReducer(state = initialNewPersonState, action) {
    switch(action.type) {
        case SET_NEW_PERSON_NAME:
            return Object.assign({}, state, { name: action.name })
        default:
            return state
    }
}

const initialNewBoatClassState = {
    name: "",
    pyNumber: 1000,
    iconName: "",
}

function newBoatClassReducer(state = initialNewBoatClassState, action) {
    switch (action.type) {
        case SET_NEW_BOAT_CLASS_NAME:
            return Object.assign({}, state, { name: action.name })
        case SET_NEW_BOAT_CLASS_PY_NUMBER:
            return Object.assign({}, state, { pyNumber: action.pyNumber })
        default:
            return state
    }
}

const initialNewRaceState = {
    // For adding an entry
    boatSearch: "",
    helmSearch: "",
    boat: null,
    helm: null,

    // All the entries we added
    entries: [],
}

function newRaceReducer(state = initialNewRaceState, action) {
    switch (action.type) {
        case ADD_NEW_RACE_ENTRY:
            // Clear the search boxes at the same time
            return Object.assign({}, state, { 
                    entries: [action.entry, ...state.entries] ,
                    boatSearch: "", 
                    helmSearch: "",
                    boat: null,
                    helm: null
                })
        case REMOVE_NEW_RACE_ENTRY:
            return Object.assign({}, state, { entries: state.entries.filter(entry => entry !== action.entry) })
        case CLEAR_NEW_RACE:
            return Object.assign({}, state, { entries :[]} )
        case SET_NEW_RACE_ENTRY_BOAT_SEARCH:
            return Object.assign({}, state, {boatSearch: action.search})
        case SET_NEW_RACE_ENTRY_HELM_SEARCH:
            return Object.assign({}, state, {helmSearch: action.search})
        case SET_NEW_RACE_ENTRY_BOAT:
            return Object.assign({}, state, {boat: action.boat})
        case SET_NEW_RACE_ENTRY_HELM:
            return Object.assign({}, state, {helm: action.helm})
        default: 
            return state            
    }
}

function raceActionReducer(race, action) {
    let newRace = _.cloneDeep(race)
    switch (action.type) {
        case START_RACE:
            newRace.start = action.start
            return newRace
        case LAP_ENTRY:
            var entry = newRace.findEntry(action.entryId)
            if (!entry) {
                return race
            }
            entry.laps.push(action.lapTime)
            return newRace
        case FINISH_ENTRY:
            var entry = newRace.findEntry(action.entryId)
            if (!entry) {
                return race
            }
            entry.finish = action.finishTime
            return newRace
        default: 
            return race
    }
}

function mainReducer(state = initialState, action) {
    // Apply other reducers
    state = Object.assign({}, state, {
        newBoatClass: newBoatClassReducer(state.newBoatClass, action),
        newPerson: newPersonReducer(state.newPerson, action),
        newBoat: newBoatReducer(state.newBoat, action),
        newRace: newRaceReducer(state.newRace, action),
    })

    switch (action.type) {
        case ADD_BOAT_CLASS: 
            return Object.assign({}, state, 
                { boatClasses: addObjById(state.boatClasses, action.boatClass)})
        case ADD_BOAT: 
            return Object.assign({}, state, 
                { boats: addObjById(state.boats, action.boat)})
        case ADD_PERSON: 
            return Object.assign({}, state, 
                { people: addObjById(state.people, action.person)})
        case ADD_RACE: 
            return Object.assign({}, state, 
                { races: addObjById(state.races, action.race)})
        case SET_BOAT_CLASS_SEARCH:
            return Object.assign({}, state, { boatClassSearch: action.search })
        case SET_SELECTED_RACE: 
            return Object.assign({}, state, { selectedRaceId: action.race.id })
        case DELETE_RACE:
            return Object.assign({}, state, { races: _.omitBy(state.races, race => race.id === action.race.id)})
        case START_RACE:
        case LAP_ENTRY:
        case FINISH_ENTRY:
            let race = state.races[action.raceId]
            if (!race) {
                return state
            }
            let newRace = raceActionReducer(race, action)
            return Object.assign({}, state, { races: addObjById(state.races, newRace) })
        default:
            return state
    }
}

export {
    mainReducer
}