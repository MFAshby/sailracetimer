import { observable, autorun } from "mobx";
import v4uuid from './uuid'

export class Person {
    id = null
    @observable name = ""
    @observable imageUri = null
    store = null

    static fromJSON(obj, store) {
        return new Person({store: store, ...obj})
    }

    constructor({store = null, id = v4uuid(), name = "", imageUri = null}) {
        this.id = id
        this.name = name
        this.imageUri = imageUri
        this.store = store
    }

    delete = () => {
        this.store.removePerson(this)
    }

    asJSON = () => {
        return {
            id: this.id,
            name: this.name,
            imageUri: this.imageUri
        }
    }
}

const STORAGE_KEY = "net.mfashby.sailracetimer.peoplestore"

export class PeopleStore {
    @observable people = []
    @observable loaded = false
    storageImpl = null

    constructor(storageImpl = null) {
        this.storageImpl = storageImpl
        autorun(this.saveData)
    }

    saveData = async () => {
        let people = this.people.slice()
        if (!this.loaded) {
            return
        }
        await this.storageImpl.save(people.map(person => person.asJSON()))
    }

    loadData = async () => {
        try {
            let jsonArray = await this.storageImpl.getStorageObjects()
            let people = jsonArray
                .map(jsonObj => Person.fromJSON(jsonObj, this))
            this.people.push(...people)
        }
        catch (err) {
            console.log(err)
        }
        this.loaded = true
    }

    newPerson = ({id = v4uuid(), name = "", imageUri = null}) => {
        let newPerson = new Person({
            store: this, 
            id: id,
            name: name, 
            imageUri: imageUri,
        })
        this.people.push(newPerson)
        return newPerson
    }

    removePerson = person => {
        this.people.splice(this.people.indexOf(person), 1)
    }

    findPerson = (id) => {
        return this.people.find(person => person.id === id)
    }
}