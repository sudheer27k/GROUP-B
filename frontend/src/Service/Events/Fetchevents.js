import axios from 'axios';
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