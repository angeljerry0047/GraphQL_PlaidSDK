import React, { useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { BLACK100, GREEN800, WHITE, GREY800 } from '../../theme/colors';
import { mediumText } from '../../theme/fonts';
import BulbSvg from '../../assets/icons/home/Bulb-icon.svg';
import ArticleSvg from '../../assets/icons/home/Article-icon.svg';

const Story = ({ item, index, navigation }) => {
  const icon = useMemo(() => {
    if (item.sys.type === 'Entry') {
      return <ArticleSvg />;
    }
    return <BulbSvg />;
  }, [item]);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ContentfulArticle', {
          selectedIndex: index,
        })
      }>
      <View style={styles.container}>
        <View style={styles.icon}>{icon}</View>
        <View style={styles.textContainer}>
          <Text style={styles.description} numberOfLines={3}>
            {item.fields.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Story;

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    borderRadius: 12,
    borderColor: GREEN800,
    borderWidth: 1,
    width: 150,
    height: 150,
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: GREY800,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    ...mediumText,
    fontWeight: '600',
    color: BLACK100,
    marginTop: 14,
  },
});
