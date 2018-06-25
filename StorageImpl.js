import _ from 'lodash'
import { AsyncStorage } from 'react-native'

export default class StorageImpl {
    storageKey
    devModeDefaultData

    constructor(storageKey = "", devModeDefaultData = []) {
        this.storageKey = storageKey
        this.devModeDefaultData = devModeDefaultData
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
            if (__DEV__) {
                console.log("Dev mode: returning fake data")
                return this.devModeDefaultData
            }
    
            console.log("No data: returning empty list")
            return []

        } catch (err) {
            console.log(err)
            return []
        }
    }
}