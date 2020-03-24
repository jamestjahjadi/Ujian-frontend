import { combineReducers } from 'redux'
import Loginreducers from './loginreducer'
import Cartreducers from './cartreducer'
export default combineReducers ({
    Auth:Loginreducers,
    Cart:Cartreducers
})