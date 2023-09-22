import React from 'react'
import axios from 'axios';
import { env } from '../env';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class AddEventApi{
    constructor() {
        this.jwt = localStorage.getItem('jwt');
        this.headers = {
          'access-token': this.jwt,
        };
        this.axisConfig = {
          headers: this.headers,
        };
      }
    async  AddEvent(Info) { 
        try{
            const response = await axios.post(`${env.REACT_APP_API}/event/add`, Info, this.axisConfig);
             console.log(response)
             if (response.data.status){
                toast.success("Event Added successfully")
                return 'success'
             }
            
        }catch(err){
            console.log(err)
        }
    }

    async getAllEvents(){
        try{
            const response = await axios.get(`${env.REACT_APP_API}/event/allEvents`, this.axisConfig);
             console.log(response)
             if (response.data.status){
              
                return response.data.events
             }
            
        }catch(err){
            console.log(err)
        }
    }
    async deleteEvent(id){
        try{
            const response = await axios.delete(`${env.REACT_APP_API}/event/deleteEvent/${id}`, this.axisConfig);
             console.log(response.status)
             return response.status
            
        }catch(err){
            console.log(err)
        }
    }


    async updateEvent(id,newEvent){
        try{
            const response = await axios.put(`${env.REACT_APP_API}/event/update/${id}`,newEvent, this.axisConfig);
          
             console.log(response.status)
             return response.status
            
        }catch(err){
            console.log(err)
        }
    }





}

    
export default AddEventApi