import React, { Component } from "react";

const noAction = (e) => e.preventDefault();
const colors = {
  "Black" :  "black",
  "White" :  "white",
  "Gray" :  "gray",
  "Silver" :  "silver",
  "Red" :  "red",
  "Blue" :  "blue",
  "Brown" :  "brown",
  "Gold" :  "gold",
  "Green" :  "green",
  "Orange" :  "orange",
  "Light Blue": "#ADD8E6",
  "Purple": "#800080"
}
class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.handleClickOption = this.handleClickOption.bind(this);
  }

  handleClickOption(e, option) {
    noAction(e);
    let { activeColors } = this.props;
    if (activeColors.includes(option))
      activeColors = activeColors.filter((e) => e !== option);
    else activeColors.push(option);
    this.props.onChange(activeColors, this.props.name);
  }

  render() {
    const { activeColors, colorList } = this.props;
    return (
      <div className="atbd_color__box">
        {colorList &&
          colorList.map((color, index) => {
            return (
              <div
                key={index}
                className={
                  activeColors.includes(color)
                    ? "atbd_color__item active"
                    : "atbd_color__item"
                }
              >
                <div className={`atbd_color__item_color ${color === 'White' ? "white" : ""}`} style={{backgroundColor: colors[color]}} onClick={(e) => this.handleClickOption(e, color)}>
                  <i className="la la-check"></i>
                </div>
                <span>
                  {color}
                </span>
              </div>
            );
          })}
      </div>
    );
  }
}

export default ColorBox;