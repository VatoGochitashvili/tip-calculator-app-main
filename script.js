'use strict';

const billInput = document.querySelector('.bill');
const tipBtn = document.querySelectorAll('.prc');
const personNum = document.querySelector('.person');
const tipAmount = document.querySelector('.number');
const total = document.querySelector('.totalAmount').querySelector('h2');
const custom = document.querySelector('.custom');
const resetBtn = document.querySelector('.reset');

// Select precent buttons
tipBtn.forEach(btn => {
  btn.addEventListener('click', function () {
    tipBtn.forEach(btn1 => btn1.classList.remove('active'));
    btn.classList.add('active');
    custom.value = '';
    calcState();
  });
});

// functions
const calcTip = function () {
  const bill = +billInput.value;
  const person = +personNum.value;
  const precentBtn = document.querySelector('.active');
  const precentCnt = parseFloat(precentBtn?.textContent);
  const customValue = +custom.value;
  const precentage = customValue || precentCnt;
  const tip = ((bill / 100) * precentage) / person;
  const totalPrsn = bill / person;

  if (isNaN(precentage)) {
    tipAmount.textContent = `$0.00`;
    total.textContent = `$${totalPrsn.toFixed(2)}`;
  } else {
    tipAmount.textContent = `$${tip.toFixed(2)}`;
    total.textContent = `$${(totalPrsn + tip).toFixed(2)}`;
  }
};

const calcState = function () {
  if (
    billInput.value !== '' &&
    personNum.value !== '' &&
    billInput.value !== '0' &&
    personNum.value !== '0'
  ) {
    calcTip();
  } else {
    tipAmount.textContent = `$0.00`;
    total.textContent = `$0.00`;
  }

  if (billInput.value === '0' || personNum.value === '0') {
    personNum.classList.add('error');
    document.querySelector('.zero').classList.remove('hidden');
  } else {
    personNum.classList.remove('error');
    document.querySelector('.zero').classList.add('hidden');
  }
};

const reset = function () {
  tipAmount.textContent = `$0.00`;
  total.textContent = `$0.00`;
  tipBtn.forEach(btn => btn.classList.remove('active'));
  billInput.value = '';
  custom.value = '';
  personNum.value = '';
  resetBtn.classList.remove('active');
};

reset();

///////////////////////////////////////////////////////////////////////////////////////////////////

// Event Handlers

document.addEventListener('input', function () {
  resetBtn.classList.add('active');
});
billInput.addEventListener('input', calcState);
personNum.addEventListener('input', calcState);
custom.addEventListener('input', calcState);
custom.addEventListener('click', function () {
  tipAmount.textContent = `$0.00`;
  total.textContent = `$0.00`;
  tipBtn.forEach(btn => btn.classList.remove('active'));
});
resetBtn.addEventListener('click', reset);
