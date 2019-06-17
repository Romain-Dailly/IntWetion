import React from 'react';

function ProgressBar(props) {
  // eslint-disable-next-line react/prop-types
  const { lengthQuestion, countQuestion } = props;

  return (
    <div ClassName="progress">
      <div
        ClassName="progress-bar"
        role="progressbar"
        aria-valuenow={countQuestion}
        aria-valuemin="1"
        aria-valuemax={lengthQuestion} />
    </div>
  );
}
export default ProgressBar;
