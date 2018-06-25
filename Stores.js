import StorageImpl from './StorageImpl'
import { BoatClassesStore } from './BoatClassesStore'
import { PeopleStore } from './PeopleStore'
import { BoatsStore } from './BoatsStore'
import { RacesStore } from './RacesStore'

var defaultClasses = require('./DefaultClasses')
var defaultPeople = []
var defaultBoats = []

if (__DEV__) {
    defaultPeople = require('./PretendPeople')
    defaultBoats = require('./PretendBoats')
}

const peopleStore = new PeopleStore(new StorageImpl("net.mfashby.sailracetimer.people", defaultPeople))
const bClassStore  = new BoatClassesStore(new StorageImpl("net.mfashby.sailracetimer.boatclasses", defaultClasses))
const boatStore = new BoatsStore(
    new StorageImpl("net.mfashby.sailracetimer.boats", defaultBoats),
    bClassStore
)
const raceStore= new RacesStore(
    new StorageImpl("net.mfashby.sailracetimer.races", []),
    peopleStore,
    boatStore
)

async function loadStores() {
    // Stores should be loaded in dependency order - peope & boat classes first
    console.log("loadStores")
    await Promise.all(peopleStore.loadData(), bClassStore.loadData())    
    console.log("peopleStore & bClassStore loaded")
    await boatStore.loadData()
    console.log("boatStore loaded")
    await raceStore.loadData()
    console.log("raceStore loaded")
}

export {
    peopleStore,
    bClassStore,
    raceStore, 
    boatStore,
    loadStores
}