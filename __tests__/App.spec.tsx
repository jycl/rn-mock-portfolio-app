/**
 * @format
 */

import 'react-native';
import React from 'react';
import App, { GenericScreen } from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('App', () => {
  it('renders correctly', () => {
    renderer.create(<App />);
  });

  it('GenericScreen with no route matches snapshot', () => {
    expect(renderer.create(<GenericScreen />)).toMatchSnapshot();
  });

  it('GenericScreen with route matches snapshot', () => {
    const props = { route: { name: 'Portfolio' } };
    expect(renderer.create(<GenericScreen {...props} />)).toMatchSnapshot();
  });
});
