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
    oneUp.status = 'Available for submission';
  } else {
    oneUp.status = 'Outside submission period';
  }

  return oneUp;
};
