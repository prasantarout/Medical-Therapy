import moment from 'moment';
import CustomToast from './Toast';

export const getFormattedDate = (date, format) => {
  let formattedDate = '';
  if (date) {
    let newDate = new Date(date);
    console.log('newDate', newDate, date);
    switch (format) {
      case 'YYYY-MM-DD': {
        let year = newDate?.getFullYear().toString();
        let month = (newDate?.getMonth() + 1).toString().padStart(2, '0');
        let day = newDate?.getDate().toString().padStart(2, '0');
        formattedDate = `${year}-${month}-${day}`;
        break;
      }
      case 'Do-MMMM': {
        let todaysDateString = moment(newDate.toISOString().split('T')[0]);
        let todaysDate = moment(todaysDateString).format('Do MMMM');
        formattedDate = todaysDate;
        break;
      }
      case 'Do-MMM': {
        let todaysDateString = moment(newDate.toISOString().split('T')[0]);
        let todaysDate = moment(todaysDateString).format('Do MMM');
        formattedDate = todaysDate;
        break;
      }
      case 'Do-MMM-YYYY': {
        let todaysDateString = moment(date, 'DD-MM-YYYY').format('Do MMM YYYY');
        formattedDate = todaysDateString;
        break;
      }
      default: {
        formattedDate = '';
        break;
      }
    }
  } else {
    CustomToast('Please select a date');
  }
  return formattedDate;
};
