import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEvent, addColor, removeEvent } from "../actions/modal";

class Modal extends Component {
  state = {
    date: this.props.date,
    day: this.props.day,
    input: "",
    remove: false,
  };

  handleInput = e => {
    this.setState({ input: e.target.value });
  };

  chooseColor = e => {
    if (e.target !== e.currentTarget) {
      const color = e.target.getAttribute("data-rgb");
      const { colors, date } = this.props;
      const obj = {
        colorobj: {
          date: date,
          color: color
        }
      };
      if (colors.length > 0) {
        let found = false;
        for (let i = 0; i < colors.length; i++){
          if (colors[i].colorobj.date === date){
            colors[i].colorobj.color = color;
            found = true;
            this.props.addColor(colors)
            i = colors.length;
          }
        }
        if (!found){
          colors.push(obj)
          this.props.addColor(colors)
        }
      } else {
        colors.push(obj)
        this.props.addColor(colors)
      }
    }
    this.props.closeModal();
  };

  removeEvent = () => {
    const new_events = this.props.events.filter((el) => {
      return el.eventobj.date !== this.props.date
    })
    this.props.removeEvent(new_events)
  }

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
              <input
                type="text"
                placeholder="add an event"
                value={this.state.input}
                onChange={this.handleInput}
              />
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
                          this.setState({input: ""})
                          i = events.length;
                        }
                      }
                      if (!found) {
                        events.push(obj);
                        this.props.addEvent(events);
                        this.setState({input: ""})
                      }
                    } else {
                      events.push(obj);
                      this.props.addEvent(events);
                      this.setState({input: ""})
                    }
                  }
                }}
              >
                +
              </button>
            </div>
            <div className="modal__container--events-container">
              <ol>
                {events
                  .filter(parent => {
                    let date = parent.eventobj.date;
                    return parent.eventobj.date === this.props.date;
                  })
                  .map(el => {
                    return el.eventobj.events.map(item => {
                      return (
                        <li
                          className="modal__container--events-container-item"
                          data-id={item}
                          data-date={date}
                          key={item}
                        >
                          {item}
                          <span className="modal__container--events-container-delete" onClick={this.removeEvent}>&times;</span>
                        </li>
                      );
                    });
                  })}
              </ol>
            </div>
            <div className="modal__container--colors">
              <div className="modal__container--colors-header">
                Choose a color for this day
              </div>
              <div
                className="modal__container--colors-row"
                onClick={this.chooseColor}
              >
                <div className="red" data-rgb="red" />
                <div className="green" data-rgb="green" />
                <div className="blue" data-rgb="blue" />
                <div className="yellow" data-rgb="yellow" />
                <div className="purple" data-rgb="purple" />
                <div className="orange" data-rgb="orange" />
                <div className="default" data-rgb="default">none</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  addColor: PropTypes.func.isRequired,
  addEvent: PropTypes.func.isRequired,
  removeEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  events: state.modal.events,
  colors: state.modal.colors,
  selected_year: state.header.year
});

export default connect(
  mapStateToProps,
  { addColor, addEvent, removeEvent }
)(Modal);
