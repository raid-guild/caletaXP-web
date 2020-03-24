import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { buildProposalUrl } from '../../utils/Helpers';
import { post } from '../../utils/Requests';
import SubmissionCountdown from './SubmissionCountdown';

const SubmitToDao = ({ oneUps, user }) => {
  const [submission, setSubmission] = useState();

  const [submitted, setSubmitted] = useState(false);

  // TODO: This can be variable when we have more daos
  const daoData = {
    address: '0xafdd1eb2511cd891acf2bff82dabf47e0c914d24',
    name: '1UP',
    host: 'https://alchemy.daostack.io',
    route:
      '/dao/0xafdd1eb2511cd891acf2bff82dabf47e0c914d24/scheme/0x6da49c4e88ae95c4faaa9c2133b1fa7190b763cebc3d62332b1b07c859311221/proposals/create/',
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
          <SubmissionCountdown upCount={submission.ups.length} />
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
