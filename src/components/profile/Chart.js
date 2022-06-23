import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { PieChart as SVGPieChart } from 'react-native-svg-charts';
import { Defs, LinearGradient, Stop } from 'react-native-svg';

import { BLACK100 } from '../../theme/colors';
import { hexToHSL, HSLToHex } from '../../utility/colors';

const angleToPoints = (angle) => {
  const segment = Math.floor((angle / Math.PI) * 2) + 2;
  const diagonal = ((1 / 2) * segment + 1 / 4) * Math.PI;
  const op = Math.cos(Math.abs(diagonal - angle)) * Math.sqrt(2);
  const x = op * Math.cos(angle);
  const y = op * Math.sin(angle);

  return {
    x1: x < 0 ? 1 : 0,
    y1: y < 0 ? 1 : 0,
    x2: x >= 0 ? x : x + 1,
    y2: y >= 0 ? y : y + 1,
  };
};

const toRadians = (degrees) => {
  return (degrees / 180) * Math.PI;
};

const Chart = ({ gradients, data }) => {
  const gradientsData = useMemo(() => {
    if (!gradients || !data) {
      return [];
    }
    const { startColor, stopColor } = gradients;
    const startHSL = hexToHSL(startColor);
    const stopHSL = hexToHSL(stopColor);
    const lightnessDiff = stopHSL.l - startHSL.l;
    const stepSize = lightnessDiff / data.length;
    let start = 0;
    const temp = data.map((el, index) => {
      const startAngle = ((start + el.weight / 2) / 100) * 360;
      const angle = toRadians(startAngle);
      const pair = angleToPoints(angle);
      start += el.weight;
      return {
        key: `grad${index}`,
        ...pair,
        stopColor1: HSLToHex({
          ...startHSL,
          l: startHSL.l + index * stepSize,
        }),
        stopColor2: HSLToHex({
          ...startHSL,
          l: startHSL.l + (index + 1) * stepSize,
        }),
      };
    });
    return temp;
  }, [data, gradients]);

  const pieChartData = useMemo(() => {
    if (!data) {
      return [];
    }
    const temp = data.map((el, index) => ({
      key: el.id,
      value: el.weight,
      index,
      svg: { fill: `url(#grad${index})` },
      arc: { cornerRadius: 5 },
    }));
    return temp;
  }, [data]);

  const sortFunc = (a, b) => {
    return a.index - b.index;
  };

  const Gradient = ({ gradient }) => {
    return (
      <Defs key={gradient.key}>
        <LinearGradient
          id={gradient.key}
          x1={gradient.x1}
          y1={gradient.y1}
          x2={gradient.x2}
          y2={gradient.y2}>
          <Stop offset={'0%'} stopColor={gradient.stopColor1} />
          <Stop offset={'100%'} stopColor={gradient.stopColor2} />
        </LinearGradient>
      </Defs>
    );
  };

  return (
    <SVGPieChart
      startAngle={Math.PI}
      endAngle={Math.PI * 3}
      style={styles.chart}
      data={pieChartData}
      spacing={0}
      outerRadius={'95%'}
      innerRadius={'90%'}
      sort={sortFunc}>
      {gradientsData.map((gradient) => (
        <Gradient key={gradient.key} gradient={gradient} />
      ))}
    </SVGPieChart>
  );
};

export default Chart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    width: 204,
    height: 204,
    shadowColor: BLACK100,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 1,
  },
});
