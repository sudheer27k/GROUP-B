// eventService.js

// import React from 'react'
import axios from 'axios';

// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export async function Fetchevents() {
//   try {
//     const response = await fetch('/api/events');
//     if (!response.ok) {
//       throw new Error('Failed to fetch event data');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }




class GetUserEvent {
  constructor() {
    this.jwt = localStorage.getItem('jwt');
    this.headers = {
      'access-token': this.jwt,
    };
    this.axisConfig = {
      headers: this.headers,
    };
  }

  async getAllEvents() {
    try {
      const response = await axios.get("http://localhost:3000/event/allEvents", this.axisConfig);
      console.log(response)
      if (response.data.status) {

        return response.data.events
      }

    } catch (err) {
      console.log(err)
    }
  }




}


export default GetUserEvent