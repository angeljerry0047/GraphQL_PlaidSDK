import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import * as shape from 'd3-shape';
import { Path } from 'react-native-svg-charts';
import Svg, { G, Circle } from 'react-native-svg';

import { BLUE200, GREEN400 } from '../../theme/colors';

// this is based on the ProgressCircle component from react-native-svg-charts
// https://github.com/JesperLekland/react-native-svg-charts/blob/dev/src/progress-circle.js
class RelativeShareCircle extends PureComponent {
  state = {
    height: 0,
    width: 0,
  };

  _onLayout(event) {
    const {
      nativeEvent: {
        layout: { height, width },
      },
    } = event;
    this.setState({ height, width });
  }

  render() {
    const {
      style,
      primaryColor,
      secondaryColor,
      backgroundColor,
      strokeWidth,
      startAngle,
      endAngle,
      cornerRadius,
    } = this.props;

    let { percent } = this.props;

    const { height, width } = this.state;

    const outerDiameter = Math.min(width, height);

    if (!isFinite(percent) || isNaN(percent)) {
      percent = 0;
    }

    // important order to have primary render over secondary
    const data = [
      {
        key: 'secondary',
        value: 100 - percent,
      },
      {
        key: 'primary',
        value: percent,
      },
    ];

    const pieSlices = shape
      .pie()
      .value((d) => d.value)
      .sort((a) => (a.key === 'primary' ? 1 : -1))
      .startAngle(startAngle)
      .endAngle(endAngle)(data);

    const arcs = pieSlices.map((slice, index) => ({
      ...data[index],
      ...slice,
      path: shape
        .arc()
        .outerRadius(outerDiameter / 2) // Radius of the pie
        .innerRadius(outerDiameter / 2 - strokeWidth) // Inner radius: to create a donut or pie
        .startAngle(index === 0 ? startAngle : slice.startAngle)
        .endAngle(index === 0 ? endAngle : slice.endAngle)
        .cornerRadius(cornerRadius)(),
    }));
    const primaryArc = arcs[1];

    return (
      <View style={style} onLayout={(event) => this._onLayout(event)}>
        {height > 0 && width > 0 && (
          <Svg style={{ height, width }}>
            {/* center the percent circle*/}
            <G x={width / 2} y={height / 2}>
              <Circle
                cx="0"
                cy="0"
                r="99"
                stroke={secondaryColor}
                strokeWidth="3"
              />
              <Path fill={primaryColor} d={primaryArc.path} />
              <Circle cx="0" cy="0" r="89" fill={backgroundColor} />
            </G>
          </Svg>
        )}
      </View>
    );
  }
}

RelativeShareCircle.propTypes = {
  percent: PropTypes.number.isRequired,
  style: PropTypes.any,
  primaryColor: PropTypes.any,
  secondaryColor: PropTypes.any,
  backgroundColor: PropTypes.any,
  strokeWidth: PropTypes.number,
  startAngle: PropTypes.number,
  endAngle: PropTypes.number,
  cornerRadius: PropTypes.number,
};

RelativeShareCircle.defaultProps = {
  primaryColor: BLUE200,
  secondaryColor: GREEN400,
  backgroundColor: BLUE200,
  strokeWidth: 7,
  startAngle: 0,
  endAngle: Math.PI * 2,
  cornerRadius: 0,
};

export default RelativeShareCircle;
