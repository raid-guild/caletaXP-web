import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import _ from 'lodash';
import { timeAgo } from '../../utils/Helpers';

const OneUpFeed = ({ oneUps, handleNav, isUserDetail, isSubmissionDetail }) => {
  const [sortedOneUps, setSortedOneUps] = useState([]);

  useEffect(() => {
    setSortedOneUps(
      _.sortBy(oneUps, oneUp => {
        return new Date(oneUp.fields.createdAt).getTime();
      }).reverse(),
    );
  }, [oneUps]);

  return sortedOneUps.map(oneUp => {
    return (
      <Accordion
        defaultActiveKey="0"
        key={oneUp.id}
        style={{ margin: '0.5em' }}
      >
        <Card style={{ backgroundColor: 'black', color: 'greenyellow' }}>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              <>{`${isUserDetail ? oneUp.status.icon : null} Received from ${
                oneUp.fields.sender
              }, ${timeAgo(oneUp.fields.createdAt)} ago.`}</>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              {/* {!isUserDetail ? oneUp.fields.username : null} */}
              <>{`${
                isUserDetail || isSubmissionDetail
                  ? oneUp.fields.chatTitle
                  : null
              } ->
              ${
                isUserDetail || isSubmissionDetail ? oneUp.fields.message : null
              }`}</>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  });
};

export default OneUpFeed;
