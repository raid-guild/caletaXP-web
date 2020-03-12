import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';

import Weapon1Src from '../../assets/img/weapon1.png';
import Weapon2Src from '../../assets/img/weapon2.png';

const Weapon1 = styled.img`
  width: 70%;
  margin: 20px 0px;
`;

const Weapon2 = styled.img`
  width: 70%;
  margin: 20px 0px;
`;

const Info = () => {
  return (
    <>
      <Row>
        <Col>
          <h2>Info</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            feugiat ullamcorper neque nec aliquam. Fusce felis purus, tincidunt
            at ante id, consequat gravida nisl. Nulla ante leo, hendrerit ut
            placerat sit amet, imperdiet sed justo. Integer sit amet lectus
            vestibulum, condimentum sapien at, semper nunc.
          </p>
        </Col>
        <Col className="center-me">
          <Weapon1 src={Weapon1Src} />
        </Col>
      </Row>
      <Row>
        <Col className="center-me">
         <Weapon2 src={Weapon2Src} />
        </Col>
        <Col>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            feugiat ullamcorper neque nec aliquam. Fusce felis purus, tincidunt
            at ante id, consequat gravida nisl. Nulla ante leo, hendrerit ut
            placerat sit amet, imperdiet sed justo. Integer sit amet lectus
            vestibulum, condimentum sapien at, semper nunc.
          </p>
        </Col>
      </Row>
      <Row>
        <h1 className="insert-coin">
          insert coin
        </h1>
      </Row>
    </>
  );
};

export default Info;
