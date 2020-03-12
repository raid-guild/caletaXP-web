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
