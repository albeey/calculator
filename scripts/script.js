// Basic math functions
const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// Operate function, takes an operator and two numbers 
// and calls appropiate function based on the operator parameter
function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return substract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default: 
      return "ERROR";
  }
}

// Current Value of display and saved value
let currentValueOnDisplay = "0";
let savedValue = "";

// Update Display, ran after most button clicks
const displayValue = document.querySelector("#displayValue");

function updateDisplay(num) {
  displayValue.textContent = num;
}

// Take value of each num button and put it on display
const digitBtn = document.querySelectorAll(".digit-btn");

digitBtn.forEach(button => {
  button.addEventListener("click", () => { 
    if (currentValueOnDisplay === "0") {
      currentValueOnDisplay = "";
    }
    currentValueOnDisplay += button.value;
    updateDisplay(currentValueOnDisplay);
  })
});

// Select Operator
// when an operator button is pressed its value is saved in selectedOperator
// if an operator button is pressed and both savedValue and currentValueOnDisplay 
// have values assigned to them returnOperationResult function will run, the
// result will go to currentValueOnDisplay and savedValue will be emtpied out
const operatorBtn = document.querySelectorAll(".operator-btn");

let selectedOperator = "";

operatorBtn.forEach(button => {
  button.addEventListener("click", () => {
    selectedOperator = button.value; 
    if (savedValue.length !== 0) {
      currentValueOnDisplay = returnOperationResult();
      savedValue = "";
      updateDisplay(currentValueOnDisplay);
    }
    savedValue = currentValueOnDisplay;
    currentValueOnDisplay = "0";
  })
});

// Result 
const equalsBtn = document.querySelector("#equals-btn");

function returnOperationResult() {
  let operation = operate(selectedOperator, +savedValue, +currentValueOnDisplay);
  if (String(operation).length > 12 && String(operation).includes(".")) {
    operation = operation.toFixed(3);
  }
  return String(operation);
}

equalsBtn.addEventListener("click", () => {
  if (savedValue.length === 0) {
    updateDisplay(currentValueOnDisplay);
  } else {
      currentValueOnDisplay = returnOperationResult();
      if (currentValueOnDisplay === "NaN" || currentValueOnDisplay === "Infinity") {
        currentValueOnDisplay = "lol no";
        updateDisplay(currentValueOnDisplay);
        setTimeout(() => clear(), 1000);
      } else {
        savedValue = "";
        updateDisplay(currentValueOnDisplay);
      }
  }
});

// Clear 
const clearBtn = document.querySelector("#clear-btn");

function clear() {
  currentValueOnDisplay = "0";
  savedValue = "";
  selectedOperator = "";
  updateDisplay(currentValueOnDisplay);
}

clearBtn.addEventListener("click", clear);

// Backspace 
const backspaceBtn = document.querySelector("#backspace-btn");

backspaceBtn.addEventListener("click", () => {
  currentValueOnDisplay = currentValueOnDisplay.slice(0, currentValueOnDisplay.length - 1);
  if (currentValueOnDisplay.length === 0) {
    currentValueOnDisplay = "0";
  }
  updateDisplay(currentValueOnDisplay);
});

// Adds decimal point to value in screen
// If the value already includes a decimal point nothing is added
const decimalBtn = document.querySelector("#decimal-btn");

decimalBtn.addEventListener("click", () => {
  currentValueOnDisplay.includes(".") ? currentValueOnDisplay += "" : 
                                        currentValueOnDisplay += ".";
  updateDisplay(currentValueOnDisplay);
});

// Color Modes
const modeBtn = document.querySelectorAll(".mode-btn");
const root = document.documentElement;

modeBtn.forEach(button => {
  button.addEventListener("click", () => {
    if (button.value === "dark" || button.value === "blue" || button.value === "sunset") {
      root.style.setProperty("--display-and-keys-color", "white");
    }
    if (button.value === "light") {
      root.style.setProperty("--display-and-keys-color", "black");
      root.style.setProperty("--calc-bg-color", "white");
      root.style.setProperty("--calc-gradient", "none");
    }
    if (button.value === "dark") {
      root.style.setProperty("--calc-bg-color", "#191919");
      root.style.setProperty("--calc-gradient", "none");
    }
    if (button.value === "dark" || button.value === "light") {
      root.style.setProperty("--separator-color", "#FE7F57");
      root.style.setProperty("--equals-btn-color", "#FE7F57");
    }
    if (button.value === "blue" || button.value === "sunset") {
      root.style.setProperty("--equals-btn-color", "white");
    }
    if (button.value === "blue") {
      root.style.setProperty("--calc-gradient", "linear-gradient(201deg, rgba(35,34,254,1) 30%, rgba(122,244,213,1) 82%)");
      root.style.setProperty("--calc-bg-color", "rgba(35,34,254,1)");
      root.style.setProperty("--separator-color", "#70DFD9");
    }
    if (button.value === "sunset") {
      root.style.setProperty("--calc-gradient", "linear-gradient(180deg, rgba(83,51,216,1) 3%, rgba(135,74,177,1) 59%, rgba(250,125,90,1) 88%)");
      root.style.setProperty("--calc-bg-color", "rgba(83,51,216,1)");
      root.style.setProperty("--separator-color", "#DA6F72");
    }
  });
});

