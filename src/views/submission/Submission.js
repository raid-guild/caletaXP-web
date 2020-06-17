import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';

import Box from '3box';

import { get } from '../../utils/Requests';
import OneUpFeed from '../../components/claims/OneUpFeed';
import { formattedTime } from '../../utils/Helpers';

import styled from 'styled-components';
import TelegramIconSrc from '../../assets/img/telegram-icon.svg';
import DiscordIconSrc from '../../assets/img/discord-icon.svg';

const TelegramIcon = styled.img`
  width: 22px;
`;
const DiscordIcon = styled.img`
  width: 22px;
`;

const Submission = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [oneUps, setOneUps] = useState([]);
  const [submission, setSubmission] = useState([]);
  const [userDetail, setUserDetail] = useState();
  const [otherUserDetail] = useState();
  // const [otherUserDetail, setOtherUserDetail] = useState();
  const [, setUser3BoxDetail] = useState();
  // const [user3BoxDetail, setUser3BoxDetail] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const submissionRes = await get(`submission/${match.params.id}`);

        if (submissionRes.data[0] ?? submissionRes.data[0].fields.ups.length) {
          const oneUpsRes = await get(
            `one-ups/${submissionRes.data[0].fields.ups.join(',')}`,
          );
          setOneUps(oneUpsRes.data);
        }

        setSubmission(submissionRes.data[0]);
        setLoading(false);
      } catch (err) {
        console.log('get err', err);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const get3BoxProfile = async () => {
      const profile = await Box.getProfile(userDetail.ethAddress);

      setUser3BoxDetail(profile);
    };
    if (userDetail && userDetail.ethAddress) {
      get3BoxProfile();
    }
  }, [userDetail]);

  useEffect(() => {
    const get1upProfile = async () => {
      const res = await get(`username/${match.params.username}`);
      if (res.data[0]) {
        setUserDetail(res.data[0].fields);
      }
    };
    if (match.params.username) {
      get1upProfile();
    }
  }, [match]);

  return (
    <>
      <div className="user-details submissions-page">
        <Row>
          <Col>
            <h2 className="submission-id">Submission {match.params.id}</h2>
            <h2 className="username">
              {(userDetail && userDetail.username) ||
                '@' + match.params.username}
            </h2>
            {/* <h3 className="oneup-count">{oneUps.length || 0} 1-Ups</h3> */}
            {/* {user3BoxDetail && <p>{user3BoxDetail.emoji}</p>} */}
            {/* @HELPME Right now there's no way to tell which is which OtherUserDetail, we need logic so the icons are applied correctly */}
            <div className="other-username-wrapper">
              <h3>
                <TelegramIcon src={TelegramIconSrc} />
                {(userDetail && userDetail.username) ||
                  '@' + match.params.username}
              </h3>

              {otherUserDetail ? (
                <h3>
                  <DiscordIcon src={DiscordIconSrc} />
                  {otherUserDetail.username}
                </h3>
              ) : null}
            </div>
          </Col>
          <Col>
            {submission.fields ? (
              <div>
                <p>
                  Submitted to {submission.fields.daoName} on{' '}
                  {formattedTime(submission.fields.createdAt)}
                </p>
              </div>
            ) : null}
          </Col>
        </Row>

        <Row className="table-outline">
          <Col>
            {loading ? (
              <Spinner animation="grow" variant="info" />
            ) : (
              <OneUpFeed
                oneUps={oneUps}
                handleNav={false}
                isSubmissionDetail={true}
              />
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Submission;
