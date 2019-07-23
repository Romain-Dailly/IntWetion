import React from 'react';
import { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';
import VideoPlayer from './VideoPlayer';

describe('Video Component', () => {
  test('should be rendered without error ', () => {
    shallow(<VideoPlayer />);
  });

  test('should have valid props types', () => {
    const expectedProps = {
      youtubeUrl: 'string',
    };

    const error = checkPropTypes(
      VideoPlayer.propTypes,
      expectedProps,
      'props',
      VideoPlayer.name,
    );
    expect(error).toBeUndefined();
  });
});
