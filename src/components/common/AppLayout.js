import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Header from './Header';
import Title from './Title';
import StickyHeader from './StickyHeader';
import StickyHeaderTitle from './StickyHeaderTitle';
import Label from './Label';
import * as NavigationService from '../../services/navigation/NavigationService';
import { WHITE, GREY600, WHITE200 } from '../../theme/colors';

import ArrowBackSvg from '../../assets/icons/arrow-back-icon.svg';
import AppLogoSvg from '../../assets/icons/stackwell-logo.svg';

const { width } = Dimensions.get('screen');

const AppLayout = (props) => {
  const { children, renderListItem, label, from, backVisible = true } = props;
  const [position, setPosition] = useState(0);
  const flatRef = useRef();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (!isKeyboardVisible) {
      setPosition(0);
    }
  }, [isKeyboardVisible]);

  const renderStickyHeader = () => {
    if (position < 60) {
      return null;
    }

    if (from === 'login') {
      return (
        <StickyHeader
          leftIcon={backVisible && <ArrowBackSvg />}
          onPressLeft={backVisible && goBack}
          centerIcon={<AppLogoSvg />}
          rightIcon={
            <TouchableOpacity
              onPress={() => NavigationService.navigate('SignUp')}>
              <Label
                label="Sign up"
                textStyle={styles.label}
                style={styles.labelContainer}
              />
            </TouchableOpacity>
          }
        />
      );
    }
    return (
      <StickyHeader
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        centerIcon={<StickyHeaderTitle label={label} />}
      />
    );
  };

  const renderHeader = () => {
    if (position > 60) {
      return null;
    }
    if (from === 'login') {
      return (
        <Header
          leftIcon={backVisible && <ArrowBackSvg />}
          onPressLeft={backVisible && goBack}
          centerIcon={<AppLogoSvg />}
          rightIcon={
            <TouchableOpacity
              onPress={() => NavigationService.navigate('SignUp')}>
              <Label
                label="Sign up"
                textStyle={styles.label}
                style={styles.labelContainer}
              />
            </TouchableOpacity>
          }
          leftStyle={[styles.leftStyle, styles.leftPadding]}
          rightStyle={styles.leftStyle}
          containerStyle={styles.header}
        />
      );
    }
    return (
      <View>
        <Header
          leftIcon={backVisible && <ArrowBackSvg />}
          onPressLeft={backVisible && goBack}
        />
        <Title label={label} style={styles.title} />
      </View>
    );
  };

  const goBack = () => {
    NavigationService.goBack();
  };

  return (
    <>
      {renderStickyHeader()}
      <KeyboardAvoidingView
        style={styles.keyboardAvoidStyle}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <FlatList
            data={['']}
            ref={flatRef}
            renderItem={() => (
              <View style={styles.content}>{renderListItem()}</View>
            )}
            keyExtractor={(item, index) => index}
            onScrollEndDrag={(e) => {
              if (isKeyboardVisible || from === 'review') {
                setPosition(e.nativeEvent.contentOffset.y);
              }
            }}
            style={styles.flatList}
            ListHeaderComponent={renderHeader}
            keyboardShouldPersistTaps="handled"
          />
          {children}
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: WHITE,
  },
  keyboardAvoidStyle: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  title: {
    paddingHorizontal: 30,
  },
  content: {
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  leftStyle: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  leftPadding: {
    paddingRight: 40,
  },
  labelContainer: {
    marginBottom: 0,
    paddingLeft: 12,
  },
  label: {
    color: GREY600,
  },
  header: {
    borderBottomColor: WHITE200,
    borderBottomWidth: 1,
    marginBottom: 53,
    width: width - 60,
    paddingHorizontal: 0,
    alignSelf: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
});

export default AppLayout;
