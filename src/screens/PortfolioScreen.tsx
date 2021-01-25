import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

// VirtualisedList
import CoinInfoItem from '../components/CoinInfoItem';
import CoinInfoHeader from '../components/CoinInfoHeader';
import CoinGraph from '../components/CoinGraph';
import AddCoinModal from '../components/AddCoinModal';
import LoadingIndicator from '../components/LoadingIndicator';
import { CoinListing, PortfoloState } from '../types';
import { PortfolioAction } from '../actions';

const windowHeight = Dimensions.get('window').height;

interface StateProps {
  portfolio: PortfoloState;
}

interface DispatchProps {
  portfolioAction: {
    sortByCoinName: (asc: boolean) => void;
    selectCoinGraph: (item: CoinListing) => void;
    fetchCoinList: (
      onComplete: () => void,
    ) => ThunkAction<void, PortfoloState, unknown, Action<string>>;
  };
}
type PropsType = StateProps & DispatchProps;

/**
 * Home screen in mobile app displaying cryptocurrencies in user's portfolio.
 * User can pull the list down from the top to trigger a 'refresh'.
 * Connected to PortfolioAction and derives state from { portfolio } in Redux store.
 */
export function PortfolioScreen({ portfolioAction, portfolio }: PropsType) {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    portfolioAction.fetchCoinList(() => setIsLoading(false));
  }, [portfolioAction]);

  const keyExtractor = (item: CoinListing) => item.name;
  const renderItem = ({ item }: { item: CoinListing }) => {
    const onPress = () => portfolioAction.selectCoinGraph(item);
    return <CoinInfoItem {...item} onPress={onPress} />;
  };
  const divider = () => <View style={styles.divider} />;
  const onRefresh = () => {
    setIsLoading(true);
    portfolioAction.fetchCoinList(() => setIsLoading(false));
  };
  const refreshControlComponent = (
    <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
  );
  return (
    <View style={styles.flex}>
      {showModal && <AddCoinModal onDismiss={() => setShowModal(false)} />}
      <View style={[styles.row, styles.margin]}>
        <Text style={styles.header}>Portfolio</Text>
        {!isLoading && (
          <Pressable onPress={() => setShowModal(true)}>
            <Text style={styles.header}>+</Text>
          </Pressable>
        )}
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <LoadingIndicator />
        </View>
      ) : (
        <>
          {!portfolio.selectedCoinGraph ? (
            <View style={styles.selectedCoinView}>
              <Text style={styles.details}>
                Please select cryptocurrency for more details
              </Text>
            </View>
          ) : (
            <CoinGraph
              name={portfolio.selectedCoinGraph.name}
              data={portfolio.selectedCoinGraph.data}
            />
          )}
          <CoinInfoHeader onCoinHeaderCb={portfolioAction.sortByCoinName} />
          <FlatList<CoinListing>
            testID="coinList"
            data={portfolio.coinList}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            style={styles.flex}
            ItemSeparatorComponent={divider}
            refreshControl={refreshControlComponent}
            extraData={portfolio}
          />
        </>
      )}
    </View>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    portfolioAction: bindActionCreators(PortfolioAction, dispatch),
  };
};

const mapStateToProps = (state: { portfolio: PortfoloState }) => {
  const { portfolio } = state;
  return { portfolio };
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioScreen);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  margin: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
  },
  divider: { height: 2, width: '100%', backgroundColor: '#1c1c1c' },
  selectedCoinView: {
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    height: windowHeight * 0.25,
    margin: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    color: 'white',
    fontSize: 16,
  },
});
