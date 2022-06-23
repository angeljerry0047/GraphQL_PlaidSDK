import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { BLACK100, GREY200 } from '../../theme/colors';
import { veryLargeText } from '../../theme/fonts';
import Label from './Label';
import ErrorText from './ErrorText';

const BaseTextInput = (props) => {
  const {
    onChangeText,
    secureTextEntry = false,
    containerStyle,
    labelStyle,
    labelTextStyle,
    textInputStyle,
    label,
    bottomLabel,
    bottomLabelStyle,
    text,
    error,
    errorStyle,
    keyboardType = 'default',
    editable = true,
    onPress,
    icon,
    placeholder,
    autoCapitalize = 'none',
    onSubmitEditing,
    onFocus,
    onBlur,
    autoFocus = false,
    children,
    placeholderTextColor = '#888',
    multiline = false,
    autoCorrect = true,
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [borderColor, setBorderColor] = useState({
    borderColor: BLACK100,
  });

  useEffect(() => {
    if (isFocused) {
      setBorderColor({
        borderColor: BLACK100,
      });
    } else {
      setBorderColor({
        borderColor: GREY200,
      });
    }
  }, [isFocused]);

  const handleOnChangeText = (val) => {
    onChangeText(val);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Label label={label} style={labelStyle} textStyle={labelTextStyle} />
      <View style={styles.view}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={handleOnChangeText}
          secureTextEntry={secureTextEntry}
          style={[styles.textInput, textInputStyle, borderColor]}
          value={text}
          keyboardType={keyboardType}
          editable={editable}
          autoCapitalize={autoCapitalize}
          onSubmitEditing={onSubmitEditing}
          onFocus={() => {
            onFocus;
            setIsFocused(true);
          }}
          onBlur={() => {
            onBlur;
            setIsFocused(false);
          }}
          autoFocus={autoFocus}
          multiline={multiline}
          autoCorrect={autoCorrect}
        />
        {children}
        {!!icon && (
          <TouchableOpacity onPress={onPress}>
            <View style={styles.icon}>{icon}</View>
          </TouchableOpacity>
        )}
      </View>
      {!!error && <ErrorText error={error} errorStyle={errorStyle} />}
      {!!bottomLabel && (
        <Label
          label={bottomLabel}
          style={labelStyle}
          textStyle={bottomLabelStyle}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    ...veryLargeText,
    color: BLACK100,
    borderColor: BLACK100,
    borderBottomWidth: 1,
    paddingBottom: 9,
    paddingRight: 25,
  },
  container: {},
  view: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    paddingLeft: 20,
    paddingVertical: 13,
  },
});

export default BaseTextInput;
