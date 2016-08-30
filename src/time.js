module.exports = {
  nowSecods () {
    return Math.floor(Date.now() / 1000);
  },

  dateToSeconds (date) {
    return Math.floor(new Date(date).getTime() / 1000);
  },

  timeToSeconds (time) {
    const { 1: h, 2: m, 3: s } = time.match(/\d*:\d*:\d*/);

    return h * 3600 + m * 60 + s;
  },

  secondsToTime (seconds) {
    const negative = seconds < 0;

    seconds = Math.abs(seconds);

    const h = zeroPad(Math.floor(seconds / 3600));
    const m = zeroPad(Math.floor((seconds % 3600) / 60));
    const s = zeroPad(seconds % 60);

    return (negative? '-' : '') + h + ':' + m + ':' + s;
  }
};

function zeroPad (n) {
  return (n < 10? '0' + n : n);
}
