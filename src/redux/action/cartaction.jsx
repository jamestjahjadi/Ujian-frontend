import {isCartTotal , isCartEmpty } from './type'
import Axios from 'axios'
import {API} from '../../support/apiurl'

export const CartTotal = () => {
    return(dispatch)=> {
        Axios.get(`${API}/transactiondetails`)
        .then((res)=>{
            if(res.data.length){
                dispatch({type:isCartTotal, payload:(res.data.quantity)})
            }else{
                dispatch({type:isCartEmpty})
            }
        }).catch((err)=>{
            dispatch({type:isCartEmpty})
        })
    }
}