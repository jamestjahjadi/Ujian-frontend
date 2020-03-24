import React, {useState, useEffect} from 'react';
import {  MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBInput  } from 'mdbreact';
import Fade from 'react-reveal/Fade'
import Axios from 'axios'
import {API} from '../support/apiurl'
import {changetoRupiah} from '../support/changetorupiah'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
const ProductList = () => {
    const [isProductDetail,setProductDetail]=useState([])
    const [searchProduct, setSearch]=useState([])
    useEffect(()=>{
        Axios.get(`${API}/products`)
        .then((res)=>{
            setProductDetail(res.data)
        })
    },[])

  const isSearchChange=(e)=>{
    setSearch({[e.target.name]:e.target.value})
    console.log(searchProduct)
    
  }
    
  return (
      isProductDetail.map((val,index)=>{
          return(
            <div>
              <div className='searchForm mb-5 d-flex justify-content-center' style={{height:'10%'}}>
                {
                  index===1?
                  <form>
                    <MDBInput type="text" id='filter' label='Search....' name='searchKey' onChange={isSearchChange}/>
                  </form>:null
                }
            </div>
              <Fade left key={index}> 
            <MDBRow>
           <MDBCol lg="3" md="6" className="mb-lg-0 mb-4">
              <MDBCard style={{ width: "20rem" }} className="align-items-center">
                <MDBCardImage className="img-fluid" src={`${val.image}`} waves />
                <MDBCardBody>
          <MDBCardTitle style={{letterSpacing:'8px', textTransform:'uppercase',fontWeight:'lighter'}}>{`${val.katalog}`}</MDBCardTitle>
                  <MDBCardText>
                    {
                        changetoRupiah(val.price)
                    }
                  </MDBCardText>
                  <Link to={`/product-detail/${val.id}`}>
                    <Button outline color='dark'>Product Detail</Button>
                  </Link>
                </MDBCardBody>
              </MDBCard>
           </MDBCol>  
            </MDBRow>
              </Fade>
            </div>
          )
      })

  )
}

export default ProductList;