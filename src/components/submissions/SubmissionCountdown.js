import React from 'react';
import { submissionDeadline } from '../../utils/Helpers';

const SubmissionCountdown = ({ upCount }) => {
  const time = submissionDeadline();
  return (
    <div className="social-links">
      <p>
        {time} left to claim {upCount} 1Ups
      </p>
    </div>
  );
};

export default SubmissionCountdown;
