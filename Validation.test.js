import { Race, RaceEntry } from './DataObjects'
import { validStartRace, validAddRace, validLapEntry, validFinishEntry } from './Validation'

test('Valid add race', () => {
    expect(validAddRace(null)).toBe(false)

    let r0 = new Race({})
    expect(validAddRace(r0)).toBe(false)

    let r1 = new Race({entries: [new RaceEntry({})]})
    expect(validAddRace(r1)).toBe(true)
})

test('Valid start race', ()=>{
    expect(validStartRace(null)).toBe(false)

    let re1 = new RaceEntry({})
    let r1 = new Race({start: null, entries: [re1]})
    expect(validStartRace(r1)).toBe(true)

    let re2 = new RaceEntry({})
    let r2 = new Race({start: new Date(), entries: [re2]})
    expect(validStartRace(r2)).toBe(false)
})

test('Valid lap', () => {
    // Invalid data
    expect(validLapEntry(null, null)).toBe(false)
    expect(validLapEntry(new Race({}), null)).toBe(false)

    // Can't lap before started
    let re1 = new RaceEntry({})
    let re2 = new RaceEntry({})
    let r1 = new Race({entries: [re1, re2], start: null})
    expect(validLapEntry(r1, re1)).toBe(false)

    // Can lap when started
    r1.start = new Date()
    expect(validLapEntry(r1, re1)).toBe(true)

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