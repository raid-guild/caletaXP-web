import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import _ from 'lodash';
import { timeAgo } from '../../utils/Helpers';

const OneUpFeed = ({ oneUps, handleNav, showChatTitle }) => {
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
          {showChatTitle ? <td>{oneUp.fields.chatTitle}</td> : null}
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
            {showChatTitle ? <th>Chat</th> : null}
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </Table>
    </>
  );
};

export default OneUpFeed;
