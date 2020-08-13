import moment from 'moment';

export default function momentFilter(date) {
  return moment(date).format('YYYY/MM/DD - HH:mm');
}
