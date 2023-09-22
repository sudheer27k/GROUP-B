import React from 'react'
import axios from 'axios';
import { env } from '../env';
import 'react-toastify/dist/ReactToastify.css';


class AddUserApi{
    constructor() {
        this.jwt = localStorage.getItem('jwt');
        this.headers = {
          'access-token': this.jwt,
        };
        this.axisConfig = {
          headers: this.headers,
        };
      }
    async  AddUser(Info) { 
        
         
        try{
            const response = await axios.post(`${env.REACT_APP_API}/user/add`, Info,this.axisConfig);
             return response
             
            
        }catch(err){
            console.log(err)
        }
    }

    async getAllUsers(){
        try{
            const response = await axios.get(`${env.REACT_APP_API}/user/allusers`, this.axisConfig);
             if (response.data.status){    
                return response.data.users
             }
            
        }catch(err){
            console.log(err)
        }
    }
    async deleteUser(id){
        try{
            const response = await axios.delete(`${env.REACT_APP_API}/user/deleteUser/${id}`, this.axisConfig);
             return response.status
            
        }catch(err){
            console.log(err)
        }
    }

    async updateUser(id,newUser){
        console.log(id,newUser ,"this is from services")
        try{
            const response = await axios.put(`${env.REACT_APP_API}/user/update/${id}`,newUser, this.axisConfig);
            console.log()
             console.log(response.status)
             return response.status
            
        }catch(err){
            console.log(err)
        }
    }


}
export default AddUserApi;