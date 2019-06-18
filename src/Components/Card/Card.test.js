import React from 'react';
import { mount } from 'enzyme';
import Card from './Card';

describe('Card Component', () => {
  const data = {
    name: "toto",
    description: "qfzkrnhmgkbjqvzakfzg",
    imageUrl:'https://via.placeholder.com/500'
  }
  test('should be rendered without error ', () => {
    mount(<Card data= {data}/>);
  });
});
