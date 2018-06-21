import { createStore } from 'redux'
import { mainReducer } from './Reducers.js'
store = createStore(mainReducer)
export { store }