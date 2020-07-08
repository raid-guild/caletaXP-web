import React, { useEffect, useState } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import _ from 'lodash';
import { timeAgo } from '../../utils/Helpers';

const OneUpFeed = ({ oneUps, handleNav, isUserDetail, isSubmissionDetail }) => {
  const [sortedOneUps, setSortedOneUps] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selected, setSelected] = useState({});

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => {
    setModalShow(true);
  };

  useEffect(() => {
    setSortedOneUps(
      _.sortBy(oneUps, oneUp => {
        return new Date(oneUp.fields.createdAt).getTime();
      }).reverse(),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oneUps]);

  const handleClick = oneUp => {
    if (handleNav) {
      handleNav(oneUp.fields.username);
    } else {
      setSelected(oneUp);
      handleModalShow();
    }
  };

  const renderRows = () => {
    return sortedOneUps.map(oneUp => {
      return (
        <tr key={oneUp.id} onClick={() => handleClick(oneUp)}>
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
      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>1up detail</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#000' }}>
          {selected.fields && (
            <>
              <p>Chat Title: {selected.fields.chatTitle}</p>
              <p>Created At: {selected.fields.createdAt}</p>
              <p>Message: {selected.fields.message}</p>
              <p>Sender: {selected.fields.sender}</p>
              <p>sourceName: {selected.fields.sourceName}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OneUpFeed;
