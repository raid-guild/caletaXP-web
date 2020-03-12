import React from 'react';
import { Table } from 'react-bootstrap';

const Rankings = () => {
  return (
    <>
      <Table bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Game</th>
            <th>Nominations</th>
            <th>Redeemed Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>@dekan</td>
            <td>MetaCartel</td>
            <td>34000</td>
            <td>20000</td>
          </tr>
          <tr>
            <td>2</td>
            <td>@duder</td>
            <td>MetaCartel</td>
            <td>33999</td>
            <td>20000</td>
          </tr>
          <tr>
            <td>100</td>
            <td>@eric</td>
            <td>MetaCartel</td>
            <td>33998</td>
            <td>20000</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Rankings;
