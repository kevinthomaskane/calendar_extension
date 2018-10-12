import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Calendar from "./Calendar";
import Modal from "./Modal";
import EventsModal from "./EventsModal";

class CalendarContainer extends Component {
  state = {
    selected_date: "",
    selected_day: "",
    show_events: false,
    show_modal: false,
    filter: false,
    color: "default"
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

  closeEvents = () => {
    this.setState({ show_events: false });
  };

  chooseColor = e => {
    if (e.target !== e.currentTarget) {
      const color = e.target.getAttribute("data-rgb");
      if (color === "default") {
        this.setState({ filter: false, color: "default" });
      } else {
        this.setState({ filter: true, color: color });
      }
    }
  };

  resetFilter = () => {
    this.setState({ filter: false, color: "default" });
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
        <EventsModal
          show={this.state.show_events === true ? true : false}
          closeModal={this.closeEvents}
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
                filter={this.state.filter ? true : false}
                color={
                  this.state.color !== "default" ? this.state.color : "default"
                }
              />
            );
          })}
        </div>
        <div className="footer">
          <div className="footer__filters" onClick={this.chooseColor}>
            <a className="footer__filters--header">Filter By:</a>
            <a className="red" data-rgb="red" />
            <a className="green" data-rgb="green" />
            <a className="blue" data-rgb="blue" />
            <a className="yellow" data-rgb="yellow" />
            <a className="purple" data-rgb="purple" />
            <a className="orange" data-rgb="orange" />
            <a className="default" data-rgb="default">
              reset 
            </a>
          </div>
          <div className="footer__button">
            <a
              href="#"
              onClick={() => {
                this.setState({ show_events: true });
              }}
            >
              Saved Events
            </a>
          </div>
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
