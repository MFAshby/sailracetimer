import { Race, RaceEntry } from './DataObjects'
import { validStartRace, validAddRace, validLapEntry, validFinishEntry } from './Validation'
import { addRace, ADD_RACE, startRace, START_RACE, lapEntry, LAP_ENTRY, finishEntry } from './Actions'

test('Valid add race', () => {
    expect(validAddRace(null)).toBe(false)
    expect(addRace(null).type).not.toBe(ADD_RACE)

    let r0 = new Race({})
    expect(validAddRace(r0)).toBe(false)
    expect(addRace(r0).type).not.toBe(ADD_RACE)

    let r1 = new Race({entries: [new RaceEntry({})]})
    expect(validAddRace(r1)).toBe(true)
    expect(addRace(r1).type).toBe(ADD_RACE)
})

test('Valid start race', ()=>{
    expect(validStartRace(null)).toBe(false)
    expect(startRace(null).type).not.toBe(START_RACE)

    let re1 = new RaceEntry({})
    let r1 = new Race({start: null, entries: [re1]})
    expect(validStartRace(r1)).toBe(true)
    expect(startRace(r1).type).toBe(START_RACE)

    let re2 = new RaceEntry({})
    let r2 = new Race({start: new Date(), entries: [re2]})
    expect(validStartRace(r2)).toBe(false)
    expect(startRace(r2).type).not.toBe(START_RACE)
})

function checkActionInvalid(action) {
    expect(action.type).toBe(undefined)
}

function checkActionValid(action, type) {
    expect(action.type).toBe(type)
}

test('Valid lap', () => {
    // Invalid data
    expect(validLapEntry(null, null)).toBe(false)
    expect(validLapEntry(new Race({}), null)).toBe(false)
    checkActionInvalid(lapEntry(null, null))

    // Can't lap before started
    let re1 = new RaceEntry({})
    let re2 = new RaceEntry({})
    let r1 = new Race({entries: [re1, re2], start: null})
    expect(validLapEntry(r1, re1)).toBe(false)
    checkActionInvalid(lapEntry(r1, re1))

    // Can lap when started
    r1.start = new Date()
    expect(validLapEntry(r1, re1)).toBe(true)
    checkActionValid(lapEntry(r1, re1), LAP_ENTRY)

    // Can't lap when finished
    re1.finish = new Date()
    expect(validLapEntry(r1, re1)).toBe(false)
    expect(validLapEntry(r1, re2)).toBe(true)

    // Can't lap other when finished
    re2.finish = new Date()    
    expect(validLapEntry(r1, re2)).toBe(false)
})

test('Valid finish', () => {
    expect(validFinishEntry(null, null)).toBe(false)
    expect(validFinishEntry(new Race({}), null)).toBe(false)
    expect(validFinishEntry(null, new RaceEntry({}))).toBe(false)
    checkActionInvalid(finishEntry(null, null))

    // Can't finish if not started
    let re1 = new RaceEntry({})
    let r1 = new Race({entries: [re1]})
    expect(validFinishEntry(r1, re1)).toBe(false)

    // Can't finish before start
    r1.start = new Date(2018, 4, 12, 12, 0)
    expect(validFinishEntry(r1, re1, new Date(2018, 4, 12, 11, 0))).toBe(false)

    // Can finish after start
    expect(validFinishEntry(r1, re1, new Date(2018, 4, 12, 12, 1))).toBe(true)

    // Can't finish if already finished
    re1.finish = new Date(2018,4,12,12,40)
    expect(validFinishEntry(r1, re1, new Date())).toBe(false)
})