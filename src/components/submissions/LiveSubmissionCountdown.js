import React, { useEffect, useState } from 'react';

import { liveSubmissionDeadline } from '../../utils/Helpers';

const LiveSubmissionCountdown = () => {
  const [countdown, setCountdown] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      const duration = liveSubmissionDeadline();
      console.log('duration', duration);
      setCountdown(duration);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="live-countdown-timer">
        {countdown ? (
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
        ) : null}
      </div>
      <p>Left to claim 1ups</p>
    </>
  );
};

export default LiveSubmissionCountdown;
