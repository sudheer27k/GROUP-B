import React from 'react'
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class ProjectAllocationApi{
  constructor() {
    this.jwt = localStorage.getItem('jwt');
    this.headers = {
      'access-token': this.jwt,
    };
    this.axisConfig = {
      headers: this.headers,
    };
  }
    async  AddProject(Info) { 
        try{
            const response = await axios.post("http://localhost:3000/project/add", Info, this.axisConfig);
             console.log(response)
            return response.data
            
        }catch(err){
            console.log(err)
        }
    }

    
    async allocateProjectToEachUser(proj_id, user_list){
      let info = {
        users : user_list,
        project_id : proj_id 
      }
        try {
          const response = await axios.post("http://localhost:3000/userProject",info, this.axisConfig);
          return response.status
          
      
        } catch (err) {
          console.log(err)
        }
      }


      async  getAllProjects() { 
        try{
            const response = await axios.get("http://localhost:3000/project/all", this.axisConfig);
            
            return response
            
        }catch(err){
            console.log(err)
        }
    }
      
}
export default ProjectAllocationApi



// import React from 'react'
// import axios from 'axios';

// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// class ProjectAllocationApi {
//     async AddProject(Info) {
//         try {
//             const response = await axios.post("http://localhost:3000/project/add", Info);
//             console.log(response)
//             return response.data

//         } catch (err) {
//             console.log(err)
//         }
//     }

//     async allocateProjectToUser() {
//         try {
//             const response = await axios.post("http://localhost:3000/user-project");
//             return response.data

//         } catch (err) {
//             console.log(err)
//         }
//     }
// }





// export default ProjectAllocationApi