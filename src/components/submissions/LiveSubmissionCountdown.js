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
          <div className="live-countdown-timer">
            <>
              <div>
                <p className="number">{countdown.days}</p>
                <p>Days</p>
              </div>
              <div>
                <p className="number">{countdown.minutes}</p>
                <p>Minutes</p>
              </div>
              <div>
                <p className="number">{countdown.seconds}</p>
                <p>Seconds</p>
              </div>
            </>
          </div>
          {upCount ? (
            <p>Left to claim {upCount} 1ups</p>
          ) : (
            <p>Left to claim 1ups</p>
          )}
        </>
      ) : null}
    </>
  );
};

export default LiveSubmissionCountdown;
