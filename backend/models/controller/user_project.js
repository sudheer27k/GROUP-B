const db = require('../entity')
const user_project = db.user_project
const users = db.users
const projects = db.projects
const addProject_addUser = async (req, res) => {

  try {

    let { users, project_id } = req.body;

    console.log(users, project_id , " Yhis is users and project_id")
    if (!Array.isArray(users)) {
      users = [users];
    }
    console.log(users, "this is converting to users")
    users.forEach(async (userId) => { // Use a different variable name here, e.g., 'userId'
      const newData = await user_project.create({
        project_id: project_id,
        user_id: userId, // Use 'userId' as the iterator variable
      });
     
    });

    res.status(200).json({ message: 'Associations created successfully'});

  } catch (error) {

    console.error('Error while creating associations:', error);

    // Handle errors and send an appropriate response

    res.status(500).json({ error: 'Internal server error' });

  }

}

const projectDetailsOfLoginUser = async (req, res) => {
  let userId = req.params.id;
  console.log(userId, "this is userID");
  try {
    // Step 1: Fetch all project_ids associated with the user
    const allProjectIds = await user_project.findAll({
      where: {
        user_id: userId,
      },
    });

    // Step 2: Extract project_ids from the result
    const projectIds = allProjectIds.map((project) => project.project_id);
    console.log(projectIds, "this is projectIds")

    // Step 3: Fetch project details for each project_id
    const projectDetails = await projects.findAll({
      where: {
        id: projectIds, // Use projectIds to filter the projects
      },
    });

    console.log(projectDetails);
    res.send(projectDetails);
  } catch (err) {
    console.log(err);
  }
};



module.exports = {
  addProject_addUser,
  projectDetailsOfLoginUser 
}
