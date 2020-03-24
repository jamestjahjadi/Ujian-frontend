import {isLogged , isFailedLogged , isLoggedLoading} from '../action/type'

const INITIAL_STATE={
    ID:'',
    username:'',
    isLoggedSuccess:false,
    isLoading:false,
    isError:'',
    isWrongLogged:false,
    isLoggedOut:true,
    role:''
}

export default (state=INITIAL_STATE , action)=>{
    switch(action.type){
        case isLogged:
            return {...state,isLoggedSuccess:true,isLoggedOut:false,...action.payload}
        case isFailedLogged:
            return {...state,isError:action.payload, isLoading:false,isWrongLogged:true}
        case isLoggedLoading:
            return {...state, isLoading:true}
        case 'ClearState':
            return INITIAL_STATE
        default:
            return state
    }
}

