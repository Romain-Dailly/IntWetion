import React from 'react';
import { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';
import Video from './Video';

describe('Video Component', () => {
  test('should be rendered without error ', () => {
    shallow(<Video />);
  });

  test('should have valid props types', () => {
    const expectedProps = {
      onEnded: () => {},
      videoKey: 'string',
      onContinue: () => {},
      onClose: () => {},
    };

    const error = checkPropTypes(
      Video.propTypes,
      expectedProps,
      'props',
      Video.name,
    );
    expect(error).toBeUndefined();
  });
});
