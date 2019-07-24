import React from 'react';
import { shallow } from 'enzyme';
import Register from './Register';

describe('Video Component', () => {
  test('should be rendered without error ', () => {
    shallow(<Register />);
  });
});
