const db = require('../entity')
const holidays = db.holidays

const getAllHolidays = async(req,res) =>{
    try {
        // Create a new admin record in the database
        const allHolidays = await holidays.findAll();
        // Send a response indicating success
        res.status(201).json({ message: 'all holidays returned', holidays: allHolidays,status:true });
    } catch (err) {
        // Handle any errors that occur during the addition process
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch all holidays' ,status : false});
    }
}


module.exports = {
    getAllHolidays
}
