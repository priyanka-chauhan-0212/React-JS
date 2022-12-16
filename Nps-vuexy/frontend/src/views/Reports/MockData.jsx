import moment from 'moment';

export const monthsList = [
  // {
  //   id: 1,
  //   value: moment().format('YYYY-MM'),
  //   title: moment().format('MMMM, YYYY'),
  // },
  {
    id: 2,
    value: moment()
      .subtract(1, 'month')
      .format('YYYY-MM'),
    title: moment()
      .subtract(1, 'month')
      .format('MMMM, YYYY'),
  },
  {
    id: 3,
    value: moment()
      .subtract(2, 'month')
      .format('YYYY-MM'),
    title: moment()
      .subtract(2, 'month')
      .format('MMMM, YYYY'),
  },
  {
    id: 4,
    value: moment()
      .subtract(3, 'month')
      .format('YYYY-MM'),
    title: moment()
      .subtract(3, 'month')
      .format('MMMM, YYYY'),
  },
  {
    id: 5,
    value: moment()
      .subtract(4, 'month')
      .format('YYYY-MM'),
    title: moment()
      .subtract(4, 'month')
      .format('MMMM, YYYY'),
  },
  {
    id: 6,
    value: moment()
      .subtract(5, 'month')
      .format('YYYY-MM'),
    title: moment()
      .subtract(5, 'month')
      .format('MMMM, YYYY'),
  },
  {
    id: 7,
    value: moment()
      .subtract(6, 'month')
      .format('YYYY-MM'),
    title: moment()
      .subtract(6, 'month')
      .format('MMMM, YYYY'),
  },
];
