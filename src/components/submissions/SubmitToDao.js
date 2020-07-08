import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import { buildProposalUrl } from '../../utils/Helpers';
import { post } from '../../utils/Requests';

const SubmitToDao = ({ oneUps, user }) => {
  const [submission, setSubmission] = useState();

  const [submitted, setSubmitted] = useState(false);

  // TODO: This can be variable when we have more daos
  const daoData = {
    address: '0x82683ba6f0d0c2f28f0c9471dbd19fc70802107b',
    name: '1UP',
    host: 'https://alchemy-staging-xdai.herokuapp.com',
    route:
      '/dao/0x82683ba6f0d0c2f28f0c9471dbd19fc70802107b/scheme/0xbf9a7745d31af99fec91a36078a96af9cf81e0bf07de23423e82f3ee06ea32e2/proposals/create/',
  };

  useEffect(() => {
    if (oneUps.length) {
      const ids = oneUps
        .filter(oneUp => oneUp.status.name === 'window')
        .map(up => up.id);

      setSubmission({
        daoName: daoData.name,
        daoAddress: daoData.address,
        ups: ids,
        username: `@${user.username}`,
        ethAddress: user.ethAddress,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oneUps]);

  const handleSubmit = async oneUps => {
    // TODO: Error handle the post
    const res = await post('submission/new', submission);
    setSubmitted(true);

    const proposalRedirect = buildProposalUrl(
      daoData,
      user,
      res.data.fields.submissionId,
      submission.ups,
    );

    window.open(proposalRedirect, '_blank');
  };

  return (
    <>
      {submission ? (
        <>
          <Button
            onClick={() => handleSubmit(oneUps)}
            variant="info"
            className="button-primary"
            disabled={submitted || !submission.ups.length}
          >
            Send to Dao
          </Button>
        </>
      ) : null}
    </>
  );
};

export default SubmitToDao;
