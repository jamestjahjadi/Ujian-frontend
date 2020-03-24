import React, { useState } from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';
import CardProduct from './body'
import Fade from 'react-reveal'
import Footer from '../component/footer'
import Productlist from '../pages/productlist'
import {MDBInput} from 'mdbreact'

const MidHead = (props) => {
 
  const [directShop,setDirectShop]=useState(false)
  const clickChange = () => {
    setDirectShop(!directShop)
  }






  return (
    <div style={{backgroundColor:"white"}} className='pt-5'>
        <Fade >
            <Jumbotron fluid style={{backgroundColor:'white', boxShadow:"none"}} >
                <Container fluid>
                <h1  className='d-flex justify-content-center' style={{letterSpacing:'8px', textTransform:'uppercase',fontWeight:'lighter'}}>Welcome to our normal store</h1>
                <p className='d-flex justify-content-center' style={{fontFamily:"Helvetica, sans-serif;"}}>Welcome to our normal store that sells normal T-shirt</p>
                <div className='d-flex justify-content-center'>
                  
                    <Button outline color='dark' onClick={clickChange}>
                      {
                        directShop?
                        'Back To Home'
                        :
                        'Shop Now'
                      }
                      </Button>
                      
                </div>
                </Container>
            </Jumbotron>

            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
              {
                directShop?
                  <Productlist/>
                :
                <CardProduct/>
              }
            </div>
            <Footer/>
        </Fade>
    </div>
  );
};

export default MidHead;