import StorageImpl from './StorageImpl'
import { BoatClassesStore } from './BoatClassesStore'
import { PeopleStore } from './PeopleStore'
import { BoatsStore } from './BoatsStore'
import { RacesStore } from './RacesStore'

const peopleStore = new PeopleStore(new StorageImpl("net.mfashby.sailracetimer.people", require('./PretendPeople')))
const bClassStore  = new BoatClassesStore(new StorageImpl("net.mfashby.sailracetimer.boatclasses", require('./DefaultClasses')))
const boatStore = new BoatsStore(
    new StorageImpl("net.mfashby.sailracetimer.boats", require('./PretendBoats')),
    bClassStore
)
const raceStore= new RacesStore(
    new StorageImpl("net.mfashby.sailracetimer.races", require('./PretendRaces')),
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