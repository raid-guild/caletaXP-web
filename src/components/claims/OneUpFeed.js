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
          {isUserDetail ? <td>{oneUp.status.icon}</td> : null}
          {!isUserDetail ? <td>{oneUp.fields.username}</td> : null}
          <td>{oneUp.fields.sender}</td>
          <td>{timeAgo(oneUp.fields.createdAt)}</td>
          {isUserDetail || isSubmissionDetail ? (
            <td>{oneUp.fields.chatTitle}</td>
          ) : null}
          {isUserDetail || isSubmissionDetail ? (
            <td>{oneUp.fields.message}</td>
          ) : null}
        </tr>
      );
    });
  };

  return (
    <>
      <Table hover className="all-1ups">
        <thead>
          <tr>
            {isUserDetail ? <th></th> : null}
            {!isUserDetail ? <th>To</th> : null}
            <th>From</th>
            <th>Time</th>
            {isUserDetail || isSubmissionDetail ? <th>Chat</th> : null}
            {isUserDetail || isSubmissionDetail ? <th>Message</th> : null}
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </Table>
    </>
  );
};

export default OneUpFeed;
