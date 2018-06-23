import { observable } from "mobx";
import v4uuid from './uuid'

export class Person {
    id = null
    @observable name = ""
    @observable imageUri = null
    store = null

    constructor({store = null, id = v4uuid(), name = "", imageUri = null}) {
        this.id = id
        this.name = name
        this.imageUri = imageUri
        this.store = store
    }

    delete = () => {
        this.store.removePerson(this)
    }
}

class PeopleStore {
    @observable people = []

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
}

export default new PeopleStore()