import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import {API} from '../support/apiurl'
import  { Button } from 'reactstrap'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'
import {changetoRupiah} from '../support/changetorupiah'

import {  MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

const ProductDetail = (props) => {

const [isProductDetail, setProductDetail]=useState({})
const [isCategoryProduct,setCategoryProduct]=useState({})
const [isModalOpen, SetModal]=useState(false)
const [isQuantityProduct, setQuantity]=useState(0)

useEffect(()=>{
    Axios.get(`${API}/products/${props.match.params.id}`)
    .then((res)=>{
        setProductDetail(res.data)
    }).catch((err)=>{
        console.log('error')
    })
},[])

const AddToCart=()=>{
    if(props.User.isLoggedSuccess&&props.User.role==='user'){
        var isUserTransaction={
            status:'oncart',
            userId:props.User.id
        }
        Axios.get(`${API}/transactions?status=oncart&userId=${props.User.id}`)
        .then((respond1)=>{
            if(respond1.data.length){
                var transactionDetails={
                    transactionId:respond1.data[0].id,
                    productId:isProductDetail.id,
                }
                Axios.post(`${API}/transactiondetails`, transactionDetails)
                .then((respond2)=>{
                    Swal.fire({
                        icon: 'Success',
                        title: 'Added To Cart',
                      })
                })
            }else{
                Axios.post(`${API}/transactions`, isUserTransaction)
                .then((respond3)=>{
                    var transactionDetails={
                        transactionId:respond3.data.id,
                        productId:isProductDetail.id,
                    }
                    Axios.post(`${API}/transactiondetails`, transactionDetails)
                    .then((respond4)=>{
                        Swal.fire({
                            icon: 'Success',
                            title: 'Added To Cart',
                          })
                    })
                })
            }
        }).catch((err)=>{
            console.log('error')
            
        })
    }else{
        SetModal(!isModalOpen)
    }
}

useEffect(()=>{
    Axios.get(`${API}/brands`)
    .then((res1)=>{
        setCategoryProduct(res1.data)
    }).catch((err)=>{
        console.log('error') 
    })
},[])

const toggle=(isModalOpen)=>{
    SetModal(!isModalOpen)
}






return(
    <div className='paddingatas'>

      <MDBModal isOpen={isModalOpen} toggle={()=>toggle(isModalOpen)}>
        <MDBModalHeader toggle={toggle}>Notification</MDBModalHeader>
        <MDBModalBody>
          {
              props.User.role==='admin'?"Sorry Admin can't buy products"
              : "Sorry Please Sign In First"
          }
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="dark" onClick={toggle}>Close</MDBBtn>
          {
              props.User.role==='admin'?null:
        <Link to='/login '>
          <MDBBtn color="primary">Sign In</MDBBtn>
        </Link>
          }
        </MDBModalFooter>
      </MDBModal>
    
    <div className='row'>
        <div className='col-md-4'>
            <img src={`${isProductDetail.image}`} alt={`${isProductDetail.katalog}`} height='100%' width='100%'/>
        </div>
        <div className='col-md-8 p-2'>
            <div  style={{letterSpacing:'8px', textTransform:'uppercase',fontWeight:'lighter'}}>
                <h3>{isProductDetail.katalog}</h3>
                <h5>{isProductDetail.brandId}</h5>
            </div>
                <div>
                    {changetoRupiah(isProductDetail.price)}
                </div>
                <div className='col-md-7 p-2'>
                {isProductDetail.description}
                </div>
              <Button outline color='dark' onClick={AddToCart}>Add to Cart</Button>  
        </div>
    </div>
    </div>
)
}


const MapStateToProps=(state)=>{
    return{User:state.Auth}
}

export default connect(MapStateToProps)(ProductDetail)