let scheduleUrl = 'https://www.endsummercamp.org/API/ls_sched_talk.php';

document.addEventListener('DOMContentLoaded', function () {
  const _ = require('underscore');
  const Ajax = require('simple-ajax');
  const { $, $$ } = require('./$');
  const Countdown = require('./Countdown');
  const countdownEl = $('#countdown');
  const countdown = new Countdown(countdownEl);

  updateSchedule();

  setInterval(updateSchedule, 60000);
  countdownEl.addEventListener('onclick', updateSchedule);
  document.addEventListener('keydown', _.throttle(updateSchedule, 1000));
  window.addEventListener('hashchange', updateSchedule);

  function updateSchedule () {
    const location = (/tendone|mickey|mouse/i.test(window.location.hash)
      ? "2" : "1");

    new Ajax(scheduleUrl).on('success', function ({ target: request }) {
      const schedule = JSON.parse(request.responseText)
        .filter(e => e.linea === location);

      countdown.updateSchedule(schedule);
      countdown.run();
    })
    .on('error', function ({ target: request }) {
      countdown.stop();

      if (request.status === 0) {
        countdown.setText('error');
      }
      else {
        countdown.setText(request.status.toString().split('').join(':'));
      }
    })
    .send();
  }
});
