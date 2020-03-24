import React, { useState, useEffect } from 'react';
import { MDBTable } from 'mdbreact';
import Axios from 'axios'
import {API} from '../support/apiurl'
import {changetoRupiah} from '../support/changetorupiah'
import { Input,Button} from 'reactstrap'
import Swal from 'sweetalert2'


const AdminEditorial = () => {

    const [editProducts,setEditProducts]=useState({
        productShirt:[]
    })
    const [isBrandname,setBrandName]=useState([])
    const [isEdit,setEdit]=useState(false)
    const [isEditIndex,setEditIndex]=useState()

    const isEditData=(id)=>{
        setEdit(!isEdit)
        setEditIndex(id)
    }

    const isCancelEdit=()=>{
        setEditIndex(-1)
        setEdit(false)
    }

    const [isNewProduct,setNewProduct]=useState({
        katalog:'',
        category:'',
        brandId:'',
        description:'',
        price:0,
        image:''
    })

    const [isChangeProduct,setChangeProduct]=useState({
        katalog:'',
        category:'',
        brandId:'',
        description:'',
        price:0,
        image:''
    })

    useEffect(()=>{
        Axios.get(`${API}/products?_expand=brand`)
        .then((res)=>{
            Axios.get(`${API}/brands`)
                .then((isbrand)=>{
                setEditProducts({...editProducts, productShirt:res.data,})
                setBrandName(isbrand.data)
                
                
        })
        }).catch((err)=>{
            console.log('error')  
        })
    },[])




    const isDelete=(id,index)=>{
        Swal.fire({
            title: `Are you sure you want to delete ${editProducts.productShirt[index].katalog} ?`,
            text: "You won't be able to revert this!",
            imageUrl: `${editProducts.productShirt[index].image}`,
            imageWidth:300,
            imageHeight:300,
            showCancelButton: true,
            confirmButtonColor: '#272727',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              Axios.delete(`${API}/products/${id}`)
              .then((res)=>{
                Axios.get(`${API}/products?_expand=brand`)
                .then((res)=>{
                    Axios.get(`${API}/brands`)
                        .then((isbrand)=>{
                        setEditProducts({...editProducts, productShirt:res.data,brandName:isbrand.data})
                })
                }).catch((err)=>{
                    console.log('error')  
                })
              })
            }
          })
    }

const isEditDataChange=(e)=>{
    setChangeProduct({...isChangeProduct,[e.target.name]:e.target.value})
    console.log({...isChangeProduct})
    
}


const isChangeEdit=(id)=>{
    Axios.put(`${API}/products/${id}`, isChangeProduct)
    .then((res)=>{
        Axios.get(`${API}/products?_expand=brand`)
        .then((res)=>{
            Axios.get(`${API}/brands`)
                .then((isbrand)=>{
                setEditProducts({...editProducts, productShirt:res.data,brandName:isbrand.data})
        })
        }).catch((err)=>{
            console.log('error')  
        })
    }).catch((err)=>{
        console.log(err);
        
    })
    setEditIndex(-1)
    setEdit(false)
}
   
const renderProduct=()=>{
    const printTable=editProducts.productShirt
    
    return printTable.map((val,index)=>
    {
        return(
            isEdit && isEditIndex===val.id?(
                (
                    <tr key={index}>
                       <td>{index+1}</td>
                       <td><Input type='text' name='katalog' defaultValue={editProducts.productShirt[index].katalog}  onChange={isEditDataChange} placeholder='Input Name'/></td>
                       <td><Input type='text' name='category' defaultValue={editProducts.productShirt[index].category}  onChange={isEditDataChange} placeholder='Input Category'/></td>
                       <td>
                       <Input type="select" name="brandId" defaultValue={isBrandname[index].name}  onChange={isEditDataChange}>
                                <option hidden>Brand Name</option>
                            {
                                isBrandCategory()
                            }
                        </Input>
                       </td>
                       <td><Input type='text' onChange={isEditDataChange} name='description' defaultValue={editProducts.productShirt[index].description}  placeholder='Input Description'/></td>
                       <td><Input type='number' name='price' defaultValue={editProducts.productShirt[index].price} onChange={isEditDataChange} placeholder='Input Price'/></td>
                       <td><Input type='text' name='image' defaultValue={editProducts.productShirt[index].image} onChange={isEditDataChange} placeholder='Input Image'/></td>
                       <td>
                           <Button outline color='blue-grey' onClick={()=>isChangeEdit(val.id)} >Save</Button>
                           <Button outline color='dark' onClick={isCancelEdit} >Cancel</Button>
                       </td>
                   </tr>
               )
            ):
            (
                <tr key={index}>
                   <td>{index+1}</td>
                   <td>{val.katalog}</td>
                   <td>{val.category}</td>
                   <td>{val.brand.name}</td>
                   <td>{val.description}</td>
                   <td>{changetoRupiah(val.price)}</td>
                   <td><img src={val.image} alt={index} height='200' width='200'/></td>
                   <td>
                       <Button outline color='blue-grey' onClick={()=>isEditData(val.id)}>Edit</Button>
                       <Button outline color='dark' onClick={()=>isDelete(val.id,index)}>Delete</Button>
                   </td>
               </tr>
           )
        )
    })
}

const isAddDataChange=(e)=>{
    setNewProduct({...isNewProduct,[e.target.name]:e.target.value})
    console.log({...isNewProduct})
    console.log({isBrandname:isBrandname[0].id})
    
    
}

const isBrandCategory=()=>{
    return (isBrandname.map((val,index)=>{
        return <option key={index} value={val.id}>{val.name}</option>
    }))
}

const isAddData=()=>{
    Axios.post(`${API}/products`,isNewProduct )
        .then((res)=>{
            Axios.get(`${API}/products?_expand=brand`)
            .then((res1)=>{
                setEditProducts({...editProducts,productShirt:res1.data})
            })
        }).catch((err)=>{
            console.log('wrong input') 
        })
}


    // const isCategoryAdd=()=>{
    //     return editProducts.brandName.map((val,index)=>{
    //         return <option key={index} value={val.id}>{val.name}</option>
    //     })
    // }

  return (
    <div className='pt-5 table-responsive' style={{textAlign:'center'}}>
    <MDBTable>
      <thead>
        <tr>
          <th scope='col'>No.</th>
          <th scope='col'>Name</th>
          <th scope='col'>Category</th>
          <th scope='col'>Brands</th>
          <th scope='col'>Description</th>
          <th scope='col'>Price</th>
          <th scope='col'>Image</th>
          <th scope='col'>action</th>
        </tr>
      </thead>
      <tbody>
           {
               renderProduct()
           }
      </tbody>
      <tfoot>
          <tr>
              <td></td>
              <td><Input type='text' onChange={isAddDataChange}  name='katalog'  placeholder='Input Name'/></td>
              <td><Input type='text' onChange={isAddDataChange}  name='category' placeholder='Input Category'/></td>
              <td>
                <Input type="select" name="brandId" onChange={isAddDataChange}>
                     <option hidden>Brand Name</option>
                  {
                      isBrandCategory()
                  }
                </Input>
              </td>
              <td><Input type='text' onChange={isAddDataChange} name='description' placeholder='Input Description'/></td>
              <td><Input type='text' onChange={isAddDataChange}  name='price' placeholder='Input Price'/></td>
              <td><Input type='text' onChange={isAddDataChange}  name='image' placeholder='Input Image'/></td>
              <td>
              <Button outline color='dark' onClick={isAddData}>Add Data</Button>
              </td>
          </tr>
      </tfoot>
    </MDBTable>

      </div>
  );
}

export default AdminEditorial;