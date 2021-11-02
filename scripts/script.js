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

// Variables
let displayValue = "0";
let previousVal;
let operator;

// Add numbers to screen
const screen = document.querySelector(".display");
const digits = document.querySelectorAll(".digit");

digits.forEach(digit => {
  digit.addEventListener("click", addDigit);
});

function addDigit() {
  const digit = this.textContent;
  if (displayValue === "0") screen.textContent = "";
  displayValue = screen.textContent += digit;
}

// Add decimal separator
const decimalBttn = document.querySelector(".decimal");
decimalBttn.addEventListener("click", addDecimalSeparator);

function addDecimalSeparator() {
  let decimal = this.textContent;
  if (displayValue.includes(".")) decimal = "";
  if (operator && displayValue === "0") screen.textContent = "0";
  displayValue = screen.textContent += decimal;
}

// Delete last element in screen
const backspaceBttn = document.querySelector(".backspace");
backspaceBttn.addEventListener("click", deleteLastDigit);

function deleteLastDigit() {
  const currentVal = screen.textContent;
  let newVal = currentVal.slice(0, -1);

  if (!newVal) newVal = "0";

  screen.textContent = newVal;
  displayValue = newVal;
}

// Operators
const operators = document.querySelectorAll(".operator");

operators.forEach(operator => {
  operator.addEventListener("click", selectOperation)
})

function selectOperation() {
  const chosenOperator = this.value;

  if (operator) getResult(); // if an operator has already been chosen perfrom that operation first

  operator = chosenOperator;
  previousVal = displayValue;
  displayValue = "0";
}

// Result
const equalsBttn = document.querySelector(".equals");

equalsBttn.addEventListener("click", getResult);

function getResult() {
  if (!operator) return;

  if (operator === "/" && displayValue === "0") return divideByZero();

  let result = operate(operator, +previousVal, +displayValue);

  if (result.toString().length > 14 && result.toString().includes(".")) {
    result = result.toFixed(2)
  }

  screen.textContent = result;
  previousVal = result;
  displayValue = result;
  operator = "";
} 

function divideByZero() {
  screen.textContent = "";
  const container = document.createElement("p");
  container.classList.add("rotate");
  container.textContent = "lol no";
  screen.appendChild(container);
  setTimeout(() => {  resetCalculator() }, 2500);
}

// Clear
const clearBttn = document.querySelector(".clear");

clearBttn.addEventListener("click", resetCalculator);

function resetCalculator() {
  screen.textContent = "0";
  previousVal ="";
  displayValue = "0";
  operator = "";
}

// Button animation
const buttons = document.querySelectorAll("button");

// event listeners
buttons.forEach(button => {
  button.addEventListener("mouseenter", hoverOn);
  button.addEventListener("mouseleave", hoverOff);
  button.addEventListener("click", buttonClick);
})

function hoverOn() {
  this.classList.contains("equals") ? this.classList.add("equals-hover") : this.classList.add("calc-btn-hover");
}

function hoverOff() {
  this.classList.contains("equals") ? this.classList.remove("equals-hover") : this.classList.remove("calc-btn-hover");
}

function buttonClick(e) {
  const pressClass = this.classList.contains("equals") ? "equals-press" : "button-press";

  this.classList.add(pressClass)
  
  setTimeout(() => {
    this.classList.remove(pressClass)
  }, 500)
}