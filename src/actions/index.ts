import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  GET_LATEST_COIN_DATA_START,
  GET_LATEST_COIN_DATA_SUCCESS,
  GET_LATEST_COIN_DATA_FAILURE,
  SORT_BY_NAME,
  SELECT_COIN_GRAPH,
} from '../constants';
import {
  PortfoloState,
  GetCoinListStartActionType,
  GetCoinListSuccessActionType,
  GetCoinListFailureActionType,
  SortCoinListActionType,
  CoinListing,
} from '../types';
import { getCoinData } from '../service/API';

export const fetchCoinListStart = (): GetCoinListStartActionType => ({
  type: GET_LATEST_COIN_DATA_START,
});

export const fetchCoinListFailure = (): GetCoinListFailureActionType => ({
  type: GET_LATEST_COIN_DATA_FAILURE,
});

export const fetchCoinListSuccess = (
  newCoinList: CoinListing[],
): GetCoinListSuccessActionType => ({
  type: GET_LATEST_COIN_DATA_SUCCESS,
  newCoinList,
});

export const fetchCoinList = (
  onComplete: () => void,
): ThunkAction<void, PortfoloState, unknown, Action<string>> => {
  return function (dispatch: Dispatch) {
    dispatch(fetchCoinListStart());
    return getCoinData().then(
      (list: CoinListing[]) => {
        dispatch(fetchCoinListSuccess(list));
        onComplete && onComplete();
      },
      () => {
        // fetch failed, dispatch failure action and set list to empty arr
        dispatch(fetchCoinListFailure());
        onComplete && onComplete();
      },
    );
  };
};

export const sortByCoinName = (ascending: boolean): SortCoinListActionType => ({
  type: SORT_BY_NAME,
  ascending,
});

export const selectCoinGraph = (selectedCoin: CoinListing) => ({
  type: SELECT_COIN_GRAPH,
  selectedCoin,
});

export const PortfolioAction = {
  fetchCoinList,
  sortByCoinName,
  selectCoinGraph,
};
