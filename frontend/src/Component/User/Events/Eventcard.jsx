import React from "react";

export default function Eventcard({ event }) {
    const { name,description,venue,date,start_time,end_time } = event;


    const dateObject = new Date(date); // Corrected the month adjustment
    const monthName = dateObject.toLocaleDateString(undefined, { month: 'long' }).slice(0, 3);


    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="custom">
                        <div className="box1">
                            <h1 className="card-subtitle mb-2 text-muted day">{dateObject.getDate()}</h1>
                            <h3 className="card-subtitle mb-2 text-muted day">{monthName}</h3>
                        </div>
                        <div className="box2">
                        <h5 className="card-title">Event Name : {name}</h5>
                            <p className="card-text">Description : {description}</p>
                            <p className="card-text">Venue : {venue}</p>

                        </div>
                        <div className="box3">
                            <div className="days">
                                <p className="card-text"> {start_time}</p> <p>-</p> <p className="card-text"> {end_time}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
