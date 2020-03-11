import React from 'react';
import { Table } from 'react-bootstrap';

const ClaimFeed = () => {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>XP</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>3</td>
          <td>24</td>
          <td>@dekan</td>
        </tr>
        <tr>
          <td>2</td>
          <td>1</td>
          <td>@duder</td>
        </tr>
        <tr>
          <td>1</td>
          <td>100</td>
          <td>@eric</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ClaimFeed;
