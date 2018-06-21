import { mainReducer } from './Reducers'

function applyActions({state = undefined, actions = []}) {
    actions.forEach(action => state = mainReducer(state, action))
    return state
}

export {
    applyActions
}