import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import AppContainer from '../../../components/common/AppContainer';
import Title from '../../../components/common/Title';
import TextInput from '../../../components/common/TextInput';
import Description from '../../../components/common/Description';
import Header from '../../../components/common/Header';
import Label from '../../../components/common/Label';
import Bottom from '../../../components/common/Bottom';
import { GOOGLE_API_KEY } from '../../../config';
import { validationStr } from '../../../utility';
import { WHITE, WHITE400, BLACK100, BLACK200 } from '../../../theme/colors';
import { mediumText, veryLargeText, verySmallText } from '../../../theme/fonts';
import ArrowBackSvg from '../../../assets/icons/arrow-back-icon.svg';
import ClearSvg from '../../../assets/icons/clear-icon.svg';

const TrustedAddress = ({ route, navigation }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const [apartment, setApartment] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const googleRef = useRef();

  useEffect(() => {
    googleRef?.current.focus();
  }, []);

  useEffect(() => {
    if (
      address?.toLowerCase().includes('p.o') ||
      address?.toLowerCase().includes('po box')
    ) {
      setError('A P.O. Box cannot be used.');
      setAddress('');
    }
  }, [address]);

  const handleApartment = (text) => {
    setApartment(text);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleNextPage = async () => {
    if (
      apartment?.length > 0 &&
      (!apartment.trim() || !validationStr(apartment))
    ) {
      setError('Please enter a valid appartment.');
      return;
    }
    const streetAddress = [];
    if (address) {
      setIsLoading(true);
      setError(null);
      const trustedAddress = {
        city: city,
        postalCode: postalCode,
        state: state,
        streetAddress: streetAddress.concat(address),
        country: 'USA',
      };
      route.params.onSelect(trustedAddress);
      navigation.goBack();
    }
    setError('Please enter your address');
  };

  const getFullAddress = (details) => {
    setError(null);
    const zipCode =
      details?.address_components.find((addressComponent) =>
        addressComponent.types.includes('postal_code'),
      )?.short_name || '';

    const streetNum =
      details?.address_components.find((addressComponent) =>
        addressComponent.types.includes('street_number'),
      )?.long_name || '';

    const address1 =
      details?.address_components.find((addressComponent) =>
        addressComponent.types.includes('route'),
      )?.long_name || '';

    const addressCity =
      details?.address_components.find((addressComponent) =>
        addressComponent.types.includes('locality'),
      )?.short_name ||
      details?.address_components.find((addressComponent) =>
        addressComponent.types.includes('sublocality_level_1'),
      )?.short_name ||
      details?.address_components.find((addressComponent) =>
        addressComponent.types.includes('administrative_area_level_2'),
      )?.short_name;

    const addressState =
      details?.address_components.find((addressComponent) =>
        addressComponent.types.includes('administrative_area_level_1'),
      )?.short_name || '';
    if (!streetNum) {
      googleRef?.current.setAddressText('');
      return;
    }
    setCity(addressCity);
    setPostalCode(zipCode);
    setState(addressState);
    setAddress(`${streetNum} ${address1}`);
    googleRef?.current.setAddressText(`${streetNum} ${address1}`);
  };

  const clearAddress = () => {
    googleRef.current?.clear();
    setAddress('');
    setCity('');
    setState('');
    setPostalCode('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={<ArrowBackSvg />}
        onPressLeft={goBack}
        containerStyle={styles.header}
      />
      <AppContainer>
        <Title label="Please enter your address." />
        <Description description="Stackers must have a U.S. address. We can’t accept a corporate address or P.O. Box." />
        <View style={styles.addressContainer}>
          <Label label="U.S. address" />
          <GooglePlacesAutocomplete
            placeholder=""
            ref={googleRef}
            query={{
              key: GOOGLE_API_KEY,
              language: 'en',
              components: 'country:us',
              types: 'address',
            }}
            filterReverseGeocodingByTypes={[
              'postal_code',
              'administrative_area_level_1',
            ]}
            minLength={2}
            fetchDetails={true}
            onPress={(data, details = null) => getFullAddress(details)}
            debounce={200}
            styles={{
              textInput: styles.addressInput,
              listView: styles.list,
              row: {
                paddingLeft: 0,
                paddingTop: 31,
                paddingBottom: 9,
                flexDirection: 'row',
              },
              separator: {
                backgroundColor: WHITE,
              },
              description: {
                color: BLACK100,
                ...mediumText,
              },
            }}
            listViewDisplayed
            nearbyPlacesAPI="GooglePlacesSearch"
            returnKeyType={'search'}
            enablePoweredByContainer={false}
            disableScroll
            autoFocus={true}
            textInputProps={{
              clearButtonMode: 'never',
            }}
            renderRightButton={() => (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearAddress}>
                {!!address && <ClearSvg />}
              </TouchableOpacity>
            )}
          />
        </View>
        <Text style={styles.address}>{`${
          city ? `${city},` : ''
        } ${state} ${postalCode}`}</Text>
        <TextInput
          label="Apartment or unit # (optional)"
          placeholder=""
          onChangeText={handleApartment}
          text={apartment}
          error={error}
          onSubmitEditing={handleNextPage}
        />
        <Bottom
          label={route?.params?.from === 'review' ? 'Update' : 'Continue'}
          onPress={handleNextPage}
          isLoading={isLoading}
          isDisabled={!address}
        />
      </AppContainer>
    </SafeAreaView>
  );
};

export default TrustedAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE400,
  },
  addressContainer: {
    position: 'relative',
    marginTop: 51,
    marginBottom: 37,
    zIndex: 99,
  },
  list: {
    position: 'absolute',
    backgroundColor: WHITE,
    elevation: 3,
    marginTop: 50,
    fontSize: 30,
  },
  addressInput: {
    ...veryLargeText,
    color: BLACK100,
    borderColor: BLACK100,
    borderBottomWidth: 1,
    paddingVertical: 1,
    paddingBottom: 2,
    paddingLeft: 0,
    paddingRight: 60,
    height: 40,
    borderRadius: 0,
    width: '100%',
    padding: 0,
  },
  clearButton: {
    paddingLeft: 40,
    paddingVertical: 13,
    position: 'absolute',
    right: 0,
    top: -3,
  },
  address: {
    ...verySmallText,
    color: BLACK200,
    marginTop: 10,
    marginBottom: 37,
  },
  header: {
    paddingTop: 10,
  },
});
