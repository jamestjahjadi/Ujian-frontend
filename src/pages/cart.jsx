import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead,MDBTableFoot } from 'mdbreact';
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import { API } from '../support/apiurl';
import { connect } from 'react-redux'
import {changetoRupiah} from '../support/changetorupiah'
import { Button } from 'reactstrap';

const Cart = (props) => {

    const [isInsideCart,setInsideCart]=useState([])
    const [isQuantityProduct, setQuantity]=useState(1)

    useEffect(()=>{
        getData()
    },[])

    const getData=()=>{
        Axios.get(`${API}/transactions?_embed=transactiondetails&userId=${props.User.id}&status=oncart`)
        .then((res)=>{
            console.log(res.data[0].transactiondetails)
            
            var isCartArr=[]
            res.data[0].transactiondetails.forEach(element=>{
                isCartArr.push(Axios.get(`${API}/products/${element.productId}`))
            })
            Axios.all(isCartArr)
            .then((res1)=>{
                res1.forEach((val , index)=>{
                    res.data[0].transactiondetails[index].dataprod=val.data
                })
                console.log(res.data[0].transactiondetails);
                
                setInsideCart(res.data[0].transactiondetails)
            })
        }).catch((err)=>{
            console.log('error')
            
        })
    }

const isQtyChange=(e)=>{
    if(e.target.value===0){
        Axios.delete(`${API}/transactiondetails/${e.target.name}`)
        .then((res)=>{
            getData()
        })
    }
}

const deleteCart=(index)=>{
    Axios.delete(`${API}/transactiondetails/${index}`)
    .then((res)=>{
        getData()
    }).catch((err)=>{
        console.log('error')
    })
}

const totalPrice=()=>{
    var total=0
    isInsideCart.forEach((val)=>{
        total+=parseInt(val.dataprod.price)
    })
    return(changetoRupiah(total))
}

    const isCartData=()=>{
        return isInsideCart.map((val,index)=>{
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{val.dataprod.katalog}</td>
                    <td ><img src={val.dataprod.image} height='200' alt=""/></td>
                    <td>   
                    {isQuantityProduct}
                    </td>
                    <td>{changetoRupiah(val.dataprod.price)}</td>
                    <td><Button outline color='danger' size='md' onClick={()=>deleteCart(val.id)}>Delete</Button></td>
                </tr>
                
            )
        })
    }


     

  return (
    <MDBTable borderless className='cartmargin' style={{textAlign:'center'}}>
      <MDBTableHead>
        <tr>
          <th>No</th>
          <th>Product</th>
          <th>Image</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {
            isCartData()
        }
      </MDBTableBody>
      <MDBTableFoot>
        <tr>
                <th></th>
                <th></th>
                <th></th>
                <th>Total Price</th>
                <th>{totalPrice()}</th>
                <Button outline color='dark'>Checkout</Button>
        </tr>
      </MDBTableFoot>
    </MDBTable>
  );
}


const mapStatetoProps=(state)=>{
    return {
        User:state.Auth
    }
}

export default connect(mapStatetoProps)(Cart);