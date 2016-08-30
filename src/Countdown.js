const time = require('./time');
const _ = require('underscore');
const { $, $$ } = require('./$');

class Countdown {
  constructor (container, schedule) {
    container.classList.add('countdown-container');
    container.innerHTML = Countdown.html;

    this.elements = {
      container,
      bg: $(container, '.countdown-bg'),
      value: $(container, '.countdown-value'),
      title: $(container, '.countdown-title'),
    };

    this.schedule = schedule;
    this.currentEvent = this.getCurrentEvent();
  }

  getCurrentEvent () {
    let event;
    const currentTime = Math.floor(Date.now() / 1000);

    return _.find(this.schedule, function (event) {
      return currentTime < event.end;
    });
  }

  getRemainingTime () {
    if (!this.currentEvent) {
      this.currentEvent = this.getCurrentEvent();

      if (!this.currentEvent) {
        return 0;
      }
    }

    const now = Math.floor(Date.now() / 1000);
    const event = this.currentEvent;

    return (now < event.start
            ? event.start - now
            : event.end - now);
  }

  setText (text) {
    this.elements.value.textContent = text;
  }

  update () {
    const titleElement = this.elements.title;
    const container = this.elements.container;
    let remaining = this.getRemainingTime();

    if (remaining < 0) {
      this.currentEvent = this.getCurrentEvent();
      remaining = this.getRemainingTime();
    }

    if (this.currentEvent && this.currentEvent.start > time.nowSecods()) {
      $.addClass(container, 'early');
    }
    else {
      $.removeClass(container, 'early');
    }

    if (remaining <= 300) {
      $.addClass(container, 'ending');
    }
    else {
      $.removeClass(container, 'ending');
    }

    this.value = time.secondsToTime(remaining);
    this.setText(this.value);

    if (this.currentEvent) {
      titleElement.textContent = this.currentEvent.titolo;
    }
    else {
      titleElement.textContent = '- - - -';
    }
  }

  run () {
    this.update();

    this._timeout = setInterval(() => this.update(), 1000);
    this.running = true;
  }

  stop () {
    clearInterval(this._timeout);
    this.running = false;
  }

  updateSchedule (schedule) {
    this.schedule = schedule;

    for (const event of this.schedule) {
      event.start = new Date(event.data).getTime() / 1000;
      event.end = event.start + event.durata * 60;
    }

    this.currentEvent = this.getCurrentEvent();

    this.update();
  }
}

Countdown.html = `<div class="countdown-title"></div>
<div class="countdown-value"></div>`;

module.exports = Countdown;
