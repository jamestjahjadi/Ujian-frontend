import React, { useState } from "react";
import { MDBInput,MDBAlert } from 'mdbreact';
import { Button } from "reactstrap"
import { connect } from 'react-redux'
import Slide from 'react-reveal/'
import {LoginUsers,clearState} from '../redux/action'
import { Redirect } from "react-router-dom";
import {  MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import {API} from '../support/apiurl'
import Axios from 'axios'
import { useEffect } from "react";
import Swal from 'sweetalert2'
const Admin = (props) => {


const [signin,setSignIn]=useState({
  username:'',
  password:''
})

const [newUser,setNewUser]=useState({
  username:'',
  password:'',
  role:'user'
})

const [isAlert,setAlert]=useState(false)
const [isModalOpen, SetModal]=useState(false)

const onSignInchange=(e)=>{
  setSignIn({...signin,[e.target.name]:e.target.value})
}

const onRegisterChange=(e)=>{
  setNewUser({...newUser,[e.target.name]:e.target.value})
}

const toggle=(isModalOpen)=>{
  SetModal(!isModalOpen)
}

if(props.isLoggedSuccess){
  return <Redirect to='/'/>
}

const onSignSubmit=(e)=>{
  e.preventDefault()
  props.LoginUsers(signin)
}

const isRegister=()=>{
  SetModal(!isModalOpen)
}

const newUserSign=()=>{
  
  Axios.get(`${API}/users?username=${newUser.username}`)
  .then((res)=>{
    if(res.data.length>0){
      setAlert(!isAlert)
    }else{
      Axios.post(`${API}/users`, newUser)
      .then((res)=>{
        Swal.fire({
          icon: 'Success',
          title: 'Register Success',
        })
      }).catch((err)=>{
        console.log('error')
      })
    }
  })
  }


return (
  <div>
    <MDBModal isOpen={isModalOpen} toggle={()=>toggle(isModalOpen)}>
        <MDBModalHeader toggle={toggle}>Register</MDBModalHeader>
        <MDBModalBody>
      <div className='pb-2' style={{alignItems:'center'}}>
    
      <MDBInput label="Type your username" onChange={onRegisterChange} name='username' group type="text" validate />
        <MDBInput label="Type your password" onChange={onRegisterChange} name='password' group type="password" validate />
        
      </div>
        </MDBModalBody>
        {
             isAlert?
          <MDBAlert color="danger" >
             Username has already been taken <span className='float-right hovererr font-weight-bold' onClick={()=>setAlert(!isAlert)}>X</span>
         </MDBAlert>
         :
         null

           }
        <MDBModalFooter>
          <MDBBtn color="dark" onClick={toggle}>Close</MDBBtn>
          <MDBBtn color="primary" onClick={newUserSign}>Register</MDBBtn>
        </MDBModalFooter>
      </MDBModal>


    <div className='d-flex justify-content-center align-items-center ml mt-5' style={{height:'60vh'}}>
       <Slide>
         <form style={{width:'30%'}} onSubmit={onSignSubmit}>
           <p className="h5 text-center mb-4">Sign in</p>
           <div className="grey-text">
             <MDBInput label="Type your username" icon="envelope" name='username' onChange={onSignInchange} value={signin.username} group type="text" validate error="wrong"
               success="right" />
             <MDBInput label="Type your password" icon="lock" name='password' onChange={onSignInchange} value={signin.password} group type="password" validate />
           </div>
           {
             props.isWrongLogged?
          <MDBAlert color="danger" >
             {props.isError} <span className='float-right hovererr font-weight-bold' onClick={()=>props.clearState()}>X</span>
         </MDBAlert>
         
         :
         null

           }
           <div className="text-center">
             <Button outline color='dark' type='submit'> login</Button>
             <Button outline color='dark' onClick={isRegister}>Register</Button>
           </div>
         </form>
       </Slide>
    </div>
  </div>
);
};

const MapStatetoProps=(state)=>{
  return state.Auth
}

export default connect(MapStatetoProps, {LoginUsers,clearState})(Admin);