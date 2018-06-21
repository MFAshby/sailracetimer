import { validAddRace, validStartRace, validLapEntry, validFinishEntry } from "./Validation";

const ADD_BOAT_CLASS = 'ADD_BOAT_CLASS'

function addBoatClass(boatClass) {
    return {
        type: ADD_BOAT_CLASS,
        boatClass: boatClass
    }
}

const ADD_PERSON = 'ADD_PERSON' 

function addPerson(person) {
    return {
        type: ADD_PERSON,
        person: person
    }
}

const ADD_BOAT = 'ADD_BOAT'

function addBoat(boat) {
    return {
        type: ADD_BOAT,
        boat: boat
    }
}

const ADD_RACE = 'ADD_RACE'

function addRace(race) {
    if (!validAddRace(race)) {
        return {}
    }
    return {
        type: ADD_RACE,
        race: race
    }
}

const SET_NEW_BOAT_CLASS_NAME = 'SET_NEW_BOAT_CLASS_NAME'

function setNewBoatClassName(name = "") {
    return {
        type: SET_NEW_BOAT_CLASS_NAME,
        name: name
    }
}

const SET_NEW_BOAT_CLASS_PY_NUMBER = 'SET_NEW_BOAT_CLASS_PY_NUMBER'

function setNewBoatClassPyNumber(pyNumber = 1000) {
    return {
        type: SET_NEW_BOAT_CLASS_PY_NUMBER,
        pyNumber: pyNumber
    }
}

const SET_NEW_PERSON_NAME = 'SET_NEW_PERSON_NAME'

function setNewPersonName(name = "") {
    return {
        type: SET_NEW_PERSON_NAME,
        name: name
    }
}

const SET_NEW_BOAT_SAIL_NUMBER = 'SET_NEW_BOAT_SAIL_NUMBER'

function setNewBoatSailNumber(sailNumber = "") {
    return {
        type: SET_NEW_BOAT_SAIL_NUMBER,
        sailNumber: sailNumber
    }
}

const SET_NEW_BOAT_CLASS = 'SET_NEW_BOAT_CLASS'

function setNewBoatClass(bClass = null) {
    return {
        type: SET_NEW_BOAT_CLASS,
        boatClass: bClass
    }
}

const SET_NEW_RACE_ENTRY_HELM = 'SET_NEW_RACE_ENTRY_HELM'

function setNewRaceEntryHelm(helm = null) {
    return {
        type: SET_NEW_RACE_ENTRY_HELM,
        helm: helm
    }
}

const SET_NEW_RACE_ENTRY_BOAT = 'SET_NEW_RACE_ENTRY_BOAT'

function setNewRaceEntryBoat(boat = null) {
    return {
        type: SET_NEW_RACE_ENTRY_BOAT,
        boat: boat,
    }
}

const SET_NEW_RACE_ENTRY_HELM_SEARCH = 'SET_NEW_RACE_ENTRY_HELM_SEARCH'

function setNewRaceEntryHelmSearch(search = "") {
    return {
        type: SET_NEW_RACE_ENTRY_HELM_SEARCH,
        search: search,
    }
}

const SET_NEW_RACE_ENTRY_BOAT_SEARCH = 'SET_NEW_RACE_ENTRY_BOAT_SEARCH'

function setNewRaceEntryBoatSearch(search = "") {
    return {
        type: SET_NEW_RACE_ENTRY_BOAT_SEARCH,
        search: search
    }
}

const ADD_NEW_RACE_ENTRY = 'ADD_NEW_RACE_ENTRY'

function addNewRaceEntry(entry) {
    return { 
        type: ADD_NEW_RACE_ENTRY, 
        entry: entry 
    }
}

const REMOVE_NEW_RACE_ENTRY = 'REMOVE_NEW_RACE_ENTRY'

function removeNewRaceEntry(entry) {
    return {
        type: REMOVE_NEW_RACE_ENTRY,
        entry: entry,
    }
}

const CLEAR_NEW_RACE = 'CLEAR_NEW_RACE'
function clearNewRace() {
    return { type: CLEAR_NEW_RACE }
}

const SET_BOAT_CLASS_SEARCH = 'SET_BOAT_SEARCH'
function setBoatClassSearch(search = "") {
    return {
        type: SET_BOAT_CLASS_SEARCH,
        search: search
    }
}

const SET_SELECTED_RACE = 'SET_SELECTED_RACE'

function setSelectedRace(race = undefined) {
    return {
        type: SET_SELECTED_RACE,
        race: race
    }
}

const DELETE_RACE = 'DELETE_RACE'
function deleteRace(race = undefined) {
    return {
        type: DELETE_RACE,
        race: race
    }
}

const START_RACE = 'START_RACE'

function startRace(race = null, start = new Date()) {
    if (!validStartRace(race)) {
        return {}
    }
    return {
        type: START_RACE,
        raceId: race.id,
        start: start
    }
}

const LAP_ENTRY = 'LAP_ENTRY'

function lapEntry(race = "", entry = "", lapTime = new Date()) {
    if (!validLapEntry(race, entry)) {
        return {}
    }
    return {
        type: LAP_ENTRY,
        raceId: race.id,
        entryId: entry.id,
        lapTime: lapTime
    }
}

const FINISH_ENTRY = 'FINISH_ENTRY'

function finishEntry(race = null, entry = null, finishTime = new Date()) {
    if (!validFinishEntry(race, entry, finishTime)) {
        return {}
    }
    return {
        type: FINISH_ENTRY,
        raceId: race.id,
        entryId: entry.id, 
        finishTime: finishTime
    }
}

export {
    ADD_BOAT_CLASS, addBoatClass,
    ADD_PERSON, addPerson,
    ADD_BOAT, addBoat,
    ADD_RACE, addRace,
    SET_NEW_BOAT_CLASS_NAME, setNewBoatClassName,
    SET_NEW_BOAT_CLASS_PY_NUMBER, setNewBoatClassPyNumber,
    SET_NEW_PERSON_NAME, setNewPersonName,
    SET_NEW_BOAT_SAIL_NUMBER, setNewBoatSailNumber,
    SET_NEW_BOAT_CLASS, setNewBoatClass,
    SET_NEW_RACE_ENTRY_BOAT, setNewRaceEntryBoat,
    SET_NEW_RACE_ENTRY_HELM, setNewRaceEntryHelm,
    SET_NEW_RACE_ENTRY_BOAT_SEARCH, setNewRaceEntryBoatSearch,
    SET_NEW_RACE_ENTRY_HELM_SEARCH, setNewRaceEntryHelmSearch,
    ADD_NEW_RACE_ENTRY, addNewRaceEntry,
    REMOVE_NEW_RACE_ENTRY, removeNewRaceEntry,
    CLEAR_NEW_RACE, clearNewRace,
    SET_BOAT_CLASS_SEARCH, setBoatClassSearch,
    SET_SELECTED_RACE, setSelectedRace,
    DELETE_RACE, deleteRace,
    START_RACE, startRace,
    LAP_ENTRY, lapEntry,
    FINISH_ENTRY, finishEntry
}