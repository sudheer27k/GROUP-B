const db = require('../entity')
const projects = db.projects


const addProject = async(req,res) =>{
    try {
        

        // Extract the admin data from the request body
        const {project_name, start_date, end_date, client_name } = req.body;

        // checking project is already existed or not
        const findProject = await projects.findOne({
            where :{
                project_name: project_name
            }
         })

         if(findProject){
            res.json({message : 'project already existed',status : false})
         }
         // if project is not not existed
         else{

             // Create a new project record in the database
                const newProject = await projects.create({
                    project_name, 
                    start_date, 
                    end_date, 
                    client_name

         });
 
         // Send a response indicating success
         res.json({ message: 'Project added successfully', project: newProject,status:true,});
         }
       
    } catch (err) {
        // Handle any errors that occur during the addition process
        console.error(err);
        res.status(500).json({ error: 'Failed to add Project' });
    }
}


const getAllProjects = async(req,res) =>{
    try {
        // Create a new admin record in the database
        const allProjects = await projects.findAll();
        // Send a response indicating success
        res.status(201).json({ message: 'all projects returned', projects: allProjects,status:true });
    } catch (err) {
        // Handle any errors that occur during the addition process
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch all projects' ,status : false});
    }
}


module.exports = {
    addProject,
    getAllProjects
}
