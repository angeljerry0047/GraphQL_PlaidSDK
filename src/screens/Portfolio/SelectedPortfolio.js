import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, SafeAreaView, Text, View, FlatList } from 'react-native';

import { calculatePortfolio } from '../../services/portfolio/PortfolioCalculationService';
import AppContainer from '../../components/common/AppContainer';
import Bottom from '../../components/common/Bottom';
import Button from '../../components/common/Button';
import Description from '../../components/common/Description';
import SelectedPortfolio from '../../components/profile/SelectedPortfolio';
import { modelsSelector } from '../../selectors/portfolio';
import { statusActions } from '../../actions/status';
import { portfolioActions } from '../../actions/portfolio';
import {
  WHITE,
  BLACK100,
  GREY500,
  BLUE100,
  GREEN800,
  WHITE200,
} from '../../theme/colors';
import { veryLargeText } from '../../theme/fonts';
import StickyHeader from '../../components/common/StickyHeader';

const SelectedProfile = ({ navigation }) => {
  const [recommendedPortfolio, setRecommendedPortfolio] = useState(
    () => 'Moderate',
  );
  const [position, setPosition] = useState(0);

  const { isLoading } = useSelector((state) => state.portfolio);
  const answers = useSelector((s) => s.portfolio.originalPortfolioAnswers);
  const user = useSelector((s) => s.user.user);
  const portfolio = useSelector((s) => s.portfolio.apex);
  const models = useSelector(modelsSelector);
  const dispatch = useDispatch();

  const handleNextPage = () => {
    const jwtToken = user?.jwt;
    const token = `Bearer ${jwtToken}`;
    dispatch(
      portfolioActions.updatePortfolioRequest({
        modelId: models[recommendedPortfolio].id,
        token,
        router: 'Contribution',
      }),
    );
    dispatch(
      statusActions.setAppCurrentStatus({
        parent: 'Portfolio',
        sub: 'Contribution',
      }),
    );
  };

  const handleOtherPortfolio = () => {
    navigation.navigate('Others', { currentPortfolio: recommendedPortfolio });
  };

  useEffect(() => {
    if (user && portfolio && answers) {
      const recommended = calculatePortfolio(user, portfolio, answers);
      setRecommendedPortfolio(recommended);
    }
  }, [user, portfolio, answers]);

  const renderStickyHeader = () => {
    if (position < 60) {
      return null;
    }
    return (
      <StickyHeader
        centerIcon={
          <Description
            description={`${recommendedPortfolio} Portfolio`}
            textStyle={styles.stickyDescription}
            style={styles.stickyHeader}
          />
        }
      />
    );
  };

  const renderHeader = () => {
    if (position > 60) {
      return null;
    }
    return (
      <View style={styles.headerContainer}>
        <Description
          description="We recommend the"
          textStyle={styles.header}
          style={styles.headerTitle}
        />
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            {recommendedPortfolio} Portfolio
          </Text>
        </View>
      </View>
    );
  };

  const renderItem = () => {
    return (
      <AppContainer style={styles.appContainer} flatList={true}>
        {models && models[recommendedPortfolio] ? (
          <SelectedPortfolio
            model={models?.[recommendedPortfolio]}
            style={styles.flatList}
          />
        ) : null}
      </AppContainer>
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
      <View style={styles.bottomAppContainer}>
        <Bottom
          label="Looks good"
          onPress={handleNextPage}
          buttonWithKeyboardAwayStyle={styles.bottom}
          isLoading={isLoading}>
          {recommendedPortfolio !== 'Balanced' && (
            <Button
              label="View other portfolios"
              onPress={handleOtherPortfolio}
              style={styles.closeButton}
              textStyle={styles.text}
            />
          )}
        </Bottom>
      </View>
    </SafeAreaView>
  );
};

export default SelectedProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  appContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  headerContainer: {
    alignItems: 'center',
  },
  stickyDescription: {
    color: BLACK100,
  },
  stickyHeader: { marginTop: 0 },
  header: {
    color: BLACK100,
  },
  descriptionContainer: {
    marginTop: 5,
    marginBottom: 17,
  },
  description: {
    ...veryLargeText,
    fontWeight: '600',
    color: BLACK100,
  },
  closeButton: {
    backgroundColor: GREY500,
    marginTop: 14,
  },
  text: {
    color: BLUE100,
  },
  flatList: {
    width: '100%',
    borderRadius: 12,
    borderColor: GREEN800,
    borderWidth: 1,
    marginBottom: 200,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  bottomAppContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: WHITE,
    padding: 30,
    paddingTop: 20,
  },
  bottom: {
    backgroundColor: WHITE,
    paddingTop: 20,
    borderTopColor: WHITE200,
    borderTopWidth: 1,
  },
  headerTitle: {
    marginTop: 19,
  },
});
