import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import _ from 'lodash';

const OneUpHighScores = ({ oneUps, handleNav }) => {
  const [sortedOneUps, setSortedOneUps] = useState([]);

  useEffect(() => {
    const grouped = _.groupBy(oneUps, 'fields.username');
    const withTotals = _.sortBy(
      _.map(grouped, (player, key) => {
        return {
          username: key,
          points: player.length,
        };
      }),
      'points',
    ).reverse();

    setSortedOneUps(withTotals);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oneUps]);

  const handleClick = username => {
    if (handleNav) {
      handleNav(username);
    }
  };

  const renderRows = () => {
    return sortedOneUps.map((oneUp, i) => {
      return (
        <tr key={i} onClick={() => handleClick(oneUp.username)}>
          <td>{i + 1}</td>
          <td>{oneUp.username}</td>
          <td>{oneUp.points}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>1-Ups</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </Table>
    </>
  );
};

export default OneUpHighScores;
