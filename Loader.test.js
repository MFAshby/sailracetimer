import { dataToSaveSelector, restoreStateActions } from './Loader'
import { Person, BoatClass, Boat, RaceEntry, Race } from './DataObjects';
import { applyActions } from './TestUtils'
import { addPerson, addBoatClass, addBoat, addRace } from './Actions';
// test('Nothig', () => {})
test('Persisting data to storage', () => {
    let p1 = new Person({})
    let bc1 = new BoatClass({})
    let b1 = new Boat({boatClassId: bc1.id})
    let re1 = new RaceEntry({boatId: b1.id, helmId: p1.id, laps: [new Date()]})
    let r1 = new Race({entries: [re1]})
    r1.start = new Date(2018, 4, 12, 12, 0)

    let actions = [
        addPerson(p1), 
        addBoatClass(bc1), 
        addBoat(b1), 
        addRace(r1)
    ]

    let state = applyActions({actions: actions})
    let data = dataToSaveSelector(state)
    let dataStr = JSON.stringify(data)

    let parsedData = JSON.parse(dataStr)
    let newActions = restoreStateActions(parsedData)
    let state2 = applyActions({actions: newActions})
    expect(state2).toEqual(state)
})