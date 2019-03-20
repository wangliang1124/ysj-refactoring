import moment from 'moment';
/*eslint-disable*/
export const format = (value, formatString) => {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  return moment(value).format(formatString);
};

export const fixed = (value, index) => {
  if (!value) return '';
  index = index || 2;
  return value.fixed(index);
};
/*eslint-disable*/
