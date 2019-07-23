import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('HOME Component', () => {
  test('should be rendered without error ', () => {
    shallow(<Login />);
  });
});
