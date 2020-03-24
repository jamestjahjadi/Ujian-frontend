import React from 'react';
import Axios from 'axios'
import {API} from '../support/apiurl'
import { useState } from 'react';
import { useEffect } from 'react';

const CardDetail=(props)=>{
    const [iscarddetail, setcard]=useState([])
    useEffect(()=>{
        Axios.get(`${API}/products/${props.match.params.id}`)
        .then((res)=>{
            setcard(res.data)
        }).catch((err)=>{
            console.log('error')
        })
    },[])
        
}

export default CardDetail