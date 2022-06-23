import React from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { keyframes, stagger } from 'popmotion';

import { WHITE, BLACK100, GREEN1200 } from '../../theme/colors';
import { normalBoldText } from '../../theme/fonts';
import StackwellLogoSvg from '../../assets/icons/stackwell-logo.svg';

const COUNT = 5;
const DURATION = 4000;
const initialPhase = { scale: 0, opacity: 1 };
const constructAnimations = () =>
  [...Array(COUNT).keys()].map(() => initialPhase);

export default class App extends React.Component {
  state = {
    animations: constructAnimations(),
  };

  componentDidMount() {
    this.animateCircles();
  }

  animateCircles = () => {
    const actions = Array(COUNT).fill(
      keyframes({
        values: [initialPhase, { scale: 2, opacity: 0 }],
        duration: DURATION,
        loop: Infinity,
        yoyo: Infinity,
      }),
    );

    stagger(actions, DURATION / COUNT).start((animations) => {
      this.setState({ animations });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.appContainer}>
          {this.state.animations.map(({ opacity, scale }, index) => {
            return (
              <Animated.View
                key={index}
                style={[
                  styles.circle,
                  {
                    transform: [{ scale }],
                    opacity,
                  },
                ]}
              />
            );
          })}
          <View style={styles.midCircle}>
            <StackwellLogoSvg />
          </View>
        </View>
        <Text style={styles.description}>{this.props.description1}</Text>
        <Text style={styles.description2}>{this.props.description2}</Text>
      </View>
    );
  }
}

const getCircle = (radius, backgroundColor = GREEN1200) => ({
  backgroundColor,
  width: radius * 2,
  height: radius * 2,
  borderRadius: radius,
  position: 'absolute',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  appContainer: {
    marginTop: hp('35%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: getCircle(110),
  midCircle: {
    ...getCircle(79, WHITE),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(129, 216, 210, 0.26)',
    borderWidth: 1,
  },
  description: {
    marginTop: hp('25%'),
    textAlign: 'center',
    ...normalBoldText,
    fontSize: 16,
    paddingHorizontal: 45,
    color: BLACK100,
  },
  description2: {
    marginTop: 24,
    textAlign: 'center',
    ...normalBoldText,
    fontSize: 16,
    paddingHorizontal: 45,
    color: BLACK100,
  },
});
