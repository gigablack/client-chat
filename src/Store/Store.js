import { createStore } from 'redux'
import { addMessageReducer } from './Reducers'

const store = createStore(addMessageReducer)

export default store

