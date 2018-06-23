import { observable } from "mobx";
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
}

class BoatsStore {
    @observable boats = []

    newBoat = ({id = v4uuid(), sailNumber = "", boatClass = null}) => {
        let newBoat = new Boat({store: this, id: id, sailNumber: sailNumber, boatClass: boatClass})
        this.boats.push(newBoat)
        return newBoat
    }

    removeBoat = (boat) => {
        this.boats.splice(this.boats.indexOf(boat), 1)
    }
}

export default new BoatsStore()