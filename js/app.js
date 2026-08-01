const pricingConfig = {
  hjolhysi: 16300,
  fellihysi: 13700,
  husbill: 16300,
  annad: null,
};

const vehicleTypeSelect = document.getElementById('vehicle-type');
const lengthInput = document.getElementById('length');
const priceResult = document.getElementById('price-result');
const requestForm = document.getElementById('request-form');
const formMessage = document.getElementById('form-message');
const year = document.getElementById('year');

function formatCurrency(value) {
  return `${new Intl.NumberFormat('is-IS').format(value)} ISK`;
}

function updatePrice() {
  const selectedType = vehicleTypeSelect.value;
  const length = parseFloat(lengthInput.value);

  if (!Number.isFinite(length) || length <= 0) {
    priceResult.innerHTML = '<strong>Sláðu inn gildan fjölda.</strong><span>Lengd þarf að vera jákvæð.</span>';
    return;
  }

  if (selectedType === 'annad') {
    priceResult.innerHTML = '<strong>Verð samkvæmt samkomulagi</strong><span>Hafðu samband við okkur fyrir skýrt verð.</span>';
    return;
  }

  const rate = pricingConfig[selectedType];
  const total = rate * length;
  const vehicleLabel = selectedType === 'hjolhysi' ? 'hjólhýsi' : selectedType === 'fellihysi' ? 'fellihýsi' : 'húsbíll';

  priceResult.innerHTML = `
    <strong>${formatCurrency(total)}</strong>
    <span>Reiknað er út frá ${length.toFixed(1)} metrum fyrir ${vehicleLabel}.</span>
  `;
}

vehicleTypeSelect.addEventListener('change', updatePrice);
lengthInput.addEventListener('input', updatePrice);

requestForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formMessage.textContent = 'Þakka þér fyrir fyrirspurnina. Við munum hafa samband eins fljótt og auðið er.';
  requestForm.reset();
});

if (year) {
  year.textContent = new Date().getFullYear();
}

updatePrice();
