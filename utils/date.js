const moment = require('moment');

const checkSubmissionDate = () => {
    const currentDate = moment();
    
    // Submission start and end dates
    const submissionStartDate = moment(process.env.SUBMISSION_START_DATE, 'YYYY-MM-DD');
    const submissionEndDate = moment(process.env.SUBMISSION_END_DATE, 'YYYY-MM-DD');

    // Check if dates are valid
    if (!submissionStartDate.isValid() || !submissionEndDate.isValid()) {
        throw new Error(
            `Route submission is not allowed at this time. Submissions are open from ${submissionStartDate.format('YYYY-MM-DD')} to ${submissionEndDate.format('YYYY-MM-DD')}.`
        );
    }

    // Check if the current date is within the submission period
    if (!currentDate.isBetween(submissionStartDate, submissionEndDate, 'day', '[]')) {
        throw new Error(
            `Route submission is not allowed at this time. Adventure Series starts on ${submissionStartDate.format('YYYY-MM-DD')} and ends ${submissionEndDate.format('YYYY-MM-DD')}.`
        );
    }
};

module.exports = {
    checkSubmissionDate
  };