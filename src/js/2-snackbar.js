document.querySelector('.form').addEventListener('submit', (event) => {
  event.preventDefault();

  const delayInput = event.target.elements.delay;
  const stateInput = event.target.elements.state;

  const delay = parseInt(delayInput.value, 10);
  const state = stateInput.value;

  if (isNaN(delay) || !state) {
    iziToast.error({ title: "Error", message: "Invalid input!" });
    return;
  }

  createPromise(delay, state)
    .then((ms) => {
      iziToast.success({ title: "Success", message: `✅ Fulfilled promise in ${ms}ms` });
    })
    .catch((ms) => {
      iziToast.error({ title: "Error", message: `❌ Rejected promise in ${ms}ms` });
    });
});

const createPromise = (delay, state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      state === "fulfilled" ? resolve(delay) : reject(delay);
    }, delay);
  });
};
