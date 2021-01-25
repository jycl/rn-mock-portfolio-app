import {
  convertToCurrency,
  sortObjectArrayByField,
  generateOneWeekDataSet,
} from '../index';

describe('Utility functions', () => {
  describe('convertToCurrency function', () => {
    it('should convert regular number to dollar currency', () => {
      expect(convertToCurrency(2000)).toEqual('$2000.00');
    });

    it('should convert 0 to dollar currency', () => {
      expect(convertToCurrency(0)).toEqual('$0.00');
    });

    it('should convert negative number to dollar currency', () => {
      expect(convertToCurrency(-5431)).toEqual('-$5431.00');
    });

    it('should convert decimal place number to dollar currency', () => {
      expect(convertToCurrency(1.23456789)).toEqual('$1.23');
    });

    it('should return input without parsing if invalid', () => {
      expect(convertToCurrency('invalid input')).toEqual('invalid input');
    });
  });

  describe('sortObjectArrayByField function', () => {
    const inputArray = [
      {
        name: 'Ted',
        age: 34,
      },
      {
        name: 'Barney',
        age: 40,
      },
      {
        name: 'Marshall',
        age: 36,
      },
    ];
    it('should return object array in ascending order by key param', () => {
      expect(sortObjectArrayByField(inputArray, 'age', 'asc')).toEqual([
        inputArray[0],
        inputArray[2],
        inputArray[1],
      ]);
      expect(sortObjectArrayByField(inputArray, 'name', 'asc')).toEqual([
        inputArray[1],
        inputArray[2],
        inputArray[0],
      ]);
    });

    it('should return object array in descending order by key param', () => {
      expect(sortObjectArrayByField(inputArray, 'age', 'desc')).toEqual([
        inputArray[1],
        inputArray[2],
        inputArray[0],
      ]);
      expect(sortObjectArrayByField(inputArray, 'name', 'desc')).toEqual([
        inputArray[0],
        inputArray[2],
        inputArray[1],
      ]);
    });
  });

  describe('generateOneWeekDataSet', () => {
    it('should return array', () => {
      const generatedData = generateOneWeekDataSet(1241, 4.91);
      // generate dates for labels (DD/MM)
      generatedData.labels.forEach((label) => {
        expect(label).toEqual(expect.stringMatching(/[0-9][0-9]\/[0-9][0-9]/));
      });
      // generate numbers for price
      generatedData.datasets[0].data.forEach((price) => {
        expect(price).toEqual(expect.any(Number));
      });
    });
  });
});
