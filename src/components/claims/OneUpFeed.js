import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oneUps]);

  const handleClick = username => {
    if (handleNav) {
      handleNav(username);
    }
  };

  const renderRows = () => {
    return sortedOneUps.map(oneUp => {
      return (
        <tr key={oneUp.id} onClick={() => handleClick(oneUp.fields.username)}>
          <td>{oneUp.fields.username}</td>
          <td>{oneUp.fields.sender}</td>
          <td>{timeAgo(oneUp.fields.createdAt)}</td>
          {isUserDetail || isSubmissionDetail ? (
            <td>{oneUp.fields.chatTitle}</td>
          ) : null}
          {isUserDetail ? <td>{oneUp.status}</td> : null}
        </tr>
      );
    });
  };

  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Sender</th>
            <th>Time</th>
            {isUserDetail || isSubmissionDetail ? <th>Chat</th> : null}
            {isUserDetail ? <th>Status</th> : null}
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </Table>
    </>
  );
};

export default OneUpFeed;
