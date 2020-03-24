import React from 'react';
import { submissionDeadline } from '../../utils/Helpers';

const SubmissionCountdown = () => {
  const time = submissionDeadline();
  return (
    <div className="social-links">
      <p>Submission deadline for last week&apos;s 1Ups is {time}</p>
    </div>
  );
};

export default SubmissionCountdown;
