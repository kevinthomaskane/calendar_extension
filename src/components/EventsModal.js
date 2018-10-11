import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeEvent } from "../actions/modal";

class EventsModal extends Component {
  state = {
    date: this.props.date,
    day: this.props.day,
    remove: false
  };

  removeEvent = item => {
    const events = this.props.events;
    for (let i = 0; i < events.length; i++) {
      const child = events[i].eventobj.events;
      for (let j = 0; j < child.length; j++) {
        if (child[j] === item) {
          child.splice(j, 1);
          if (child.length === 0){
            events.splice(i, 1)
            this.props.removeEvent(events);
          }
          this.props.removeEvent(events);
          this.setState({ remove: !this.state.remove });
          return;
        }
      }
    }
  };

  render() {
    const bg = this.props.show === true ? "show-bg" : "hide-bg";
    const { events } = this.props;
    for (let i = 1; i < events.length; i++){
      let tmp;
      for (let j = 0; j < i; j++){
        if (Date.parse(events[i].eventobj.date) > Date.parse(events[j].eventobj.date)){
          tmp = events[i];
          events[i] = events[j];
          events[j] = tmp;
        }
      }
    }
    return (
      <div className={"modal-background " + bg}>
        <div className="modal__container">
          <div className="modal__container--header">
            <div>&nbsp;</div>
            <div>Your Events</div>
            <div
              className="modal__container--header-close"
              onClick={() => {
                this.props.closeModal();
              }}
            >
              &times;
            </div>
          </div>
          <div className="modal__container--events-container">
            <ol>
              {events.map(el => {
                let date = el.eventobj.date;
                const current_date = this.props.current_date;
                const selected_date = date;
                const diff = Math.floor(
                  (Date.parse(selected_date) - Date.parse(current_date)) /
                    86400000
                );
                const verbage = diff > 0 ? "until" : "since";
                const days_verbage = Math.abs(diff) === 1 ? "day" : "days";
                return el.eventobj.events.map(item => {
                  return (
                    <li
                      className="modal__container--events-container-item"
                      data-id={item}
                      data-date={date}
                      key={item}
                    >
                      {Math.abs(diff)} {days_verbage} {verbage} {item} ({date})
                      <span
                        className="modal__container--events-container-delete"
                        onClick={() => {
                          this.removeEvent(item);
                        }}
                      >
                        &times;
                      </span>
                    </li>
                  );
                });
              })}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

EventsModal.propTypes = {};

const mapStateToProps = state => ({
  events: state.modal.events,
  current_date: state.calendar.current_date
});

export default connect(
  mapStateToProps,
  { removeEvent }
)(EventsModal);
