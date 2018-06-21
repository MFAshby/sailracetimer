import { BoatClass, Person, Boat, RaceEntry, Race } from './DataObjects';
import { addBoatClass, addPerson, addBoat, addRaceEntry, addRace } from './Actions'
import { mainReducer } from './Reducers'
import { store } from './Store'
import { listToObjectById } from './Utils';

test('RaceEntry member access', () => {
    let helm = new Person({name: "bob"})
    let boat = new Boat({sailNumber: "12345"})
    let raceEntry = new RaceEntry({helmId: helm.id, boatId: boat.id})

    // store.dispatch(addRaceEntry(raceEntry))
    expect(raceEntry.helm).toBe(undefined)
    expect(raceEntry.boat).toBe(undefined)

    store.dispatch(addPerson(helm))
    expect(raceEntry.helm).toBe(helm)

    store.dispatch(addBoat(boat))
    expect(raceEntry.boat).toBe(boat)
})

test('race start, finish & elapsed descriptions', () => {
    let re1 = new RaceEntry({})
    let re2 = new RaceEntry({})
    let r1 = new Race({entries: [re1, re2]})
    expect(r1.elapsedDesc).toEqual("Not started")
    expect(r1.finishDesc).toEqual("Not finished")
    expect(re1.elapsedDesc).toEqual("Not started")

    r1.start = new Date(2018, 4, 12, 12, 12, 0)
    expect(r1.startDesc).toEqual("12 May 2018 12:12")
    expect(r1.elapsedDesc).toEqual(expect.stringContaining(":"))
    expect(r1.finishDesc).toEqual("Not finished")

    re1.finish = new Date(2018, 4, 12, 12, 13, 0)
    expect(r1.startDesc).toEqual("12 May 2018 12:12")
    expect(r1.elapsedDesc).toEqual(expect.stringContaining(":"))
    expect(r1.finishDesc).toEqual("Not finished")
    expect(re1.elapsedDesc).toEqual("00:01:00.000")

    re2.finish = new Date(2018, 4, 12, 12, 14, 0)
    expect(r1.startDesc).toEqual("12 May 2018 12:12")
    expect(r1.finishDesc).toEqual("12 May 2018 12:14")
    expect(r1.elapsedDesc).toEqual("00:02:00.000")
    expect(re1.elapsedDesc).toEqual("00:01:00.000")
    expect(re2.elapsedDesc).toEqual("00:02:00.000")
    
})

test('race entries access', () => {
    let re1 = new RaceEntry({})
    let re2 = new RaceEntry({})
    let r1 = new Race({entries: [re1, re2]})

    expect(r1.findEntry(re1.id)).toBe(re1)
    expect(r1.findEntry(re2.id)).toBe(re2)
})

test('Race constructors', () => {
    let re1 = new RaceEntry({})
    let re2 = new RaceEntry({})
    let entries = [re1, re2]
    let entriesMap = listToObjectById(entries)

    let r1 = new Race({entries: entries})
    expect(r1.findEntry(re1.id)).toBe(re1)
    expect(r1.findEntry(re2.id)).toBe(re2)
    expect(r1._entries).toEqual(entriesMap)
    expect(r1.entries).toEqual(entries)

    let r2 = new Race({_entries: entriesMap})
    expect(r2.findEntry(re1.id)).toBe(re1)
    expect(r2.findEntry(re2.id)).toBe(re2)
    expect(r2._entries).toEqual(entriesMap)
    expect(r2.entries).toEqual(entries)
})

test('access boat class from boat', () => {
    let bc1 = new BoatClass({name: "Tester"})
    store.dispatch(addBoatClass(bc1))
    let b1 = new Boat({boatClassId: bc1.id})
    expect(b1.boatClass).toEqual(bc1)
})

test('Adjusted times, simple', () => {
    let bc1 = new BoatClass({name: "FastBoat", pyNumber: 1000})
    let bc2 = new BoatClass({name: "SlowBoat", pyNumber: 1500})
    let b1 = new Boat({boatClassId: bc1.id})
    let b2 = new Boat({boatClassId: bc2.id})

    store.dispatch(addBoatClass(bc1))
    store.dispatch(addBoatClass(bc2))
    store.dispatch(addBoat(b1))
    store.dispatch(addBoat(b2))

    //  Simple case where boats have completed the same laps
    let re1 = new RaceEntry({boatId: b1.id, laps: [new Date(), new Date()]})
    let re2 = new RaceEntry({boatId: b2.id, laps: [new Date(), new Date()]})
    let r1 = new Race({entries: [re1, re2]})

    r1.start = new Date(2018, 4, 12, 12, 0)
    re1.finish = new Date(2018, 4, 12, 13, 0) // 1 hour
    re2.finish = new Date(2018, 4, 12, 14, 0) // 2 hours

    expect(re1.elapsedAdjustedDesc).toEqual("01:00:00.000") // No chnage for PY number 1000
    expect(re2.elapsedAdjustedDesc).toEqual("01:20:00.000") // Adjusted for slowness
})

test('Adjusted times, average lap', () => {
    let bc1 = new BoatClass({name: "FastBoat", pyNumber: 1000})
    let bc2 = new BoatClass({name: "SlowBoat", pyNumber: 1500})
    let b1 = new Boat({boatClassId: bc1.id})
    let b2 = new Boat({boatClassId: bc2.id})

    store.dispatch(addBoatClass(bc1))
    store.dispatch(addBoatClass(bc2))
    store.dispatch(addBoat(b1))
    store.dispatch(addBoat(b2))

    let re1 = new RaceEntry({boatId: b1.id, laps: [new Date(), new Date(), new Date(), new Date()]})
    let re2 = new RaceEntry({boatId: b2.id, laps: [new Date(), new Date(), new Date()]})
    let r1 = new Race({entries: [re2, re1]}) // Deliberately in this order
    expect(r1.maxLaps).toBe(4)

    r1.start = new Date(2018, 4, 12, 12, 0)
    re1.finish = new Date(2018, 4, 12, 13, 0) // 60 minutes
    re2.finish = new Date(2018, 4, 12, 13, 30) // 90 minutes & 1 less lap

    
    expect(re1.elapsedAdjustedDesc).toEqual("01:00:00.000") // No change, they did the most laps
    expect(re2.elapsedAdjustedDesc).toEqual("01:20:00.000") // 80 minutes

    expect(r1.entriesOrdered).toEqual([re1, re2])
    expect(re1.position).toBe(1) // Human numbered position
    expect(re2.position).toBe(2) 
})
