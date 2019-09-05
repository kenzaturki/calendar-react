import React, {Component} from 'react'
import Calendar from 'react-calendar'
import TimeField from 'react-simple-timefield'

import cookie from 'react-cookies'

import './App.css'

class App extends Component {
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
    this.setState({ date })
  }

  handleTimeChange = time => {
    this.setState({ time })
  }

  addAppointment = (event) => {
    event.preventDefault()
    const {title, date, time, appointments} = this.state
    var newAppointments = appointments
    var sDate= date.toDateString()
    sDate = sDate.substring([0,15])
    newAppointments.push([title, sDate + ', ' + time])
    this.setState({title:'', date: new Date(), time: '09:00', appointments: newAppointments})
    cookie.save('appointments', newAppointments)
  }


  render() {
    const {title, date, time, appointments} = this.state
    return (
      <div className="app">
        <form onSubmit={this.addAppointment}>
          <p>
              <input 
                type = "text"
                className="title"
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
            <button type="submit" className="button">Make Appointment</button>
          </p>
          <div className="appointment">
            {appointments.map((appointment, index) => (
              <div>
                <p className="appTitle">
                  {appointment[0]}
                </p>
                <p className="appDate">
                  {appointment[1]}
                </p>
                <hr 
                  style={{
                    color: "black",
                  }}
                />
              </div>
            ))}
          </div>
        </form>
      </div>

    );
  }
}

export default App;
