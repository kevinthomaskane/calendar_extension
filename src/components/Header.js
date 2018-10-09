import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeYear, changeRange } from "../actions/header";

class Header extends Component {
  state = {
    selected_year: this.props.year,
    year_range: []
  };

  componentWillMount() {
    this.getDateRange(this.state.selected_year).then(range => {
      this.props.changeYear(this.state.selected_year);
      this.props.changeRange(range);
      this.activeYear(this.state.selected_year)
    });
  }

  getDateRange = (year) => {
    return new Promise((resolve, reject) => {
      let years = [];
      for (
        let i = year - 3;
        i < year + 4;
        i++
      ) {
        years.push(i);
      }
      this.setState({ year_range: years });
      resolve(years);
    });
  };

  activeYear = (el) => {
    const element = document.querySelector(`a[data-year="${el}"]`)
    element.setAttribute("style", "color: black; font-weight: bold;")
  }

  render() {
    return (
      <div className="header">
        {this.state.year_range.map((el, i) => {
          return (
            <a
              href="#"
              className="header__year"
              key={i}
              data-year={el}
              onClick={() => {
                this.getDateRange(el).then(range => {
                  this.props.changeYear(el);
                  this.props.changeRange(range);
                  this.activeYear(el);
                });
              }}
            >
              {el}
            </a>
          );
        })}
      </div>
    );
  }
}

Header.propTypes = {
  changeYear: PropTypes.func.isRequired,
  changeRange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  selected_year: state.year,
  years_range: state.years_range
});

export default connect(
  mapStateToProps,
  { changeYear, changeRange }
)(Header);
