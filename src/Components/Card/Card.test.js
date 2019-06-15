import React from 'react';
import { mount } from 'enzyme';
import Card from './Card';

describe('Card Component', () => {
  test('should be rendered without error ', () => {
    mount(<Card />);
  });
});
