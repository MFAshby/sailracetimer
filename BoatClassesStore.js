import { observable } from "mobx"
import v4uuid from './uuid'

export class BoatClass {
    id = null
    @observable name = null
    @observable pyNumber = null
    @observable iconName = null
    store = null

    constructor({store = null, 
        id = v4uuid(), 
        name = "", 
        pyNumber = 1000, 
        iconName = ""}) {
        this.store = store
        this.id = id
        this.name = name
        this.pyNumber = pyNumber
        this.iconName = iconName
    }

    delete = () => {
        this.store.removeBoatClass(this)
    }
}

class BoatClassesStore {
    @observable boatClasses = []

    newBoatClass = ({id = v4uuid(), name = "", pyNumber = 1000, iconName = ""}) => {
        let nbc = new BoatClass({store:this, 
            id:id, 
            name:name, 
            pyNumber:pyNumber, 
            iconName:iconName})
        this.boatClasses.push(nbc)
        return nbc
    }

    removeBoatClass = boatClass => {
        this.boatClasses.splice(this.boatClasses.indexOf(boatClass), 1)
    }
}

export default new BoatClassesStore()