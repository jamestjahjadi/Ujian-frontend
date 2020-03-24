import {isLogged , isFailedLogged , isLoggedLoading} from './type'
import Axios from 'axios'
import {API} from '../../support/apiurl'

export const LoginUsers = ({users,password})=>{
    return (dispatch)=>{
        dispatch({type:isLoggedLoading})
            if(users==='' || password===''){
                return dispatch({type:isFailedLogged,payload:'Please fill in your username or password'})
            }else{
                Axios.get(`${API}/users`,{
                    params:{
                        username:users,
                        password:password,
                    }
                }).then((res)=>{
                    if(res.data.length){
                        localStorage.setItem('ID', res.data[0].id)
                        dispatch({type:isLogged,payload:res.data[0]})
                    }else{
                        dispatch({type:isFailedLogged,payload:'wrong username or password please try again'})
                    }
                }).catch((err)=>{
                    dispatch({type:isFailedLogged,payload:'wrong username or password please try again'})
                })
            }
    }
}

export const clearState=()=>{
    return{
            type:'ClearState'
            
    }
}

export const stayLogged=(dataId)=>{
    return{
        type:isLogged,
        payload:dataId
    }
}