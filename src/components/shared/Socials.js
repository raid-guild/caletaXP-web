import React from 'react';
import styled from 'styled-components';

import TwitterIconSrc from '../../assets/img/twitter-icon.svg';
import TelegramIconSrc from '../../assets/img/telegram-icon.svg';

const TelegramIcon = styled.img`
  width: 22px;
`;
const TwitterIcon = styled.img`
  width: 22px;
`;

const Socials = () => {
  return (
    <div className="social-links">
      <a
        className="nav-item"
        href="https://twitter.com/1up_world"
        rel="noopener noreferrer"
        target="_blank"
      >
        <TwitterIcon src={TwitterIconSrc} />
      </a>
      <a
        className="nav-item"
        href="https://t.me/joinchat/IKmUYRh65Vb1ZHHW9MrCGQ"
        rel="noopener noreferrer"
        target="_blank"
      >
        <TelegramIcon src={TelegramIconSrc} />
      </a>
{/*       <a
        className="nav-item"
        href="https://gitcoin.co/grants/546/1up-world"
        rel="noopener noreferrer"
        target="_blank"
      >
        Contribute to our Gitcoin Grant
      </a> */}
    </div>
  );
};

export default Socials;
