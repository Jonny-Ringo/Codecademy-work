const apiKey = "426S49RKWQFGM4PZNSRQDMY3UM8GUGVNVZ";
const gasPriceSlow = document.querySelector('.gas-price-slow');
const gasPriceMedium = document.querySelector('.gas-price-medium');
const gasPriceFast = document.querySelector('.gas-price-fast');

async function fetchGasPrice() {
  const response = await fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`);
  const data = await response.json();
  const prices = data.result;
  gasPriceSlow.innerHTML = `🐢 ${prices.SafeGasPrice}`;
  gasPriceMedium.innerHTML = `👍 ${prices.ProposeGasPrice}`;
  gasPriceFast.innerHTML = `⚡️ ${prices.FastGasPrice}`;
}

fetchGasPrice();
setInterval(fetchGasPrice, 60000);
