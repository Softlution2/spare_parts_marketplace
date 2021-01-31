import React, { Component } from "react";
import equal from 'fast-deep-equal';

export class OptionSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOptions: this.props.activeOptions,
    }
    this.handleClickOption = this.handleClickOption.bind(this);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
    if (!equal(this.state.currentOptions, this.props.activeOptions) || !equal(prevProps.options, this.props.options)) {
      this.setState({currentOptions: this.props.activeOptions});
    }
  }

  handleClickOption(e, option) {
    e.preventDefault();
    let { currentOptions } = this.state;
    if (currentOptions.some(e => e._id === option._id))
      currentOptions = currentOptions.filter(e => e._id !== option._id);
    else currentOptions.push(option);
    this.setState({currentOptions});
    this.props.onChange(currentOptions, this.props.name);
  }

  render() {
    let { options } = this.props;
    const { currentOptions } = this.state;
    return (
      <div className="atbd_selection__group">
        {options &&
          options.map((option, index) => {
            return (
              <div
                key={index}
                className={
                  currentOptions.some(e => e._id === option._id)
                    ? "atbd_selection__item active"
                    : "atbd_selection__item"
                }
              >
                <span onClick={(e) => this.handleClickOption(e, option)}>
                  {option.name}
                </span>
              </div>
            );
          })}
      </div>
    );
  }
}

export class ThumbOptionSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeOptions: [],
    };
    this.handleClickOption = this.handleClickOption.bind(this);
  }

  handleClickOption(e, option) {
    e.preventDefault();
    let { activeOptions, name } = this.props;
    if (activeOptions.includes(option))
      activeOptions = activeOptions.filter((e) => e !== option);
    else activeOptions.push(option);
    this.props.onChange(activeOptions, name);
  }

  render() {
    const { options, activeOptions } = this.props;
    return (
      <div className="atbd_selection__group">
        {options &&
          options.map((option, index) => {
            return (
              <div
                key={index}
                className={
                  activeOptions.includes(option.value)
                    ? "atbd_selection__thumb_item active"
                    : "atbd_selection__thumb_item"
                }
                onClick={(e) => this.handleClickOption(e, option.value)}
              >
                <img src={`/assets/img/car-types/${option.value}.png`} alt="cartype" />
                <span>{option.label}</span>
              </div>
            );
          })}
      </div>
    );
  }
}
