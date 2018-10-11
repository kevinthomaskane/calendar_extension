import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Calendar from "./Calendar";
import Modal from "./Modal";

class CalendarContainer extends Component {
  state = {
    selected_date: "",
    selected_day: ""
  };
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

  showModal = (date, day) => {
    this.setState({ show_modal: true, selected_date: date, selected_day: day });
  };

  closeModal = () => {
    this.setState({ show_modal: false, selected_date: "", selected_day: "" });
  };

  render() {
    const year = this.props.selected_year;
    const months = [];
    for (let i = 1; i < 13; i++) {
      months.push(i);
    }
    return (
      <div>
        <Modal
          date={this.state.selected_date}
          day={this.state.selected_day}
          show={this.state.show_modal === true ? true : false}
          closeModal={this.closeModal}
        />
        <div className="body">
          {months.map((el, i) => {
            const days = this.getDates(year, el);
            return (
              <Calendar
                showModal={this.showModal}
                days={days}
                key={i}
                month={el}
              />
            );
          })}
        </div>
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
