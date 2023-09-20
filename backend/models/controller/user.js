const db = require('../entity')
const users = db.users
const bcrypt = require('bcrypt');
const user = require('../entity/user');
const addUser = async(req,res) =>{
    
    try {
        

        // Extract the admin data from the request body
        const {first_name, last_name, email, contact_no, dob, designation, emerg_contact, blood_grp, doj} = req.body;
        

        // check whether user already existed or not
         const findUser = await users.findOne({
            where :{
                email : email
            }
         })

         if (findUser){
            res.status(400).json({message : 'user already existed'})
         }
         else{
             // Create a new admin record in the database
                const newUser = await users.create({
                    first_name, 
                    last_name,
                    email,
                     contact_no,
                      dob,
                       designation, 
                       emerg_contact, 
                       blood_grp, 
                       doj
                });

                // Send a response indicating success
                res.status(201).json({ message: 'user  added successfully', user: newUser});
                }
       
    } catch (err) {
        // Handle any errors that occur during the addition process
        console.error(err);
        res.status(500).json({ error: 'Failed to add admin' });
    }
}



const getAllUsers = async(req,res) =>{
    console.log(req.headers["access-token"], "This is getAllusers function")
    try {
        // Create a new admin record in the database
        const allevents = await users.findAll();
        // Send a response indicating success
        res.status(201).json({ message: 'all users  returned', users: allevents,status:true });
    } catch (err) {
        // Handle any errors that occur during the addition process
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch user' ,status : false});
    }
}

const deleteUser = async (req, res) => {
    console.log(req, "this is deleteUser")
    try {
        // Extract the event ID from the request body
        const  {id}  = req.params;
      
        // Find the event by ID
        const user = await users.findByPk(id);

        // If the event doesn't exist, return a 404 error
        if (!user) {
            return res.status(404).json({ error: 'User not found', status: false});
        }

        // Delete the event from the database
        await user.destroy();

        // Send a response indicating success
        res.status(200).json({ message: 'User deleted successfully', status:true });
    } catch (err) {
        // Handle any errors that occur during the delete process
        console.error(err);
        res.status(500).json({ error: 'Failed to delete user' ,status:false});
    }
}

const updateUser = async (req, res) => {
    const {id} = req.params
    try {
        // Extract the event ID from the request body
        const { first_name, last_name, email, contact_no, dob, designation, emerg_contact, blood_grp, doj} = req.body;
        console.log(req.body)
        console.log(id)

        // Find the event by ID and update it using Sequelize's update method
        const [updatedRowsCount] = await users.update(
            {
                first_name, last_name, email, contact_no, dob, designation, emerg_contact, blood_grp, doj
            },
            {
                where: { id },
            }
        );

        // Check if any rows were updated
        if (updatedRowsCount === 0) {
            return res.status(404).json({ error: 'User not found' ,status:false});
        }

        // Fetch the updated event from the database
        const updatedUser = await users.findByPk(id);
        console.log(updateUser)

        // Send a response indicating success with the updated event data
        res.json({ message: 'User updated successfully', user: updatedUser ,status:true});
    } catch (err) {
        // Handle any errors that occur during the update process
        console.error(err);
        res.json({ error: 'Failed to update user',status:false });
    }

}


const loginUser = async (req, res) => {
    const {id} = req.params
    try {

            const user= await users.findOne({
                where : {
                    id : id
                }

            })
         res.json({user : user, status:true, message: "user found"})

        
    } catch (err) {
        // Handle any errors that occur during the update process
        console.error(err);
        res.json({ error: 'user not found',status:false });
    }
    
}



module.exports = {
    addUser,
    getAllUsers,
    deleteUser,
    updateUser,
    loginUser
}
