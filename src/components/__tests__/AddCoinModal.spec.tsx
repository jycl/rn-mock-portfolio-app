import React from 'react';
import TestRenderer from 'react-test-renderer';
import AddCoinModal from '../AddCoinModal';

describe('AddCoinModal component', () => {
  it('should match snapshot rendering given defined props', () => {
    const renderItem = TestRenderer.create(<AddCoinModal />);
    expect(renderItem.toJSON()).toMatchSnapshot();
  });
});
