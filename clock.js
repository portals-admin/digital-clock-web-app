(function () {
  'use strict';

  const hoursEl   = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const periodEl  = document.getElementById('period');
  const dateEl    = document.getElementById('date');

  const DAY_NAMES   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const MONTH_NAMES = ['January','February','March','April','May','June',
                       'July','August','September','October','November','December'];

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    const now     = new Date();
    const h24     = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const isPM  = h24 >= 12;
    const h12   = h24 % 12 || 12;

    hoursEl.textContent   = pad(h12);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
    periodEl.textContent  = isPM ? 'PM' : 'AM';

    dateEl.textContent = [
      DAY_NAMES[now.getDay()] + ',',
      MONTH_NAMES[now.getMonth()],
      now.getDate() + ',',
      now.getFullYear(),
    ].join(' ');
  }

  // Run immediately, then schedule to fire at the start of every new second
  // to stay in sync with the system clock rather than drifting over time.
  tick();

  function scheduleNext() {
    const ms = 1000 - new Date().getMilliseconds();
    setTimeout(function () {
      tick();
      setInterval(tick, 1000);
    }, ms);
  }

  scheduleNext();
}());
