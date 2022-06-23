import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppContainer from '../../../../components/common/AppContainer';
import Title from '../../../../components/common/Title';
import SelectInput from '../../../../components/common/SelectInput';
import Header from '../../../../components/common/Header';
import Description from '../../../../components/common/Description';
import Bottom from '../../../../components/common/Bottom';
import Button from '../../../../components/common/Button';
import { WHITE400, BLUE100, GREY500 } from '../../../../theme/colors';
import { homeActions } from '../../../../actions/home';
import ArrowBackSvg from '../../../../assets/icons/arrow-back-icon.svg';

const REASONS = [
  {
    value: 'no-longer1',
    label: 'I no longer want to invest.',
  },
  {
    value: 'no-longer2',
    label: 'I no longer want to invest.',
  },
  {
    value: 'no-longer3',
    label: 'I no longer want to invest.',
  },
  {
    value: 'other',
    label: 'Other.',
  },
];

const CloseOption = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { accountCloseLoading } = useSelector((state) => state.home);

  const [selectedItem, setSelectedItem] = useState([]);
  const handleNextPage = () => {
    if (selectedItem[0] === 'other') {
      return navigation.navigate('OtherReason');
    } else {
      const token = `Bearer ${user?.jwt}`;
      const reason = REASONS.find((el) => el.value === selectedItem[0]);
      dispatch(
        homeActions.setCloseReasonRequest({
          reason: reason.label,
          token,
        }),
      );
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        containerStyle={styles.header}
      />
      <AppContainer>
        <Title label="Close Stackwell account" />
        <Description
          description="Hi there. Please let us know why you’d like to close your account and a support specialist will contact you to handle this further."
          style={styles.description}
        />
        {REASONS.map((reason, index) => (
          <SelectInput
            key={reason.value}
            item={reason}
            handleSelectedItem={(type) => {
              const temp = [];
              temp.push(type);
              setSelectedItem(temp);
            }}
            containerStyle={styles.selectInput}
            selectedItems={selectedItem}
            isIcon
          />
        ))}
        <Bottom
          label="Have someone contact me"
          onPress={handleNextPage}
          isLoading={accountCloseLoading}
          isDisabled={selectedItem.length === 0}>
          <Button
            label="Cancel"
            onPress={goBack}
            style={styles.closeButton}
            textStyle={styles.text}
          />
        </Bottom>
      </AppContainer>
    </SafeAreaView>
  );
};

export default CloseOption;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },
  selectInput: {
    marginTop: 25,
  },
  description: {
    marginBottom: 11,
  },
  closeButton: {
    backgroundColor: GREY500,
    marginTop: 14,
  },
  text: {
    color: BLUE100,
  },
  header: {
    paddingTop: 10,
  },
});
