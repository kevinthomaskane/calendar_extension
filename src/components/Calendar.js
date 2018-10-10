import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { currentDate } from "../actions/calendar";

class Calendar extends Component {
  componentWillReceiveProps(nextProps) {
    this.props.currentDate();
    this.highlightDay();
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

  highlightDay = () => {
    const current_date = this.props.current_date;
    if (+current_date.split("/")[2] === this.props.selected_year) {
      let day = document.querySelector(
        `.calendar__day[data-fulldate="${current_date}"]`
      );
      console.log(day)
      day.style.border = "solid 1px red";
    }
  };

  render() {
    const days = this.mapDatesObject();
    return (
      <div className="calendar">
        <div className="calendar__month">{this.getMonth()}</div>
        {days.map((el, i) => {
          return (
            <div
              className={i === 0 ? "calendar__day " + el.day : "calendar__day"}
              data-num={el.num}
              data-day={el.day}
              data-year={this.props.selected_year}
              data-fulldate={
                this.props.month + "/" + el.num + "/" + this.props.selected_year
              }
              key={i}
            >
              <div className="calendar__day--number">{el.num}</div>
              <div className="calendar__day--day">{el.day}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

Calendar.propTypes = {};

const mapStateToProps = state => ({
  selected_year: state.header.year,
  current_date: state.calendar.current_date
});

export default connect(
  mapStateToProps,
  { currentDate }
)(Calendar);
