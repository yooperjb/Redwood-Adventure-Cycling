const moment = require('moment');

const checkSubmissionDate = () => {
    currentDate = moment();
    
    // These dates should be part of env variables for ease of changing
    const submissionStartDate = moment('2025-01-01');// For testing purposes be sure to change for production
    const submissionEndDate = moment(`2025-11-30`); // For testing purposes be sure to change for production

    if (!currentDate.isBetween(submissionStartDate, submissionEndDate, 'day', '[]')) {
        throw new Error(`Route submission is not allowed at this time. Adventure Series starts on ${submissionStartDate.format('YYYY-MM-DD')} and ends ${submissionEndDate.format('YYYY-MM-DD')}.`);
    }
}

module.exports = {
    checkSubmissionDate
  };