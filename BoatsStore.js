import { observable, autorun } from "mobx";
import v4uuid from './uuid'

export class Boat {
    id = null
    @observable sailNumber = ""
    @observable boatClass = null
    store = null

    constructor({store = null, id = v4uuid(), sailNumber = "", boatClass = null}) {
        this.id = id
        this.sailNumber = sailNumber
        this.boatClass = boatClass
        this.store = store
    }

    get className() {
        return this.boatClass ? this.boatClass.name : "No class"
    }

    get iconName() {
        return this.boatClass ? this.boatClass.iconName : ""
    }

    delete = () => {
        this.store.removeBoat(this)
    }

    asJSON = () => {
        // Swap object refs for IDs
        return {
            id: this.id,
            sailNumber: this.sailNumber,
            boatClassId: this.boatClass ? this.boatClass.id : ""
        }
    }

    static fromJSON(props, store) {
        // Swap IDs for real objects
        let boatClass = store.boatClassesStore.findBoatClass(props.boatClassId)
        delete props.boatClassId
        props.boatClass = boatClass

        return new Boat({
            store: store,
            ...props
        })
    }
}

export class BoatsStore {
    @observable boats = []
    @observable loaded = false
    storageImpl
    boatClassesStore

    constructor(storageImpl, boatClassesStore) {
        this.storageImpl = storageImpl
        this.boatClassesStore = boatClassesStore
        autorun(this.saveData)
    }

    saveData = async () => {
        let boats = this.boats.slice()
        if (!this.loaded) {
            return
        }
        await this.storageImpl.save(boats.map(boat => boat.asJSON()))
    }

    loadData = async () => {
        let jsonArray = await this.storageImpl.getStorageObjects()
        let boats = jsonArray.map(jsonObj => Boat.fromJSON(jsonObj, this))
        this.boats.push(...boats)
        this.loaded = true
    }

    newBoat = ({id = v4uuid(), sailNumber = "", boatClass = null}) => {
        let newBoat = new Boat({store: this, id: id, sailNumber: sailNumber, boatClass: boatClass})
        this.boats.push(newBoat)
        return newBoat
    }

    removeBoat = (boat) => {
        this.boats.splice(this.boats.indexOf(boat), 1)
    }

    findBoat = (id) => {
        return this.boats.find(boat => boat.id === id)
    }
}
