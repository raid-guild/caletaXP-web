import React from 'react';
import { submissionDeadline } from '../../utils/Helpers';

const SubmissionCountdown = ({ upCount }) => {
  const time = submissionDeadline();
  return (
    <div className="countdown-timer">
      <p>
        <span>{time}</span> left to claim <span>{upCount}</span> 1Ups
      </p>
    </div>
  );
};

export default SubmissionCountdown;
