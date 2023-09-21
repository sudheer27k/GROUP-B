const db = require('../entity')
const events = db.events


const addEvent = async(req,res) =>{
    try {

        // Extract the admin data from the request body
        const {name,description,venue,date,start_time,end_time } = req.body;
        console.log(name,description,venue,date,start_time,end_time  )

        // Create a new admin record in the database
        const newEvent = await events.create({
            name,
            description,
            venue,
            date,
            start_time,
            end_time 
        });

        // Send a response indicating success
        res.status(201).json({ message: 'event added successfully', admin: newEvent ,status : true});
    } catch (err) {
        // Handle any errors that occur during the addition process
        console.error(err);
        res.status(500).json({ error: 'Failed to add event' });
    }
}

const getAllEvents = async(req,res) =>{
    try {
        // Create a new admin record in the database
        const allevents = await events.findAll();
        // Send a response indicating success
        res.json({ message: 'all events  returned', events: allevents,status:true });
    } catch (err) {
        // Handle any errors that occur during the addition process
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch all events' ,status : false});
    }
}

const updateEvent = async (req, res) => {
    const {id} = req.params
    try {
        // Extract the event ID from the request body
        const { name,description,venue,date,start_time,end_time} = req.body;

        // Find the event by ID and update it using Sequelize's update method
        const [updatedRowsCount] = await events.update(
            {
                name,description,venue,date,start_time,end_time
            },
            {
                where: { id },
            }
        );

        // Check if any rows were updated
        if (updatedRowsCount === 0) {
            return res.status(404).json({ error: 'Event not found' ,status:false});
        }

        // Fetch the updated event from the database
        const updatedEvent = await events.findByPk(id);

        // Send a response indicating success with the updated event data
        res.json({ message: 'Event updated successfully', event: updatedEvent,status:true });
    } catch (err) {
        // Handle any errors that occur during the update process
        console.error(err);
        res.status(500).json({ error: 'Failed to update event' });
    }
}

const deleteEvent = async (req, res) => {
    try {
        // Extract the event ID from the request body
        const  {id}  = req.params;
      
        // Find the event by ID
        const event = await events.findByPk(id);

        // If the event doesn't exist, return a 404 error
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Delete the event from the database
        await event.destroy();

        // Send a response indicating success
        res.status(200).json({ message: 'Event deleted successfully',status:true });
    } catch (err) {
        // Handle any errors that occur during the delete process
        console.error(err);
        res.status(500).json({ error: 'Failed to delete event' ,status:false});
    }
}


module.exports = {
    addEvent,
    getAllEvents,
    deleteEvent,
    updateEvent
}
