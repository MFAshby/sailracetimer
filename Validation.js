// Contains functions for validating actions 
// Applied on the UI for disabling components,
// In the action creators bc why not.
// In the reducer in case a rogue action gets dispatched
import moment from 'moment'

// A race with no entries is invalid
function validAddRace(race = null) {
    if (!race) {
        return false
    }
    if (race.entries.length === 0) {
        return false
    }
    return true
}

// Can't start a race if it's already started
function validStartRace(race = null) {
    if (!race) {
        return false
    }

    if (race.start) {
        return false
    }

    return true
}

function validLapEntry(raceEntry = null) {
    if (!raceEntry || !raceEntry.race) {
        return false
    }

    if (!raceEntry.race.start) {
        return false
    }

    if (raceEntry.finish) {
        return false
    }

    return true
}

function validFinishEntry(entry = null, finish = null) {
    if (!entry || !entry.race) {
        return false
    }

    let race = entry.race

    if (!race.start) {
        return false
    }

    if (entry.finish) {
        return false
    }

    if (moment(finish).isSameOrBefore(race.start)) {
        return false
    }

    return true
}

export {
    validStartRace,
    validAddRace,
    validLapEntry,
    validFinishEntry
}