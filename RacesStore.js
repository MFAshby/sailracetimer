import moment from 'moment'
import {} from 'moment-duration-format'
import _ from 'lodash'
import { observable, computed, autorun } from 'mobx'
import v4uuid from './uuid'

const dateFormat = "DD MMM YYYY HH:mm"
const elapsedFormat = "HH:mm:ss.SSS"
const elapsedFormatShort = "H[h] m[m]"

export class RaceEntry {
    id = ""
    @observable boat = null
    @observable helm = null 
    @observable lapTimes = []
    @observable finish = null
    @observable start = null
    race = null
    
    constructor({id = v4uuid(), 
        boat = null, 
        helm = null, 
        lapTimes = [], 
        finish = null, 
        start = null, 
        race = null}) {

        this.id = id
        this.boat = boat
        this.helm = helm
        this.lapTimes = lapTimes
        this.finish = finish
        this.start = start
        this.race = race
    }

    asJSON = () => {
        // Convert object refs to IDs
        return {
            id: this.id,
            boatId: this.boat ? this.boat.id : "",
            helmId: this.helm ? this.helm.id : "",
            lapTimes: this.lapTimes,
            finish: this.finish,
            start: this.start,
        }
    }

    static fromJSON(props, store) {
        // Convert IDs to object refs
        props.boat = store.boatStore.findBoat(props.boatId)
        delete props.boatId
        props.helm = store.peopleStore.findPerson(props.helmId)
        delete props.helmId
        // Convert dates
        props.lapTimes = props.lapTimes.map(lapTime => new Date(lapTime))
        props.start = props.start ? new Date(props.start) : null
        props.finish = props.finish ? new Date(props.finish) : null
    
        return new RaceEntry({
            ...props
        })
    }

    @computed get boatClass() {
        let { boatClass = null } = this.boat
        return boatClass
    }

    @computed get helmName() {
        return this.helm ? this.helm.name : "No helm"
    }

    @computed get boatSailNumber() {
        return this.boat ? this.boat.sailNumber : "No sail number"
    }

    @computed get elapsed() {
        let fin = this.finish ? moment(this.finish) : moment()
        let st = moment(this.start)
        return fin.diff(st)
    }

    @computed get elapsedDesc() {
        let elapsed = this.elapsed
        if (!this.start || elapsed < 0) {
            return "Not started"
        } 
        return moment.duration(elapsed).format(elapsedFormat)
    }

    @computed get elapsedAdjusted() {
        // See the link for an explanation of the formula
        // http://www.rya.org.uk/SiteCollectionDocuments/technical/Web%20Documents/PY%20Documentation/PY%20Running%20Races.pdf
        let pyNumber = this.boatClass ? this.boatClass.pyNumber : 1000
        return (this.elapsed * this.race.maxLaps * 1000) / ( pyNumber * this.laps)
    }

    @computed get elapsedAdjustedDesc() {
        if (!this.start) {
            return "Not started"
        }
        return moment.duration(this.elapsedAdjusted).format(elapsedFormat)
    }

    @computed get position() {
        let entriesOrdered = this.race.entriesOrdered
        return entriesOrdered.indexOf(this) + 1 // Human indexing
    }

    @computed get laps() {
        return this.lapTimes.length
    }

    addLap = (lapTime = new Date()) => {
        this.lapTimes.push(lapTime)
    }

    setFinished = (finish = new Date()) => {
        this.finish = finish
    }
}

export class Race {
    id = null
    @observable entries = []
    store = null

    constructor({id = v4uuid(), entries = [], store = null}) {
        this.id = id
        this.store = store
        this.entries = entries
        this.entries.forEach(entry => entry.race = this)
    }

    asJSON = () => {
        return {
            entries: this.entries.map(entry => entry.asJSON())
        }
    }

    static fromJSON(props, store) {
        props.entries = props.entries
            .map(entry => RaceEntry.fromJSON(entry, store))
        return new Race({
            store: store,
            ...props
        })
    }

    newEntry = (props) => {
        let entry = new RaceEntry({
            race: this,
            ...props
        })
        this.entries.push(entry)
        return entry
    }

    delete = () => {
        this.store.removeRace(this)
    }

    @computed get start() {
        let starts = this.entries.map(entry => entry.start)
        return Math.min(...starts) || null
    }

    set start(val) {
        this.entries.forEach(entry => entry.start = val)
    }

    @computed get startDesc() {
        if (!this.start) {
            return "Not started"
        }
        return moment(this.start).format(dateFormat)
    }

    @computed get finishDesc() {
        if (!this.finish) {
            return "Not finished"
        }
        return this.finish.format(dateFormat)
    }

    @computed get elapsed() {
        let fin = this.finish ? this.finish : moment()
        let st = moment(this.start)
        return fin.diff(st)
    }

    @computed get elapsedDesc() {
        if (!this.start) {
            return "Not started"
        }
        return moment.duration(this.elapsed).format(elapsedFormat)
    }

    @computed get elapsedShort() {
        if (!this.start) {
            return "Not started"
        }
        return moment.duration(this.elapsed).format(elapsedFormatShort)
    }

    @computed get finish() {
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

    @computed get statusDesc() {
        if (this.finish) {
            return `Finished at ${this.finishDesc}`
        } else if (this.start) {
            return `In progress (${this.elapsedShort} elapsed)` 
        } else {
            return "Not started"
        }
    }

    @computed get maxLaps() {
        let laps = this.entries.map(entry => entry.laps)
        return Math.max(...laps)
    }

    @computed get entriesOrdered() {
        return _.sortBy(this.entries, [entry => entry.elapsedAdjusted])
    }
}

export class RacesStore {
    @observable races = []
    @observable selectedRace = null
    @observable loaded = false
    storageImpl
    peopleStore
    boatStore

    constructor(storageImpl, peopleStore, boatStore) {
        this.storageImpl = storageImpl
        this.peopleStore = peopleStore
        this.boatStore = boatStore

        autorun(this.saveData)
    }

    saveData = async () => {
        let races = this.races.slice()
        if (!this.loaded) {
            return
        }
        await this.storageImpl.save(races.map(race => race.asJSON()))
    }

    loadData = async () => {
        let jsonArray = await this.storageImpl.getStorageObjects()
        let races = jsonArray.map(jsonObj => Race.fromJSON(jsonObj, this))
        this.races.push(...races)
        this.loaded = true
    }

    newRace = (props) => {
        let race = new Race({store: this, ...props})
        this.races.push(race)
        return race
    }

    removeRace = (race) => {
        this.races.remove(race)
    }

    @computed get racesCount() {
        return this.races.length
    }
}