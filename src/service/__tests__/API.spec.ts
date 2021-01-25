import { getCoinData, example_portfolio } from '../API';
import * as Utils from '../../util';

jest.useFakeTimers();

describe('getCoinData', () => {
  it('should resolve sample data after timeout', async () => {
    const spy = jest
      .spyOn(Utils, 'generateOneWeekDataSet')
      // @ts-expect-error: mocking generated data
      .mockReturnValue('mock');

    // workaround for timers inside promises here: https://stackoverflow.com/questions/62993577 
    const promise = getCoinData();
    jest.advanceTimersByTime(3000);
    const response = await promise;
    expect(response).toEqual(
      example_portfolio.map((listing) => ({
        ...listing,
        history: 'mock',
      })),
    );
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(
      expect.any(Function),
      expect.any(Number),
    );
    expect(spy).toBeCalledTimes(example_portfolio.length);
  });
});
