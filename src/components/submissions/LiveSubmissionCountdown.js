import React, { useEffect, useState } from 'react';

import { liveSubmissionDeadline } from '../../utils/Helpers';

const LiveSubmissionCountdown = ({ upCount }) => {
  const [countdown, setCountdown] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      const duration = liveSubmissionDeadline();
      setCountdown(duration);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {countdown ? (
        <>
        <div className="live-countdown-wrapper">
          {upCount ? (
              <p>Time left to claim {upCount} 1UPs:</p>
            ) : (
              <p>Submission claim window closes in:</p>
          )}
          <div className="live-countdown-timer">
            <>
              <div>
                <p className="number">{countdown.days}</p>
                <p>d</p>
              </div>
              <div>
                <p className="number">{countdown.minutes}</p>
                <p>m</p>
              </div>
              <div>
                <p className="number">{countdown.seconds}</p>
                <p>s</p>
              </div>
            </>
          </div>
        </div>
        </>
      ) : null}
    </>
  );
};

export default LiveSubmissionCountdown;
