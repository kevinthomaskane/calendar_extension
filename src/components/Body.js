import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Calendar from "./Calendar";

class CalendarContainer extends Component {
  getDates = (year, month) => {
    const names = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const date = new Date(year, month - 1, 1);
    const result = {};
    while (date.getMonth() == month - 1) {
      result[date.getDate()] = names[date.getDay()];
      date.setDate(date.getDate() + 1);
    }
    return result;
  };

  render() {
    console.log("here")
    const year = this.props.selected_year;
    const months = [];
    for (let i = 1; i < 13; i++) {
      months.push(i);
    }
    return (
      <div className="body">
        {months.map((el, i) => {
          const days = this.getDates(year, el);
          return <Calendar days={days} key={i} month={el}/>;
        })}
      </div>
    );
  }
}

CalendarContainer.propTypes = {};

const mapStateToProps = state => ({
  selected_year: state.header.year,
  years_range: state.header.years_range
});

export default connect(
  mapStateToProps,
  {}
)(CalendarContainer);
