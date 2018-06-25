import { observable, autorun } from "mobx"
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

    get asJSON() {
        return {
            id: this.id,
            name: this.name,
            pyNumber: this.pyNumber,
            iconName: this.iconName
        }
    }

    static fromJSON(props, store) {
        return new BoatClass({
            store: store, 
            ...props
        })
    }
}

export class BoatClassesStore {
    @observable boatClasses = []
    storageImpl = null

    constructor(storageImpl = null) {
        this.storageImpl = storageImpl
        autorun(this.saveData)
    }

    saveData = async () => {
        let boatClasses = this.boatClasses.slice()
        if (!this.loaded) {
            return
        }
        await this.storageImpl.save(boatClasses.map(boatClass => boatClass.asJSON))
    }

    loadData = async () => {
        try {
            let jsonArray = await this.storageImpl.getStorageObjects()
            let boatClasses = jsonArray
                .map(jsonObj => BoatClass.fromJSON(jsonObj, this))
            this.boatClasses.push(...boatClasses)
        }
        catch (err) {
            console.log(err)
        }
        this.loaded = true
    }

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

    findBoatClass = (id) => {
        return this.boatClasses.find(bClass => bClass.id === id)
    }
}
