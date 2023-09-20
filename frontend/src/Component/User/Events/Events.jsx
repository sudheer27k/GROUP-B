// import React, { useState, useEffect } from 'react'
// import "../../../Style/users/Events/Events.css"
// import Eventcard from './Eventcard.jsx';
// // import DatePicker from 'react-datepicker';

import React, { useState, useEffect } from 'react'
import '../../../Style/users/Events/Events.css'
import Eventcard from './Eventcard.jsx';
// import { Fetchevents } from '../../../Service/Events/Fetchevents';
import GetUserEvent from '../../../Service/Events/Fetchevents';

import filtericon from "../../../Images/filtericon.svg"

const getUserEvent = new GetUserEvent();




export default function UserEvents() {
    // const dummy = [
    //     {
    //         'eventname': 'turf',
    //         'start_date': '2023-09-17',
    //         'end_date': '2023-10-17'
    //     },
    //     {
    //         'eventname': 'holiday',
    //         'start_date': '2023-09-19',
    //         'end_date': '2023-10-17'
    //     },
    //     {
    //         'eventname': 'public',
    //         'start_date': '2023-09-12'

    //     },
    //     {
    //         'eventname': 'holiday',
    //         'start_date': '2023-11-19'
    //     },

    //     {
    //         'eventname': 'thai',
    //         'start_date': '2023-11-29'
    //     },
    //     {
    //         'eventname': 'thai',
    //         'start_date': '2023-09-13'
    //     }
    // ]
    // const [eventData, setEventData] = useState([]);
    // const [filterStartDate, setFilterStartDate] = useState('');
    // const [searchQuery, setSearchQuery] = useState('');
    const [eventData, setEventData] = useState([]);
    const [filterStartDate, setFilterStartDate] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const [filter, setFilter] = useState(eventData);

    async function fetchData() {
        try {
            const data = await getUserEvent.getAllEvents();
            console.log(data)
            setEventData(data);
            setFilter(data)
        } catch (error) {
            console.error('Error fetching event data:', error);
        }

        
    }


    // useEffect(() => {

    //     async function fetchData() {
    //         try {
    //             const data = await Fetchevents();
    //             setEventData(data);
    //         } catch (error) {
    //             console.error('Error fetching event data:', error);
    //         }

    //         fetchData();
    //     }
    // }, [])

    // if (eventData.length === 0) {
    //     return <div>Loading...</div>;
    // }
    useEffect(() => {
        fetchData() 
       }, [])





    // if (!filterStartDate) {
    //     return true;
    // }




    const myfun = (e) => {

        // console.log(filteredEventsByDate)
        // setFilterStartDate(e.target.value)
        setFilterStartDate(e.target.value)
        setFilter(eventData)
        console.log("e", e.target.value)
        console.log("saf", filterStartDate)
        const filteredEventsByDate = eventData.filter(event => {
            const eventStartDate = new Date(event.date);
            const filterDateObj = new Date(e.target.value);

            return (
                eventStartDate.getFullYear() === filterDateObj.getFullYear() &&
                eventStartDate.getMonth() === filterDateObj.getMonth() &&
                eventStartDate.getDate() === filterDateObj.getDate()
            );


        });


        setFilter(filteredEventsByDate)


    }

    const search = (e) => {
        setFilter(eventData)
        setFilterStartDate('')
        setSearchQuery(e.target.value)
        const filteredEventsByName = eventData.filter(event => {
            if (!searchQuery) {
                return true;
            }
            console.log("name", event.name.toLowerCase())
            console.log("searchevent", searchQuery.toLowerCase())
            return event.name.toLowerCase().includes(searchQuery.toLowerCase());
        });

        setFilter(filteredEventsByName)
    }




    const handleTodayButtonClick = () => {

        setFilter(eventData)

        const today = new Date();
        console.log(today)
        setFilterStartDate(today);
        const filteredEventsByToday = eventData.filter(event => {
            const eventStartDate = new Date(event.date);
            const filterDateObj = new Date(today);

            return (
                eventStartDate.getFullYear() === filterDateObj.getFullYear() &&
                eventStartDate.getMonth() === filterDateObj.getMonth() &&
                eventStartDate.getDate() === filterDateObj.getDate()
            );


        });

        setFilter(filteredEventsByToday)
    };

    const clearFilter = () => {
        setFilter(eventData)
        setSearchQuery('')
        setFilterStartDate('')
    }


    return (
        <>
            <h2>
                Upcoming Events
            </h2>
            <div className="contain">
                <div className='filters'>
                    <input
                        className='date'
                        type="date"
                        placeholder='date'
                        value={filterStartDate}
                        onChange={myfun}
                    />

                    <input
                        type="text"
                        placeholder="Search events"
                        value={searchQuery}
                        className='search'
                        onChange={search}
                    />

                    <button onClick={handleTodayButtonClick} className='today'>Today</button>

                    <button onClick={clearFilter} className='clear'>

                        <div className="icon-container-1">

                        <img src={filtericon} alt='filter' />

                            <div className="cross-line"></div>

                        </div>
                        </button>
                </div>

                <div className='scrollable'>
       
                    {filter.map((event, index) => (
                        <Eventcard key={index} event={event} />
                    ))}
                </div>
            </div>
        </>
    )
}