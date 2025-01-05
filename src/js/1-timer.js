const startButton = document.querySelector('[data-start]');
const datePicker = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timerId = null;
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: (selectedDates) => {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({ title: "Error", message: "Please choose a date in the future" });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      userSelectedDate = selectedDate;
    }
  },
};

flatpickr(datePicker, options);

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  datePicker.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const timeDifference = userSelectedDate - now;

    if (timeDifference <= 0) {
      clearInterval(timerId);
      iziToast.success({ title: "Success", message: "Countdown completed!" });
      resetUI();
      return;
    }

    const time = convertMs(timeDifference);
    updateTimerUI(time);
  }, 1000);
});

const convertMs = (ms) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const addLeadingZero = (value) => String(value).padStart(2, '0');

const updateTimerUI = ({ days, hours, minutes, seconds }) => {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
};

const resetUI = () => {
  datePicker.disabled = false;
  startButton.disabled = true;
  daysEl.textContent = '00';
  hoursEl.textContent = '00';
  minutesEl.textContent = '00';
  secondsEl.textContent = '00';
};
