import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../Style/Calender/Calender.css"
import React, { useEffect, useState } from "react";
import GetHolidaysApi from "../../../Service/Holidays/Holidays";

const getHolidaysApi = new GetHolidaysApi();

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

// let birth_date = '2023-09-11'
// const day = new Date(birth_date)



function Holidays() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [data, setData] = useState([])
  const getAllHolidaysData = async () => {
    let response = await getHolidaysApi.getAllHolidays()
    console.log(response)
    setData(response)
  }

  useEffect(() => {
    getAllHolidaysData()
  }, [])
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };



  const events = data.map((b) => {

    let day = new Date(b.date).getDate()
    let month = new Date(b.date).getMonth()
    let year = new Date().getFullYear();
    let holiday = b.description
    let free = {
      'title': holiday,
      'start': new Date(year, month, day + 1),
      'end': new Date(year, month, day + 1)
    }
    return free
  }
  )

  const calendarClasses = modalOpen ? 'background-blur' : '';
  return (
    <>
      <div className={calendarClasses}>

        <div className="App">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            // popup
            // components={components}
            onSelectEvent={handleEventClick}
            className="calendar" />

          {/* {selectedEvent && (
            <Eventmodal isOpen={modalOpen} onClose={closeModal} event={selectedEvent} />
          )} */}
        </div>
      </div>


    </>

  );
}


export default Holidays;
