import React, { useMemo } from 'react';
import { AreaChart, Path } from 'react-native-svg-charts';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import * as shape from 'd3-shape';

import { GREEN400, GREEN1100 } from '../../theme/colors';

const BalanceChart = ({
  data,
  style,
  lineColor = GREEN1100,
  gradientStartColor = GREEN400,
  gradientStartOpacity = 0.2,
}) => {
  const yMin = useMemo(() => {
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const valueRange = maxValue - minValue;
    const verticalSpacer = valueRange / 5;
    return minValue - verticalSpacer;
  }, [data]);

  const Line = ({ line }) => (
    <Path d={line} stroke={lineColor} fill={'none'} strokeWidth={1.5} />
  );

  const Gradient = ({ index }) => (
    <Defs key={index}>
      <LinearGradient id={'gradient'} x1={'0%'} y1={'100%'} x2={'0%'} y2={'0%'}>
        <Stop
          offset={'100%'}
          stopColor={gradientStartColor}
          stopOpacity={gradientStartOpacity}
        />
        <Stop offset={'0%'} stopColor={gradientStartColor} stopOpacity={0} />
      </LinearGradient>
    </Defs>
  );

  if (!data) {
    return null;
  }

  return (
    <AreaChart
      style={style}
      data={data}
      yMin={yMin}
      start={yMin}
      curve={shape.curveLinear}
      svg={{
        fill: 'url(#gradient)',
      }}
      contentInset={{ top: 2, bottom: 2, left: 0, right: 0 }}>
      <Line />
      <Gradient />
    </AreaChart>
  );
};

export default BalanceChart;
