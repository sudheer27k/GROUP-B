import React from 'react'
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class GetHolidaysApi{
    constructor() {
        this.jwt = localStorage.getItem('jwt');
        this.headers = {
          'access-token': this.jwt,
        };
        this.axisConfig = {
          headers: this.headers,
        };
      }
    async getAllHolidays(){
        try{
            const response = await axios.get("http://localhost:3000/holidays", this.axisConfig);
             if (response.data.status){    
                return response.data.holidays
             }
            
        }catch(err){
            console.log(err)
        }
    }

   

}
export default GetHolidaysApi;