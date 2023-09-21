import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Eventmodal from "./BirthdayModel";
import "../../../Style/Calender/Calender.css"
import AddUserApi from "../../../Service/Admin/UserApi"

import React, { useState, useEffect } from "react";

const addUserApi = new AddUserApi()

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

let birth_date = '2023-09-11'
const day = new Date(birth_date)



function Calenders() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [data, setData] = useState([])

  const getAllUsersData = async () => {
    let response = await addUserApi.getAllUsers()
    console.log(response)
    setData(response)
  }

  useEffect(() => {
    getAllUsersData();

  }, [])
  const events = data && data.map((b) => {
    let day = new Date(b.dob).getDate()
    let month = new Date(b.dob).getMonth()
    let year = new Date().getFullYear();
    let name = b.first_name
    let birth = {
      'title': name + "'s Birthday",
      'start': new Date(year, month, day + 1),
      'end': new Date(year, month, day + 1),
      'type': b.type
    }
    return birth
  }

  )
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };
  const calendarClasses = modalOpen ? 'background-blur' : '';
  return (
    <>
    <h2>Birthday</h2>
      <div className={calendarClasses}>

        <div className="App">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            popup
            // components={components}
            onSelectEvent={handleEventClick}
            className="calendar" />

          {selectedEvent && (
            <Eventmodal isOpen={modalOpen} onClose={closeModal} event={selectedEvent} />
          )}
        </div>
      </div>


    </>

  );
}


export default Calenders;
