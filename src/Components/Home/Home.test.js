import React from 'react';
import { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';
import Home from './Home';


describe('Modal Component', () => {
  const expectedProps = [{
    name: 'name',
    description: 'description',
    imageUrl: 'imageUrl',
  }];

  test('should be rendered without error ', () => {
    shallow(<Home cards={expectedProps} />);
  });

  test('should have valid props types', () => {
    const error = checkPropTypes(Home.propTypes, expectedProps, 'props', Home.name);
    expect(error).toBeUndefined();
  });
});
