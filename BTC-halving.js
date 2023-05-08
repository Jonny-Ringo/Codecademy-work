// Retrieve the current block height from a public blockchain explorer API
fetch('https://blockchain.info/q/getblockcount')
.then(response => response.json())
.then(data => {
  // Calculate the time until the next halving event
  const halvingInterval = 210000; // Number of blocks between each halving
  const currentBlockHeight = data;
  const blocksUntilHalving = halvingInterval - (currentBlockHeight % halvingInterval);
  let secondsUntilHalving = blocksUntilHalving * 10 * 60; // Assuming 10 minutes per block

  // Update the countdown elements with the calculated time
  const daysElement = document.getElementById('days');
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');

  function updateCountdown() {
    const seconds = secondsUntilHalving % 60;
    const minutes = Math.floor(secondsUntilHalving / 60) % 60;
    const hours = Math.floor(secondsUntilHalving / 3600) % 24;
    const days = Math.floor(secondsUntilHalving / (3600 * 24));

    daysElement.textContent = padZero(days);
    hoursElement.textContent = padZero(hours);
    minutesElement.textContent = padZero(minutes);
    secondsElement.textContent = padZero(seconds);

    secondsUntilHalving--;
    if (secondsUntilHalving < 0) {
      clearInterval(interval);
      daysElement.textContent = '0';
      hoursElement.textContent = '0';
      minutesElement.textContent = '0';
      secondsElement.textContent = '0';
    }
  }

  updateCountdown();
  const interval = setInterval(updateCountdown, 1000); // Update every second

})
.catch(error => console.error('Failed to retrieve block height:', error));

// Function to pad single digit numbers with leading zero
function padZero(num) {
  return (num < 10 ? '0' : '') + num;
}


