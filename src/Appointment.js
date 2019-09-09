import React, {Component} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";

import "./Appointment.css";


class Appointment extends Component{


  onTrashClick = (index) => {
    this.props.onRemove(index);
  }

  render(){
    const {appointments} = this.props;
    return (
      <div className="appointment">
        {appointments.map((appointment, index) => (
          <div key="index">
            <div className="block">
              <div className="flex1" key={index}>
                <p className="appTitle">
                  {appointment[0]}
                </p>
                <p className="appDate">
                  {appointment[1]}
                </p>
              </div>
              <div className="flex2">
                <FontAwesomeIcon icon={Icons.faTrashAlt} className="delete" color="#778899" onClick={() => this.onTrashClick(index)}/>
              </div>
            </div>
            <hr/>
          </div>
        ))}
      </div>
    );
  }
}

export default Appointment;
