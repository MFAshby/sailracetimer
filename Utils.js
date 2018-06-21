import _ from 'lodash'

function addObjById(existingObj, objToAdd) {
    return Object.assign({}, existingObj, putInObjectByID(objToAdd))
}

function putInObjectByID(obj) {
    return _.keyBy([obj], obj => obj.id)
}

function listToObjectById(list) {
    return _.keyBy(list, obj => obj.id)
}

export {
    addObjById,
    putInObjectByID,
    listToObjectById
}