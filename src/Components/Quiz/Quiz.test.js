import React from 'react';
import { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';
import Quiz from './Quiz';

describe('Modal Component', () => {
  test('should be rendered without error ', () => {
    shallow(
      <Modal>
        <div>Test model</div>
      </Modal>,
    );
  });

  test('should have valid props types', () => {
    const expectedProps = () => <div>Test model</div>;

    const error = checkPropTypes(Modal.propTypes, expectedProps, 'props', Modal.name);
    expect(error).toBeUndefined();
  });
});
