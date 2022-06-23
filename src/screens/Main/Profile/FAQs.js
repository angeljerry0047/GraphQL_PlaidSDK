import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';

import StickyHeader from '../../../components/common/StickyHeader';
import Title from '../../../components/common/Title';
import Header from '../../../components/common/Header';
import InfoPanel from '../../../components/profile/InfoPanel';
import Article from '../../../components/home/Article';

import {
  WHITE400,
  WHITE,
  BLUE100,
  GREEN800,
  BLACK100,
} from '../../../theme/colors';
import { normalText } from '../../../theme/fonts';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';
import ForwardSvg from '../../../assets/icons/home/Forward-black-icon.svg';

const FAQs = ({ navigation, route }) => {
  const [position, setPosition] = useState(0);
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { stories } = useSelector((state) => state.home);

  const faqs = useMemo(() => {
    const data = stories.filter((v) => v.sys.contentType.sys.id === 'faq');
    return data;
  }, [stories]);

  const goBack = () => {
    navigation.goBack();
  };

  const showDetailContent = (item) => {
    setSelectedItem(item);
    setInfoModalVisible(true);
  };

  const renderHeader = () => {
    if (position > 60) {
      return null;
    }
    return (
      <>
        <Header
          leftIcon={<ArrowBackSvg />}
          onPressLeft={goBack}
          containerStyle={styles.containerStyle}
        />
        <Title label="FAQs" style={styles.title} />
      </>
    );
  };

  const renderStickyHeader = () => {
    if (position < 60) {
      return null;
    }
    return (
      <StickyHeader
        onPressLeft={goBack}
        leftIcon={<ArrowBackSvg />}
        centerIcon={<Text style={styles.stickyHeaderText}>FAQs</Text>}
      />
    );
  };

  const renderItem = () => {
    return (
      <View style={styles.flatList}>
        <FlatList
          data={faqs}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => showDetailContent(item)}>
              <View
                style={[
                  styles.itemContainer,
                  index !== faqs.length - 1 && styles.border,
                ]}>
                <Text style={styles.label} numberOfLines={2}>
                  {item?.fields.question}
                </Text>
                <View style={styles.icon}>
                  <ForwardSvg />
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => `profile${index}`}
          scrollEnabled={false}
          style={styles.activityFlatList}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderStickyHeader()}
      <FlatList
        data={['']}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        onScroll={(e) => setPosition(e.nativeEvent.contentOffset.y)}
        nestedScrollEnabled
        ListHeaderComponent={renderHeader}
      />
      <Modal
        isVisible={isInfoModalVisible}
        swipeDirection="down"
        style={styles.modal}
        onBackdropPress={() => setInfoModalVisible(false)}
        backdropColor={BLUE100}
        backdropOpacity={0.25}>
        <InfoPanel
          handleDismiss={() => setInfoModalVisible(false)}
          description={selectedItem?.fields?.answer}
          title={selectedItem?.fields?.question}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default FAQs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },
  appContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  activityFlatList: {
    width: '100%',
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    borderColor: GREEN800,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 36,
  },

  title: {
    paddingLeft: 30,
  },
  containerStyle: {
    paddingTop: 10,
  },
  stickyHeaderText: {
    ...normalText,
    color: BLACK100,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  itemContainer: {
    paddingVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  border: {
    borderBottomColor: GREEN800,
    borderBottomWidth: 1,
  },
  label: {
    ...normalText,
    color: BLACK100,
    marginRight: 30,
  },
  icon: {
    marginTop: 4,
  },
  flatList: {
    paddingHorizontal: 30,
  },
});
