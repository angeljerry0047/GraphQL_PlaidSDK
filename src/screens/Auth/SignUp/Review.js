import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { ifIphoneX } from 'react-native-iphone-x-helper';
// import OneSignal from 'react-native-onesignal';

import AppLayout from '../../../components/common/AppLayout';
import Bottom from '../../../components/common/Bottom';
import TextInput from '../../../components/common/TextInput';
import ErrorText from '../../../components/common/ErrorText';
import { userActions } from '../../../actions/user';
import { notificationActions } from '../../../actions/notification';
import { WHITE, WHITE200, BLACK200, BLACK100 } from '../../../theme/colors';
import { verySmallText, normalText } from '../../../theme/fonts';
import { updateUserInformation } from '../../../graphql/mutations';
import EditSvg from '../../../assets/icons/edit-icon.svg';

const ReviewPage = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const handleNextPage = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const loggedUser = await Auth.signIn({
        username: user.email,
        password: user.password,
      });
      const res = await Auth.updateUserAttributes(loggedUser, {
        family_name: user.firstName,
        given_name: user.lastName,
        birthdate: user.dateOfBirth,
        address: user.address?.streetAddress,
      });

      const currentSession = await Auth.currentSession();
      const jwt = currentSession.getAccessToken().getJwtToken();

      dispatch(
        userActions.setLoggedUser({
          ...loggedUser,
          ...res,
          jwt,
        }),
      );

      dispatch(
        userActions.setUserInfo({
          jwt,
        }),
      );

      // OneSignal.addSubscriptionObserver((response) => {
      //   console.log('addSubscriptionObserver:', response);
      //   dispatch(
      //     notificationActions.setNotificationInfoRequest({
      //       token: `Bearer ${jwt}`,
      //       data: {
      //         subscriptionID: response.to.userId,
      //         pushToken: response.to.pushToken,
      //         // isSubscribed: response.to.isSubscribed,
      //         deviceType: Platform.OS,
      //         deviceMeta: 'iOS 11',
      //         userIP: '66.154.104.114',
      //         location: '107 SE Washington St, Ste 256',
      //       },
      //     }),
      //   );
      // });

      handleUpdateUser();
    } catch (err) {
      setErrorMessage(err.message);
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const data = {
        dateOfBirth: user.dateOfBirth,
        address: {
          city: user.address?.city,
          postalCode: user.address?.postalCode,
          state: user.address?.state,
          streetAddress: user.address?.streetAddress,
          country: 'US',
        },
        firstName: user.firstName,
        lastName: user.lastName,
        lastFourSSN: user.lastFourSSN,
        usCitizen: true,
        id: user.id,
        appStatus: {
          parent: 'Portfolio',
          sub: 'Congration',
        },
      };
      const userInfo = await API.graphql(
        graphqlOperation(updateUserInformation, {
          input: data,
        }),
      );

      dispatch(
        userActions.setUserInfo({
          ...userInfo.data.updateUserInformation,
        }),
      );
      navigation.navigate('Portfolio');
    } catch (err) {
      setErrorMessage(err.message);
      console.log('update user err', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppLayout
        label="Please review your info."
        from="review"
        renderListItem={() => (
          <>
            <TextInput
              label="Legal first name"
              text={user.firstName}
              containerStyle={styles.textInput}
              icon={<EditSvg />}
              editable={false}
              onPress={() =>
                navigation.push('Step3', {
                  from: 'review',
                })
              }
            />
            <TextInput
              label="Legal last name"
              text={user.lastName}
              containerStyle={styles.textInput}
              icon={<EditSvg />}
              editable={false}
              onPress={() =>
                navigation.push('Step4', {
                  from: 'review',
                })
              }
            />
            <TextInput
              label="Date of birth"
              text={user.dateOfBirth}
              containerStyle={styles.textInput}
              icon={<EditSvg />}
              editable={false}
              onPress={() =>
                navigation.push('Step11', {
                  from: 'review',
                })
              }
            />
            <TextInput
              label="Social security number"
              text={`****-**-${user.lastFourSSN}`}
              containerStyle={styles.textInput}
              icon={<EditSvg />}
              editable={false}
              onPress={() =>
                navigation.push('Step12', {
                  from: 'review',
                })
              }
            />
            <TextInput
              label="U.S. address"
              text={user.address?.streetAddress}
              containerStyle={styles.textInput}
              numberOfLine={2}
              icon={<EditSvg />}
              editable={false}
              onPress={() =>
                navigation.push('Step9', {
                  from: 'review',
                })
              }
            />
            <Text style={styles.address}>{`${
              user.address?.city ? `${user.address?.city},` : ''
            } ${user.address?.state} ${user.address?.postalCode}`}</Text>
            {!!errorMessage && <ErrorText error={errorMessage} />}
          </>
        )}>
        <Bottom
          label="Looks good"
          onPress={handleNextPage}
          isLoading={isLoading}
          buttonWithKeyboardAwayStyle={styles.buttonWithKeyboardAwayStyle}
        />
      </AppLayout>
    </SafeAreaView>
  );
};

export default ReviewPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  title: {
    marginBottom: 14,
  },
  textInput: {
    marginTop: 37,
  },
  address: {
    ...verySmallText,
    color: BLACK200,
    marginTop: 10,
    marginBottom: 37,
  },
  flatList: {
    marginBottom: 60,
  },
  content: {
    paddingHorizontal: 30,
  },
  stickyTitle: {
    ...normalText,
    color: BLACK100,
    width: 205,
    textAlign: 'center',
  },
  buttonWithKeyboardAwayStyle: {
    position: 'relative',
    ...ifIphoneX(
      {},
      {
        borderTopColor: WHITE200,
        borderTopWidth: 1,
      },
    ),
  },
});
