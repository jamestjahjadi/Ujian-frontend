import React, { useEffect, useState } from 'react';
import Header from './component/header'
import MidHead from './component/jumbotron'
import Login from './pages/Login'
import './App.css';
import { Route,Switch } from 'react-router-dom'
import AdminEditorial from './pages/admineditorial'
import { connect } from 'react-redux'
import { stayLogged }  from './redux/action'
import {API} from './support/apiurl'
import Axios from 'axios'
import Productlist from './pages/productlist'
import Productdetail from './pages/productdetail'
import ProductBrand from './pages/productcategory'
import Cart from './pages/cart'
function App({stayLogged}) {

const [Loading,setLoading]=useState(true)

  useEffect(()=>{
    const id=localStorage.getItem('ID')
    Axios.get(`${API}/users/${id}`)
    .then(respond=>{
      stayLogged(respond.data)
    }).catch((err)=>{
      console.log(err)
    }).finally(()=>{
      setLoading(false)
    })
  })

  if(Loading){
   return (<div>
      loading....
    </div>
   )
  }

  return (
    <div>

     <Header/>
      <Switch>
        <Route path='/' exact component={MidHead}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/admineditorial' exact component={AdminEditorial}/>
        <Route path='/product' exact component={Productlist}/>
        <Route path='/product-detail/:id' exact component={Productdetail}/>
        <Route path='/product-brand/:id' exact component ={ProductBrand}/>
        <Route path='/cart' exact component ={Cart}/>
      </Switch>

    </div>
  );
}

export default connect(null,{stayLogged})(App);
