import React, {useState} from 'react';
import {  MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import Fade from 'react-reveal/Fade'
import {Link} from 'react-router-dom'
import { Button } from 'reactstrap'

const CardProduct = () => {
    const [image,setimage]=useState([
        {
            id:1,
            nameProduct:'stussy',
            image:'./image/uistussy2.webp',
            description:'The Stüssy Spring ‘20 collection is leisurely and dynamic' 
        },
        {
            id:2,
            nameProduct:'Supreme',
            image:'./image/Supreme-3.jpg',
            description:'The Legendary Streetwear Brand'
        },
        {
            id:3,
            nameProduct:'Anti Social Social Club',
            image:'./image/assc.jpeg',
            description:'Anti Social Social Club'
        }
    ])



  return (
      image.map((val,index)=>{
          return(
              <Fade left key={index}> 
            <MDBCol className='test' >
              <MDBCard style={{ width: "22rem" }}>
                <MDBCardImage className="img-fluid" src={`${val.image}`} waves />
                <MDBCardBody>
          <MDBCardTitle style={{letterSpacing:'8px', textTransform:'uppercase',fontWeight:'lighter'}}>{`${val.nameProduct}`}</MDBCardTitle>
                  <MDBCardText>
                    {
                        `${val.description}`
                    }
                  </MDBCardText>
                 <Link to={`/product-brand/${val.id}`}>
                  <Button outline color='dark'>Shop Now</Button>
                 </Link>   
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
              </Fade>
          )
      })

  )
}

export default CardProduct;