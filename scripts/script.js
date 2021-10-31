// Math functions
const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

// Operate function
function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
  }
}

const screen = document.querySelector(".display");
const digits = document.querySelectorAll(".digit");
let displayValue = "0";

// Event listener for the digit buttons
digits.forEach(digit => {
  digit.addEventListener("click", updateDisplay);
})

function updateDisplay() {
  const digit = this.textContent;
  if (screen.textContent === "0") screen.textContent = "";
  displayValue = screen.textContent += digit;
}

// Decimal separator
const decimalBttn = document.querySelector(".decimal");
decimalBttn.addEventListener("click", addDecimalSeparator)

function addDecimalSeparator() {
  let decimal = this.textContent;
  if (displayValue.includes(".")) decimal = "";
  displayValue = screen.textContent += decimal;
}

// Backspace
const backspaceBttn = document.querySelector(".backspace");
backspaceBttn.addEventListener("click", deleteLastDigit);

function deleteLastDigit() {
  const currentVal = screen.textContent;
  let newVal = currentVal.slice(0, -1);

  if (newVal === "") newVal = "0";

  screen.textContent = newVal;
  displayValue = newVal;
}