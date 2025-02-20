const display = document.getElementById('display');
const buttons = Array.from(document.getElementsByClassName('button'));
let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (value === 'C') {
      currentInput = '';
      previousInput = '';
      operator = '';
      display.textContent = '0';
      return;
    }

    if (value === '=') {
      if (currentInput && previousInput && operator) {
        currentInput = eval(`${previousInput} ${operator} ${currentInput}`).toString();
        display.textContent = currentInput;
        previousInput = '';
        operator = '';
      }
      return;
    }

    if (['+', '-', '*', '/'].includes(value)) {
      if (currentInput) {
        if (previousInput) {
          previousInput = eval(`${previousInput} ${operator} ${currentInput}`).toString();
        } else {
          previousInput = currentInput;
        }
        currentInput = '';
        operator = value;
      }
      return;
    }

    if (value === '.' && currentInput.includes('.')) {
      return;
    }

    currentInput += value;
    display.textContent = currentInput;
  });
});