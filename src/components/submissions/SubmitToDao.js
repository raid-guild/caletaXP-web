import React from 'react';
import { Button } from 'react-bootstrap';

const SubmitToDao = ({ oneUps, username, ethAddress }) => {
  const handleSubmit = oneUps => {
    const daoHost = 'https://alchemy.daostack.io';
    const daoRoute =
      '/dao/0xafdd1eb2511cd891acf2bff82dabf47e0c914d24/scheme/0x6da49c4e88ae95c4faaa9c2133b1fa7190b763cebc3d62332b1b07c859311221/proposals/create/';
    const beneficiary = `beneficiary=${ethAddress}`;
    const description = `&description=http://1up.world/user-detail/${username}`;
    const profileUrl = `&url=http://1up.world/user-detail/${username}`;
    const tokenInfo = `&ethReward=0&externalTokenAddress=0x543ff227f64aa17ea132bf9886cab5db55dcaddf&externalTokenReward=0`;
    const rewards = `&nativeTokenReward=${oneUps.length}&reputationReward=${oneUps.length}`;
    const title = `&title=Submission 1 for @${username}&url=&tags=[]`;
    const url = `${daoHost}${daoRoute}?${beneficiary}${description}${profileUrl}${tokenInfo}${rewards}${title}`;
    const encodedUrl = encodeURI(url);
    window.open(encodedUrl, '_blank');
  };

  return (
    <Button
      onClick={() => handleSubmit(oneUps)}
      variant="info"
      className="button-primary"
    >
      Send to Dao
    </Button>
  );
};

export default SubmitToDao;
