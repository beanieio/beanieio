import React, { Component } from 'react';
import classNames from 'classnames';
import '../../styles/rating-styles.css';

export default class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || null,
      hoveredValue: null,
    };
    this.scale = this.props.scale || [1, 2, 3, 4, 5];
  }

  handleMouseEnter(v) { this.setState({hoveredValue: v}); }

  handleMouseLeave() { this.setState({hoveredValue: null}); }

  handleClick(v) {
    this.setState({value: (this.state.value === v) ? null : v}); 
  }

  render() {
    return (
      <div className="rating-wrapper" onMouseLeave={() => this.handleMouseLeave()}>
        {this.scale.map((v, i) => (
          <RatingElement key={`r${i}`} val={v} ind={i}
            filled={
              this.state.hoveredValue >= v ||
              ( !this.state.hoveredValue && this.state.value >= v )
            }
            onMouseEnter={() => this.handleMouseEnter(v)}
            onClick={() => this.handleClick(v)}
          />
        ))}
      </div>
    );
  }
}

const RatingElement = (props) => {
  return (
    <div key={`r${props.ind}`}
      className={classNames('rating-element', {'rating-element-filled': props.filled})}
      onMouseEnter={() => props.onMouseEnter()} onClick={() => props.onClick()}
    >
      <span>{props.val}</span>
    </div>
  );
};
