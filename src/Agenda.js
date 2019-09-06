import React, {Component} from 'react'
import Calendar from 'react-calendar'
import TimeField from 'react-simple-timefield'

import cookie from 'react-cookies'

import './Agenda.css'
import Appointment from './Appointment';

class Agenda extends Component {
  state = {
    title:'',
    date: new Date(),
    time: '09:00',
    appointments: cookie.load('appointments')|| [],
  }
  
  handleTitleChange = (event) => {
    this.setState({title: event.target.value});
  }

  handleDateChange = date => {
    this.setState({ date });
  }

  handleTimeChange = time => {
    this.setState({ time });
  }

  addAppointment = (event) => {
    const {title, date, time, appointments} = this.state;
    var newAppointments = appointments;
    var sDate= date.toDateString();
    sDate = sDate.substring([0,15]);
    newAppointments.push([title, sDate + ', ' + time]);
    this.setState({title:'', date: new Date(), time: '09:00', appointments: newAppointments});
    cookie.save('appointments', newAppointments);
  }
 
  onTrashClick = index => {
    const appointments = this.state.appointments;
    var newAppointments = appointments;

    newAppointments.splice(index,1);
    this.setState({appointment: newAppointments});
    cookie.save('appointments', newAppointments);

  }

  render() {
    const {title, date, time, appointments} = this.state;
    return (
      <div className="agenda">
        <p className="title">
          Agenda
        </p>
        <p>
            <input 
              type = "text"
              placeholder="Make a new appoitment"
              className="input"
              maxLength={30}
              onChange={this.handleTitleChange}  
              value={title}
            />
        </p>
      
        <Calendar
          className="calendar"
          onChange={this.handleDateChange}
          value={date}
        />

        <TimeField value={time} onChange={this.handleTimeChange} />
        <p>
          <button type="button" className="button" onClick={this.addAppointment}>Make Appointment</button>
        </p>
        <Appointment appointments={appointments} onRemove={this.onTrashClick}/>
      </div>

    );
  }
}

export default Agenda;
