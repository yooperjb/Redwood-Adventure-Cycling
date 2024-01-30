const moment = require('moment');

const checkSubmissionDate = () => {
    currentDate = moment();
    const submissionStartDate = moment(`${process.env.YEAR}-01-01`);// For testing purposes be sure to change for production
    // const submissionEndDate = moment(`${process.env.YEAR}-11-30`);
    const submissionEndDate = moment(`2024-11-30`); // For testing purposes be sure to change for production

    if (!currentDate.isBetween(submissionStartDate, submissionEndDate, 'day', '[]')) {
        throw new Error(`Route submission is not allowed at this time. Adventure Series starts on ${submissionStartDate.format('YYYY-MM-DD')} and ends ${submissionEndDate.format('YYYY-MM-DD')}.`);
    }
}

module.exports = {
    checkSubmissionDate
  };