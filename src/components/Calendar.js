import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { currentDate } from "../actions/calendar";
import Tooltip from "./Tooltip";

import Modal from "./Modal";

class Calendar extends Component {
  state = {
    year_change: false,
    show_modal: false,
    selected_date: "",
    selected_day: "",
    show_tooltip: false,
    hover_date: ""
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.selected_year !== +this.props.current_date.split("/")[2]) {
      this.setState({ year_change: true });
    }
    this.props.currentDate();
  }

  mapDatesObject = () => {
    const dates = this.props.days;
    let days = [];
    for (let prop in dates) {
      let newobj = {};
      newobj.num = prop;
      newobj.day = dates[prop];
      days.push(newobj);
    }
    return days;
  };

  getMonth = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return months[this.props.month - 1];
  };

  render() {
    const days = this.mapDatesObject();
    const show_tooltip = this.state.show_tooltip ? true : false;
    return (
      <div>
        <div className="calendar">
          <div className="calendar__month">{this.getMonth()}</div>
          <div className="calendar__days">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          {days.map((el, i) => {
            let color_class = "default";
            let filter = false;
            const {colors} = this.props;
            const full_date =
              this.props.month + "/" + el.num + "/" + this.props.selected_year;
               for (let i = 0; i < colors.length; i++){
                    if (colors[i].colorobj.date === full_date){
                        if (this.props.filter && colors[i].colorobj.color === this.props.color){
                            color_class = colors[i].colorobj.color;
                            filter = true;
                        }   
                        if (!filter && !this.props.filter){
                            color_class = colors[i].colorobj.color;
                        }
                    }
               } 
            return (
              <div
                className={
                  i === 0 ? `calendar__day ${el.day} ${color_class}` : `calendar__day ${color_class}`
                }
                data-num={el.num}
                data-day={el.day}
                data-year={this.props.selected_year}
                data-fulldate={
                  full_date === this.props.current_date ? "border" : "no-border"
                }
                key={i}
                onClick={() => {
                  this.props.showModal(full_date, el.day);
                }}
                onMouseOver={() => {
                  this.setState({ show_tooltip: true, hover_date: full_date });
                }}
                onMouseLeave={() => {
                  this.setState({ show_tooltip: false, hover_date: "" });
                }}
              >
                <div className="calendar__day--number">{el.num}</div>
                {this.state.show_tooltip &&
                this.state.hover_date === full_date ? (
                  <Tooltip 
                  date={full_date} 
                  current={this.props.current_date}/>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {};

const mapStateToProps = state => ({
  selected_year: state.header.year,
  current_date: state.calendar.current_date,
  colors: state.modal.colors
});

export default connect(
  mapStateToProps,
  { currentDate }
)(Calendar);
