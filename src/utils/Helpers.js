import moment from 'moment';

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few s',
    ss: '%d s',
    m: 'a m',
    mm: '%d m',
    h: 'an h',
    hh: '%d h',
    d: 'a d',
    dd: '%d d',
    M: 'a mon',
    MM: '%d mon',
    y: 'a yr',
    yy: '%d yr',
  },
});

export const timeAgo = dateString => {
  return moment(dateString).fromNow();
};

export const formattedTime = dateString => {
  return moment(dateString).format('dddd, MMMM Do YYYY');
};

const inSubmissionPeriod = dateString => {
  const fromDate = moment()
    .subtract(1, 'weeks')
    .startOf('isoWeek')
    .startOf('day');
  const toDate = moment()
    .subtract(1, 'weeks')
    .startOf('isoWeek')
    .endOf('isoWeek')
    .endOf('day');

  return moment(dateString).isBetween(fromDate, toDate);
};

const inCurrentPeriod = dateString => {
  return moment(dateString).isAfter(moment().startOf('isoWeek'));
};

export const addOneUpStatus = oneUp => {
  if (inCurrentPeriod(oneUp.fields.createdAt)) {
    oneUp.status = 'New';
  } else if (inSubmissionPeriod(oneUp.fields.createdAt)) {
    oneUp.status = 'In submission window';
  } else {
    oneUp.status = 'Outside submission window';
  }

  return oneUp;
};

export const buildProposalUrl = (daoData, user, submissionId, oneUps) => {
  const beneficiary = `beneficiary=${user.ethAddress}`;
  const description = `&description=View the 1up records for this submission here: http://1up.world/user-detail/${user.username}/submission/${submissionId} \n\n\n**DO NOT EDIT ME**`;
  const profileUrl = `&url=http://1up.world/user-detail/${user.username}/submission/${submissionId}`;
  const tokenInfo = `&ethReward=0&externalTokenAddress=0x543ff227f64aa17ea132bf9886cab5db55dcaddf&externalTokenReward=0`;
  const rewards = `&nativeTokenReward=${oneUps.length}&reputationReward=${oneUps.length}`;
  const title = `&title=1up Claim for @${user.username} (Submission ${submissionId}) &url=&tags=[]`;
  const url = `${daoData.host}${daoData.route}?${beneficiary}${description}${profileUrl}${tokenInfo}${rewards}${title}`;
  const encodedUrl = encodeURI(url);

  return encodedUrl;
};
