import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';

import AppLayout from '../../../components/common/AppLayout';
import TextInput from '../../../components/common/TextInput';
import Description from '../../../components/common/Description';
import Label from '../../../components/common/Label';
import Bottom from '../../../components/common/Bottom';
import { updateUserInformation } from '../../../graphql/mutations';
import { WHITE, BLACK100, BLACK200 } from '../../../theme/colors';
import { mediumText, veryLargeText, verySmallText } from '../../../theme/fonts';
import { GOOGLE_API_KEY } from '../../../config';
import { userActions } from '../../../actions/user';
import { validationStr } from '../../../utility';
import ClearSvg from '../../../assets/icons/clear-icon.svg';

const AddressInputView = ({ route, navigation }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [countryState, setCountryState] = useState('');
  const [apartment, setApartment] = useState('');
  const [error, setError] = useState(null);
  const googleRef = useRef();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    googleRef?.current.focus();
    if (user?.address?.streetAddress) {
      googleRef?.current.setAddressText(user.address?.streetAddress);
      setCity(user.address?.city);
      setPostalCode(user.address?.postalCode);
      setCountryState(user.address?.state);
      setAddress(user.address?.streetAddress);
    }
  }, [user]);

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

  const handleNextPage = async () => {
    if (
      apartment?.length > 0 &&
      (!apartment.trim() || !validationStr(apartment))
    ) {
      setError('Please enter a valid appartment.');
      return;
    }

    try {
      const userInfo = await API.graphql(
        graphqlOperation(updateUserInformation, {
          input: {
            id: user.id,
            address: {
              city: city,
              postalCode: postalCode,
              state: countryState,
              streetAddress: address,
            },
            appStatus: {
              parent: 'SignUp',
              sub: 'Step11',
            },
            usCitizen: true,
          },
        }),
      );
      dispatch(
        userActions.setUserInfo({
          ...userInfo.data.updateUserInformation,
          apartment,
        }),
      );
    } catch (err) {
      console.log(err);
      return;
    }

    if (address) {
      setError(null);
      if (route?.params?.from === 'review') {
        navigation.navigate('Step13');
        return;
      }
      navigation.navigate('Step11');
      return;
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
      )?.short_name;

    const _countryState =
      details?.address_components.find((addressComponent) =>
        addressComponent.types.includes('administrative_area_level_1'),
      )?.short_name || '';
    if (!streetNum) {
      googleRef?.current.setAddressText('');
      return;
    }
    setCity(addressCity);
    setPostalCode(zipCode);
    setCountryState(_countryState);
    setAddress(`${streetNum} ${address1}`);
    googleRef?.current.setAddressText(`${streetNum} ${address1}`);
  };

  const clearAddress = () => {
    googleRef.current?.clear();
    setAddress('');
    setCity('');
    setCountryState('');
    setPostalCode('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppLayout
        label="Please enter your address."
        renderListItem={() => (
          <View style={styles.content}>
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
                // disableScroll={false}
                isRowScrollable
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
                autoFocus={true}
              />
            </View>
            <Text style={styles.address}>{`${
              city ? `${city},` : ''
            } ${countryState} ${postalCode}`}</Text>
            <TextInput
              label="Apartment or unit # (optional)"
              placeholder=""
              onChangeText={handleApartment}
              text={apartment}
              error={error}
              onSubmitEditing={handleNextPage}
            />
          </View>
        )}>
        <Bottom
          label={route?.params?.from === 'review' ? 'Update' : 'Continue'}
          onPress={handleNextPage}
          isDisabled={!address}
          buttonWithKeyboardAwayStyle={styles.buttonWithKeyboardAwayStyle}
        />
      </AppLayout>
    </SafeAreaView>
  );
};

export default AddressInputView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  content: {
    flex: 1,
    marginBottom: 180,
  },
  addressContainer: {
    position: 'relative',
    marginTop: 51,
    // marginBottom: 37,
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
  buttonWithKeyboardAwayStyle: {
    position: 'relative',
  },
});
