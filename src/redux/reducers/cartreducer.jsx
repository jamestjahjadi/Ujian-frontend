import {isCartTotal , isCartEmpty} from '../action/type'

const INITIAL_STATE={
    isTotalCart:0,
    isCartEmpty:true
}

export default (state=INITIAL_STATE , action)=>{
    switch(action.type){
        case isCartTotal:
            return{...state,isCartEmpty:false , isTotalCart: action.payload }
        case isCartEmpty:
            return{...state,isCartEmpty:true, isTotalCart: 0}
        default:
            return state
    }   
}