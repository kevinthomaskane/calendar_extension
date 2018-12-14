import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeYear, changeRange } from "../actions/header";

class Header extends Component {
  state = {
    selected_year: this.props.year,
    year_range: []
  };

  componentDidMount() {
    this.getDateRange(this.state.selected_year).then(range => {
      this.props.changeYear(this.state.selected_year);
      this.props.changeRange(range);
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

  render() {
    return (
      <div className="header">
        <div className="before" onClick={() => {
          const new_year = this.props.years_range[0] - 4;
          this.getDateRange(new_year).then(range => {
            this.props.changeRange(range)
          })
        }}></div>
        {this.state.year_range.map((el, i) => {
          const header_class = this.props.selected_year === el ? "bold-header" : ""
          return (
            <a
              href="#"
              className={"header__year " + header_class}
              key={i}
              data-year={el}
              onClick={() => {
                this.getDateRange(el).then(range => {
                  this.props.changeYear(el);
                  this.props.changeRange(range);
                  this.setState({selected_year: el})
                });
              }}
            >
              {el}
            </a>
          );
        })}
         <div className="after" onClick={() => {
          const new_year = this.props.years_range[this.props.years_range.length - 1] + 4;
          this.getDateRange(new_year).then(range => {
            this.props.changeRange(range)
          })
        }}></div>
      </div>
    );
  }
}

Header.propTypes = {
  changeYear: PropTypes.func.isRequired,
  changeRange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  selected_year: state.header.year,
  years_range: state.header.years_range
});

export default connect(
  mapStateToProps,
  { changeYear, changeRange }
)(Header);
