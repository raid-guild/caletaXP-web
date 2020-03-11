import React from 'react';
import { Row, Col } from 'react-bootstrap';

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
        <Col>
          <img src="images/chili.jpg" />
        </Col>
      </Row>
      <Row>
        <Col>
          <img src="images/chili.jpg" />
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
    </>
  );
};

export default Info;
