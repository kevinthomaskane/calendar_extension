import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { currentDate } from "../actions/calendar";

class Calendar extends Component {
  state = {
    year_change: false
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.selected_year !== +this.props.current_date.split("/")[2]) {
      this.setState({ year_change: true });
    }
    this.props.currentDate();
  }

//   componentDidMount() {
//     this.highlightDay();
//   }

//   componentDidUpdate() {
//     this.highlightDay();
//   }

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

//   highlightDay = () => {
//     const current_date = this.props.current_date;
//     const day =
//       document.querySelector(
//         `.calendar__day[data-fulldate="${current_date}"]`
//       ) || null;
//     console.log(day, current_date);
//     if (!this.state.year_change) {
//       day.style.border = "solid 1px red";
//     }
//   };

  render() {
    const days = this.mapDatesObject();
    
    return (
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
          return (
            <div
              className={i === 0 ? `calendar__day ${el.day}` : "calendar__day"}
              data-num={el.num}
              data-day={el.day}
              data-year={this.props.selected_year}
              data-fulldate={
                this.props.month + "/" + el.num + "/" + this.props.selected_year === this.props.current_date ? "border" : "no-border"
              }
              key={i}
            >
              <div className="calendar__day--number">{el.num}</div>
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
