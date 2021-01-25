import * as PortfolioAction from '../index';
import * as ActionTypes from '../../constants';
import * as API from '../../service/API';

// jest.mock('../../utils/API', () => ({
//   get: jest.fn().mockReturnValue({ response: 'test' }),
// }));

describe('PortfolioAction redux actions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create action with select coin graph type', () => {
    const sampleData = API.example_portfolio[0];
    const expectedAction = {
      type: ActionTypes.SELECT_COIN_GRAPH,
      selectedCoin: sampleData,
    };
    expect(PortfolioAction.selectCoinGraph(sampleData)).toEqual(expectedAction);
  });
  it('should create action with type and ascending true param', () => {
    const expectedAction = {
      type: ActionTypes.SORT_BY_NAME,
      ascending: true,
    };
    expect(PortfolioAction.sortByCoinName(true)).toEqual(expectedAction);
  });

  it('should create action with type and ascending false param', () => {
    const expectedAction = {
      type: ActionTypes.SORT_BY_NAME,
      ascending: false,
    };
    expect(PortfolioAction.sortByCoinName(false)).toEqual(expectedAction);
  });

  it('should create an action after fetch coin data start', () => {
    const expectedAction = {
      type: ActionTypes.GET_LATEST_COIN_DATA_START,
    };
    expect(PortfolioAction.fetchCoinListStart()).toEqual(expectedAction);
  });

  it('should create an action after fetch coin data failure', () => {
    const expectedAction = {
      type: ActionTypes.GET_LATEST_COIN_DATA_FAILURE,
    };
    expect(PortfolioAction.fetchCoinListFailure()).toEqual(expectedAction);
  });

  it('should create an action after fetch coin data success', () => {
    const sampleData = API.example_portfolio;
    const expectedAction = {
      type: ActionTypes.GET_LATEST_COIN_DATA_SUCCESS,
      newCoinList: sampleData,
    };
    expect(PortfolioAction.fetchCoinListSuccess(sampleData)).toEqual(
      expectedAction,
    );
  });

  it('should attempt to fetch coin data and dispatch success with data list on success', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const callback = jest.fn();
    const sampleData = API.example_portfolio;
    const spy = jest
      .spyOn(API, 'getCoinData')
      .mockResolvedValueOnce(sampleData);
    await PortfolioAction.fetchCoinList(callback)(
      dispatch,
      getState,
      undefined,
    );
    expect(dispatch).toBeCalledWith({
      type: ActionTypes.GET_LATEST_COIN_DATA_START,
    });
    expect(dispatch).toBeCalledWith({
      type: ActionTypes.GET_LATEST_COIN_DATA_SUCCESS,
      newCoinList: sampleData,
    });
    expect(spy).toBeCalledTimes(1);
    expect(callback).toBeCalledTimes(1);
    spy.mockClear();
  });

  it('should attempt to fetch coin data and dispatch failure on error', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const callback = jest.fn();
    const spy = jest
      .spyOn(API, 'getCoinData')
      .mockRejectedValueOnce(new Error());
    await PortfolioAction.fetchCoinList(callback)(
      dispatch,
      getState,
      undefined,
    );
    expect(dispatch).toBeCalledWith({
      type: ActionTypes.GET_LATEST_COIN_DATA_START,
    });
    expect(dispatch).toBeCalledWith({
      type: ActionTypes.GET_LATEST_COIN_DATA_FAILURE,
    });
    expect(spy).toBeCalledTimes(1);
    expect(callback).toBeCalledTimes(1);
    spy.mockClear();
  });
});
