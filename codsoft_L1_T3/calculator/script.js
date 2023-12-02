let currentInput = '';
let operator = null;
let previousInput = null;
let memory = null;

function updateDisplay() {
    const displayElement = document.getElementById('display');
    displayElement.textContent = currentInput || '0';
}

function clearDisplay() {
    currentInput = '';
    operator = null;
    previousInput = null;
    updateDisplay();
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function appendOperator(selectedOperator) {
    if (operator !== null) {
        calculateResult();
    }
    operator = selectedOperator;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function calculateResult() {
    if (operator !== null && previousInput !== null && currentInput !== '') {
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);
        switch (operator) {
            case '+':
                currentInput = (num1 + num2).toString();
                break;
            case '-':
                currentInput = (num1 - num2).toString();
                break;
            case '*':
                currentInput = (num1 * num2).toString();
                break;
            case '/':
                if (num2 !== 0) {
                    currentInput = (num1 / num2).toString();
                } else {
                    currentInput = 'Error';
                }
                break;
            case '^':
                currentInput = (num1 ** num2).toString();
                break;
            default:
                break;
        }
        operator = null;
        previousInput = null;
        updateDisplay();
    }
}



function calculateSquare() {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) ** 2).toString();
        updateDisplay();
    }
}

function calculateSquareRoot() {
    if (currentInput !== '') {
        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
        updateDisplay();
    }
}

function calculatePercentage() {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key);
    } else if (event.key === '.') {
        appendDecimal();
    } else if (event.key === 'Enter' || event.key === '=') {
        calculateResult();
    } else if (event.key === 'Escape') {
        clearDisplay();
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        appendOperator(event.key);
    } else if (event.key === '^') {
        appendOperator('^');
    }
});