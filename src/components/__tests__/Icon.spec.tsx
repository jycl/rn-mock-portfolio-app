import React from 'react';
import TestRenderer from 'react-test-renderer';
import Icon from '../Icon';

describe('Icon component', () => {
  it('should match snapshot rendering given defined props', () => {
    const renderItem = TestRenderer.create(<Icon name="more" color="black" />);
    expect(renderItem.toJSON()).toMatchSnapshot();
  });
});
