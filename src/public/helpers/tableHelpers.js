import Moment from 'moment';

const months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December'
};

const days = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
};

const nameSort = (a, b, order) => {
  if (a.student) {
    let indexA = a.student.indexOf(' ');
    if (indexA >= 0) {
      a.first_name = a.student.slice(0, indexA);
      a.last_name = a.student.slice(indexA + 1);
    } else {
      a.first_name = a.student;
      a.last_name = '';
    }
    let indexB = b.student.indexOf(' ');
    if (indexB >= 0) {
      b.first_name = b.student.slice(0, indexB);
      b.last_name = b.student.slice(indexB + 1);
    } else {
      b.first_name = b.student;
      b.last_name = '';
    }
  }
  if (order === 'desc') {
    if (a.last_name !== b.last_name) {
      return b.last_name.localeCompare(a.last_name);
    } else {
      return b.first_name.localeCompare(a.first_name);
    }
  } else {
    if (a.last_name !== b.last_name) {
      return a.last_name.localeCompare(b.last_name);
    } else {
      return a.first_name.localeCompare(b.first_name);
    }
  }
};

const dateFormatter = (cell) => {
  const date = Moment(cell);
  return `${days[date.day()]}, ${months[date.month()]} ${date.date()}, ${date.year()}`;
};

const cutoffTimeFormatter = (cell) => {
  if (cell === null) {
    return '';
  }
  const time = Moment(cell);
  return `${time.hour()}:${zeroFill(time.minute(), 2)}`;
};

const checkinTimeFormatter = (cell) => {
  if (cell === null) {
    return '';
  }
  const time = Moment(cell);
  return `${time.hour()}:${zeroFill(time.minute(), 2)}:${zeroFill(time.second(), 2)}`;
};

const zeroFill = (number, width) => {
  width -= number.toString().length;
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
  }
  return number + '';
};

module.exports = {
  months: months,
  days: days,
  nameSort: nameSort,
  dateFormatter: dateFormatter,
  cutoffTimeFormatter: cutoffTimeFormatter,
  checkinTimeFormatter: checkinTimeFormatter,
  zeroFill: zeroFill
};
