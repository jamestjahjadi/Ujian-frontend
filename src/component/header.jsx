import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse
} from "mdbreact";
import { connect } from 'react-redux'
import {FaUser} from 'react-icons/fa'
import { clearState } from "../redux/action";
import { FiShoppingCart } from "react-icons/fi";
import {API} from '../support/apiurl'
import Axios from 'axios'
import { Button } from "reactstrap";

class NavbarPage extends Component {
state = {
  isOpen: false,
  isTotalCart:0
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}
componentDidMount(){
  Axios.get(`${API}/transactiondetails?transactionid=${this.props.ID}`)
  .then((res)=>{
    this.setState({isTotalCart:res.data.length})
    
  }).catch((err)=>{
    console.log('error')
    
  })
}


render() {
  return (
    
      <MDBNavbar color="white" dark expand="md" fixed='top' >
        <MDBNavbarBrand>
        <MDBNavLink to='/'>
          <strong className="black-text" style={{letterSpacing:'8px', textTransform:'uppercase',fontWeight:'lighter'}}>so normal store</strong>
        </MDBNavLink>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right>  
           {
            this.props.role==='admin'||this.props.role==='user'?
            <Button outline color='transparent' size='sm' className='black-text'>Change Password </Button>:null
          }
           <MDBNavItem >
             {
               this.props.role==='admin'?
            <MDBNavLink to='/admineditorial' className='black-text'>
                                Manage Admin
                            </MDBNavLink>
                            : 
                this.props.role==='user'?
            <MDBNavLink to='/cart' className='black-text'>
                            <FiShoppingCart  className='black-text'/> 
                            Cart  ({this.state.isTotalCart})
                        </MDBNavLink> 
                        :
                        null 
             }
            </MDBNavItem>  
            {
               this.props.isLoggedSuccess? 
               <MDBNavLink to='/' className='black-text' onClick={()=>this.props.clearState()}><FaUser/>
              Sign Out 
             </MDBNavLink>
               :
             <MDBNavLink to='/login' className='black-text'><FaUser/>
             {
               this.props.isLoggedOut? localStorage.removeItem('ID'):null
             }
              Sign In
             </MDBNavLink>
            }
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>


    );
  }
}

const MapStatetoProps=(state)=>{
  return state.Auth
}

export default connect(MapStatetoProps,{clearState})(NavbarPage);