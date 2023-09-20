import React from 'react'
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class GetLoginUser{

    constructor() {
        this.jwt = localStorage.getItem('jwt');
        this.headers = {
          'access-token': this.jwt,
        };
        this.axisConfig = {
          headers: this.headers,
        };
      }
    async getLoginUserDetails(id){
        try{
            const response = await axios.get(`http://localhost:3000/user/${id}`, this.axisConfig);
             if (response.data.status){    
                return response.data.user
             }
            
        }catch(err){
            console.log(err)
        }
    }

    async UserProjectAllocationDetails(id){
      try{
          const response = await axios.get(`http://localhost:3000/userProject/${id}`, this.axisConfig);
           return response
      }catch(err){
          console.log(err)
      }
  }
   

}
export default GetLoginUser;