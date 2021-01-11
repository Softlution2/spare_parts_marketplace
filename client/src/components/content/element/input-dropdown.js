import React, { Fragment, Component } from "react";
import NumberFormat from 'react-number-format';

const noAction = (e) => e.preventDefault();

class InputDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: "",
      currentOption: "",
    }
    this.setOption = this.setOption.bind(this);
  }

  componentDidMount() {
    this.setState({currentOption: this.props.defaultOption})
  }

  setOption(e, option) {
    noAction(e);
    this.setState({currentOption: option});
    this.props.handleOptionChange(this.props.o_name, option)
  }

  render() {
    let { options, m_name } = this.props;
    console.log()
    let { currentOption } = this.state;
    return (
      <div className="input-dropdown">
        <NumberFormat 
          value={this.props.value}
          className={`form-control ${this.props.class}`}
          thousandSeparator={true}
          onValueChange={(values) => this.props.handleChangeNumeric(m_name, values.floatValue) }
        />
        <div className="dropdown">
          <a
            href="#!"
            className="dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {currentOption}
          </a>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenuButton"
          >
            {
              options && options.map((option, index) => {
                return (
                  <a className="dropdown-item" key={index} href="#!" onClick={(e) => this.setOption(e, option)}>
                    {option}
                  </a>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default InputDropdown;
