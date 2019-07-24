import React from 'react';
import { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';
import NavBar from './NavBar';

describe('NavBar Component', () => {
  test('should be rendered without error ', () => {
    shallow(<NavBar />);
  });

  test('should have valid props types', () => {
    const expectedProps = {
      title: 'string',
    };

    const error = checkPropTypes(NavBar.propTypes, expectedProps, 'props', NavBar.name);
    expect(error).toBeUndefined();
  });
});
