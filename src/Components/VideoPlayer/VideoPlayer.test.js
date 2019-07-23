import React from 'react';
import { mount } from 'enzyme';
import VideoPlayer from './VideoPlayer';

describe('Video Component', () => {
  test('should be rendered without error ', () => {
    mount(<VideoPlayer />);
  });
});
