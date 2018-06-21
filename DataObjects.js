// Copied off the internet
function b(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)}
const v4uuid = b

import { store } from './Store'
import moment from 'moment'
import { listToObjectById } from './Utils';
import _ from 'lodash'

const dateFormat = "DD MMM YYYY HH:mm"
const elapsedFormat = "HH:mm:ss.SSS"
const elapsedFormatShort = "H[h] m[m]"

class BoatClass {
    static fromJson(obj = {}) {
        return new BoatClass(obj)
    }

    constructor({id = v4uuid(), name = "", pyNumber = 1000, iconName = ""}) {
        this.id = id
        this.name = name
        this.pyNumber = pyNumber
        this.iconName = iconName
    }
}

class Boat {
    static fromJson(obj = {}) {
        return new Boat(obj)
    }

    constructor({id = v4uuid(), sailNumber = "", boatClassId = ""}) {
        this.id = id
        this.sailNumber = sailNumber
        this.boatClassId = boatClassId
    }

    get boatClass() {
        return store.getState().boatClasses[this.boatClassId]
    }
}

class Person {
    static fromJson(obj = {}) {
        return new Person(obj)
    }

    constructor({id = v4uuid(), name = "", image = null}) {
        this.id = id
        this.name = name
        this.image = image
    }
}

class RaceEntry {
    static fromJson(obj = {}) {
        let raceEntry = new RaceEntry(obj)
        if (raceEntry.start) {
            raceEntry.start = new Date(raceEntry.start)
        }
        if (raceEntry.finish) {
            raceEntry.finish = new Date(raceEntry.finish)
        }
        raceEntry.laps = raceEntry.laps.map(lapData => new Date(lapData))
        return raceEntry
    }

    toJSON(key) {
        // Don't include the backlink to race
        return {
            id: this.id,
            boatId: this.boatId,
            helmId: this.helmId,
            laps: this.laps,
            finish: this.finish,
            start: this.start    
        }
    }

    constructor({id = v4uuid(), 
        boatId = null, 
        helmId = null, 
        laps = [], 
        finish = null, 
        start = null, 
        race = null}) {

        this.id = id
        this.boatId = boatId
        this.helmId = helmId
        this.laps = laps
        this.finish = finish
        this.start = start
        this.race = race
    }

    get helm() {
        return store.getState().people[this.helmId]
    }

    get boat() {
        return store.getState().boats[this.boatId]
    }

    get boatClass() {
        return this.boat ? this.boat.boatClass : null
    }

    get helmName() {
        return this.helm ? this.helm.name : "No helm"
    }

    get boatSailNumber() {
        return this.boat ? this.boat.sailNumber : "No sail number"
    }

    get elapsed() {
        let fin = this.finish ? moment(this.finish) : moment()
        let st = moment(this.start)
        return fin.diff(st)
    }

    get elapsedDesc() {
        if (!this.start) {
            return "Not started"
        } 
        return moment.utc(this.elapsed).format(elapsedFormat)
    }

    get elapsedAdjusted() {
        // See the link for an explanation of the formula
        // http://www.rya.org.uk/SiteCollectionDocuments/technical/Web%20Documents/PY%20Documentation/PY%20Running%20Races.pdf
        let pyNumber = this.boatClass ? this.boatClass.pyNumber : 1000
        let lapsCount = this.laps.length
        return (this.elapsed * this.race.maxLaps * 1000) / ( pyNumber * lapsCount)
    }

    get elapsedAdjustedDesc() {
        if (!this.start) {
            return "Not started"
        }
        return moment.utc(this.elapsedAdjusted).format(elapsedFormat)
    }

    get position() {
        let entriesOrdered = this.race.entriesOrdered
        return entriesOrdered.indexOf(this) + 1 // Human indexing
    }
}

class Race {
    static fromJson(obj = {}) {
        let race = new Race(obj)
        race.entries = race.entries.map(entryData => RaceEntry.fromJson(entryData))
        return race
    }

    constructor({id = v4uuid(), entries = [], start = null, _entries = undefined}) {
        this.id = id

        // Recreating this object from JSON uses the private member
        if (_entries) {
            this._entries = _entries
        } else {
            this.entries = entries
        } 
        
        if (start) {
            this.entries.forEach(entry => entry.start = start)
        }

        // Backlink
        this.entries.forEach(entry => entry.race = this)
    }

    findEntry(entryId = "") {
        return this._entries[entryId]
    }

    get entries() {
        return Object.values(this._entries)
    }

    set entries(val) {
        this._entries = listToObjectById(val)
    }

    get start() {
        if (this.entries.length > 0) {
            return this.entries[0].start
        }
        return null
    }

    set start(val) {
        this.entries.forEach(entry => entry.start = val)
    }

    get startDesc() {
        if (!this.start) {
            return "Not started"
        }
        return moment(this.start).format(dateFormat)
    }

    get finishDesc() {
        if (!this.finish) {
            return "Not finished"
        }
        return this.finish.format(dateFormat)
    }

    get elapsed() {
        let fin = this.finish ? this.finish : moment()
        let st = moment(this.start)
        return fin.diff(st)
    }

    get elapsedDesc() {
        if (!this.start) {
            return "Not started"
        }
        return moment.utc(this.elapsed).format(elapsedFormat)
    }

    get elapsedShort() {
        if (!this.start) {
            return "Not started"
        }
        return moment.utc(this.elapsed).format(elapsedFormatShort)
    }

    get finish() {
        var mx = null
        for (var i=0; i<this.entries.length; i++) {
            let entry = this.entries[i]
            if (!entry.finish) {
                return null
            }
            let mmt = moment(entry.finish)
            mx = mx ? moment.max(mx, mmt) : mmt 
        }
        return mx
    }

    get statusDesc() {
        if (this.finish) {
            return `Finished at ${this.finishDesc}`
        } else if (this.start) {
            return `In progress (${this.elapsedShort} elapsed)` 
        } else {
            return "Not started"
        }
    }

    get maxLaps() {
        return this.entries.reduce((mx, entry) => Math.max(mx, entry.laps.length), 0)
    }

    get entriesOrdered() {
        return _.sortBy(this.entries, [entry => entry.elapsedAdjusted])
    }
}

export {
    BoatClass,
    Person,
    Boat,
    RaceEntry,
    Race
}