
// this file should probably be in the javascript file and there may already be conversion functions there.

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
  }
  
function padZero(value) {
return value.toString().padStart(2, '0');
}
  
function formatDate(dateString) {
const date = new Date(dateString);
const year = date.getFullYear();
const month = padZero(date.getMonth() + 1);
const day = padZero(date.getDate());

return `${year}-${month}-${day}`;
}

module.exports = {formatTime, padZero, formatDate};