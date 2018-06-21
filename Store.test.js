// Tests each action
import { 
    addBoatClass, addPerson, addBoat, addRaceEntry, addRace, setNewRaceEntryBoatSearch, setNewRaceEntryHelmSearch, setNewRaceEntryBoat, setNewRaceEntryHelm,
    addNewRaceEntry, removeNewRaceEntry, clearNewRace, loadData, setBoatClassSearch, setSelectedRace, deleteRace, startRace,
    lapEntry, 
    finishEntry} from './Actions'
import { BoatClass, Person, Boat, RaceEntry, Race } from './DataObjects';
import { mainReducer } from './Reducers'
import { putInObjectByID } from './Utils';
import { racesCountSelector, selectedRaceSelector } from './Selectors';
import { applyActions } from './TestUtils'

function checkAddItem(item, action, selector) {
    let id = item.id
    let newState = mainReducer(undefined, action)
    expect(selector(newState))
        .toBe(item)
}

test('Adding a boat class', () => {
    let newBoatClass = new BoatClass({name: "laser", pyNumber: 1234, iconName: "laser"})
    checkAddItem(newBoatClass, addBoatClass(newBoatClass), (state)=>state.boatClasses[newBoatClass.id])
})

test('Adding a person', () => {
    let newPerson = new Person({name: "Bob"})
    checkAddItem(newPerson, addPerson(newPerson), (state)=>state.people[newPerson.id])
})

test('Adding a boat', () => {
    let newBoat = new Boat({sailNumber: "12345", boatClassId:"54564564"})
    checkAddItem(newBoat, addBoat(newBoat), (state)=>state.boats[newBoat.id])
})

test('Adding a race', () => {
    let e1 = new RaceEntry({})
    let newRace = new Race({entries: [e1]})
    checkAddItem(newRace, addRace(newRace), (state)=>state.races[newRace.id])
})

test('setting boat search', () => {
    let testState = mainReducer(undefined, setNewRaceEntryBoatSearch("Hello"))
    expect(testState.newRace.boatSearch)
        .toEqual("Hello")
})

test('setting helm search', () => {
    let testState = mainReducer(undefined, setNewRaceEntryHelmSearch("Hello"))
    expect(testState.newRace.helmSearch)
        .toEqual("Hello")
})

test('setting boat for new entry', () => {
    let b1 = new Boat({sailNumber: "1245"})
    let testState = mainReducer(undefined, setNewRaceEntryBoat(b1))
    expect(testState.newRace.boat).toBe(b1)

    let s2 = mainReducer(testState, setNewRaceEntryBoat(null))
    expect(s2.newRace.boat).toBe(null)
})

test('setting helm for new entry', () => {
    let p1 = new Person({name: "bob"})
    let testState = mainReducer(undefined, setNewRaceEntryHelm(p1))
    expect(testState.newRace.helm).toBe(p1)

    let s2 = mainReducer(testState, setNewRaceEntryHelm(null))
    expect(s2.newRace.helm).toBe(null)
})

test('add / remove new race entry', () => {
    let re = new RaceEntry({})
    let s1 = mainReducer(undefined, addNewRaceEntry(re))
    expect(s1.newRace.entries).toEqual([re])
  
    let s2 = mainReducer(s1, removeNewRaceEntry(re))
    expect(s2.newRace.entries).toEqual([])
})

test('clear new race', () => {
    let re1 = new RaceEntry({})
    let re2 = new RaceEntry({})
    let actions = [addNewRaceEntry(re1), addNewRaceEntry(re2), clearNewRace()]
    let state = applyActions({actions: actions})
    expect(state.newRace.entries).toEqual([])
})

test('set boat class search', () => {
    let state = applyActions({actions: [setBoatClassSearch("Hello")]})
    expect(state.boatClassSearch).toEqual("Hello")
})

test('set selected race', () => {
    let r1 = new Race({entries: [new RaceEntry({})]})
    let state = applyActions({actions: [addRace(r1), setSelectedRace(r1)]})
    expect(selectedRaceSelector(state)).toBe(r1)
})

test('delete race', () => {
    let r1 = new Race({})
    let actions = [addRace(r1), deleteRace(r1)]
    let state = applyActions({actions: actions})
    expect(racesCountSelector(state)).toEqual(0)
})

test('start race', () => {
    let re1 = new RaceEntry({})
    let r1 = new Race({entries: [re1]})

    let actions = [addRace(r1), startRace(r1, new Date(2018, 4, 12, 12, 12, 0))]
    let state = applyActions({actions: actions})
    expect(state.races[r1.id].start)
        .toEqual(new Date(2018, 4, 12, 12, 12, 0))
})

test('Lap entry', () => {
    var re1 = new RaceEntry({})
    var r1 = new Race({entries: [re1]})
    let actions = [addRace(r1), startRace(r1)]
    let state0 = applyActions({actions: actions})

    r1 = state0.races[r1.id]
    re1 = r1.findEntry(re1.id)
    let state = applyActions({state: state0, actions: [lapEntry(r1, re1)]})

    expect(state.races[r1.id].findEntry(re1.id).laps.length).toBe(1)
})

test('finish entry', () => {
    var re1 = new RaceEntry({})
    var r1 = new Race({entries: [re1]})
    let actions = [addRace(r1), 
        startRace(r1, new Date(2018,4,12,12,12,0))]
    let state0 = applyActions({actions: actions})

    r1 = state0.races[r1.id]
    re1 = r1.findEntry(re1.id)
    let state = applyActions({state: state0, actions: [finishEntry(r1, re1, new Date(2018,4,12,12,14,0))]})

    r1 = state.races[r1.id]
    re1 = r1.findEntry(re1.id)

    // const dateFormat = "DD MMM YYYY HH:mm"
    // const elapsedFormat = "HH:mm:ss.SSS"
    expect(r1.finishDesc).toBe("12 May 2018 12:14")
    expect(r1.elapsedDesc).toBe("00:02:00.000")
    expect(r1.elapsedDesc).toBe("00:02:00.000")
    expect(re1.elapsedDesc).toBe("00:02:00.000")
})