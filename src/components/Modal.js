import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEvent, addColor } from "../actions/modal";

class Modal extends Component {
  state = {
    date: this.props.date,
    day: this.props.day,
    input: "",
    event_added: false,
    html_components: []
  };

  handleInput = e => {
    this.setState({ input: e.target.value });
  };

  render() {
    const { events, colors, date, day } = this.props;
    const bg = this.props.show === true ? "show-bg" : "hide-bg";
    return (
      <div className={"modal-background " + bg}>
        <div className={"modal__container "}>
          <div className="modal__container--header">
            <div className="modal__container--header-day">{day} </div>
            <div className="modal__container--header-date">{date}</div>
            <div
              className="modal__container--header-close"
              onClick={() => {
                this.props.closeModal();
              }}
            >
              &times;
            </div>
          </div>
          <div className="modal__container--events">
            <div className="modal__container--events-header">Your Events</div>
            <div className="modal__container--events-input">
              <input type="text" onChange={this.handleInput} />
              <button
                onClick={() => {
                  if (this.state.input.length > 0) {
                    const obj = {
                      eventobj: {
                        date: date,
                        events: [this.state.input]
                      }
                    };
                    if (events.length > 0) {
                      let found = false;
                      for (let i = 0; i < events.length; i++) {
                        if (events[i].eventobj.date === date) {
                          found = true;
                          events[i].eventobj.events.push(this.state.input);
                          this.props.addEvent(events);
                          i = events.length;
                        } 
                      }
                      if (!found){
                        events.push(obj);
                          this.props.addEvent(events);
                      }
                    } else {
                      events.push(obj);
                      this.props.addEvent(events);
                    }
                  }
                }}
              >
                +
              </button>
            </div>
            <div className="modal__container--events-container">
              {events
                .filter(parent => {
                  let date = parent.eventobj.date;
                  return parent.eventobj.date === this.props.date;
                })
                .map(el => {
                  return el.eventobj.events.map(item => {
                    return (
                      <div
                        className="modal__container--events-container-item"
                        data-id={item}
                        data-date={date}
                        key={item}
                      >
                        {item}
                      </div>
                    );
                  });
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  addColor: PropTypes.func.isRequired,
  addEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  events: state.modal.events,
  colors: state.modal.colors,
  selected_year: state.header.year
});

export default connect(
  mapStateToProps,
  { addColor, addEvent }
)(Modal);
