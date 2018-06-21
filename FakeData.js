import { BoatClass, Person, Boat, RaceEntry, Race }  from './DataObjects.js'
import { store } from './Store.js'
import { addBoatClass, addBoat, addPerson, addRace } from './Actions.js'

const addFakeData = () => {
    let laser = new BoatClass({name: "Laser", pyNumber: 1000, iconName: "laser"})
    let topper = new BoatClass({name: "Topper", pyNumber: 1423, iconName: "topper"})
    store.dispatch(addBoatClass(laser))
    store.dispatch(addBoatClass(topper))

    let georgia = new Person({name: "Georgia"})
    let henry = new Person({name: "Henry"})
    let martin = new Person({name: "Martin"})
    store.dispatch(addPerson(martin))
    store.dispatch(addPerson(georgia))
    store.dispatch(addPerson(henry))

    let b12345 = new Boat({sailNumber: "12345", boatClassId: laser.id})
    let b54321 = new Boat({sailNumber: "54321", boatClassId: topper.id})
    store.dispatch(addBoat(b12345))
    store.dispatch(addBoat(b54321))

    let e1 = new RaceEntry({boatId: b12345.id, helmId: henry.id})
    let e2 = new RaceEntry({boatId: b54321.id, helmId: georgia.id})
    let race = new Race({entryIds: [e1.id, e2.id]})
    store.dispatch(addRace(race))
}

export {
    addFakeData
}