import _ from 'lodash'
import { AsyncStorage } from 'react-native'

export default class StorageImpl {
    storageKey
    defaultData

    constructor(storageKey = "", defaultData = []) {
        this.storageKey = storageKey
        this.defaultData = defaultData
    }

    save = async (value) => {
        let json = JSON.stringify(value)
        await AsyncStorage.setItem(this.storageKey, json)
        console.log("Saved", json)
    }

    getStorageObjects = async () => {
        try {
            console.log("Getting storage item for key ", this.storageKey    )
            let item = await AsyncStorage.getItem(this.storageKey)
            if (!_.isEmpty(item)) {
                console.log("Got from storage", item)
                return JSON.parse(item)
            }
            console.log("No data, returning default")
            return this.defaultData
        } catch (err) {
            console.log(err)
            return []
        }
    }
}