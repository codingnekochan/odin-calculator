 const inputDisplay = document.getElementById('problem');
 const outputDisplay = document.getElementById('answer');
 const buttons = document.querySelectorAll('.button')
 const numButtons = document.querySelectorAll('.digit_button');
 const operatorButtons = document.querySelectorAll('.operator_button');
 const equalToButton = document.getElementById('equal-to');
 const clearButton = document.querySelector('.clear')
// event listeners
buttons.forEach(button => button.addEventListener('click', getInput)) 
numButtons.forEach( button => button.addEventListener('click', handleInputDisplay))
operatorButtons.forEach( button => button.addEventListener('click', handleInputDisplay))
equalToButton.addEventListener('click',handleOutputDisplay)
clearButton.addEventListener('dblclick',clearAllDisplay);
// variables
let firstOperand, operator, secondOperand,result;
let inputValues = '';
// functions 

function handleInputDisplay(e){ 
    const clickedButton = e.target
    inputDisplay.textContent += (clickedButton.textContent)
}

function addition(a,b){
    return a + b;
 }
function subtraction(a,b){
    return a - b;
 }
function multiplication(a,b){
    return a * b;
}
function division(a,b){
    if (b===0){
       return "Math Error!"
    }
    return a / b;
}
function percentage(a){
    return a / 100;
}
function getInput(e){
    const clickedButton = e.target;
    inputValues += (clickedButton.textContent + '');
    console.log(inputValues);
    console.log(evaluateInput());
}
function evaluateInput(){
    let expression = inputValues.toString();
    let tokens = expression.split(/([+-/%×])/);
    firstOperand = parseFloat(tokens[0]);
    for (let i=1; i < tokens.length; i += 2){
        operator= `${tokens[i]}`;
        secondOperand = parseFloat(tokens[i+1]);
        operate(firstOperand,operator,secondOperand);
   };
   return (console.log(`${firstOperand}+ ${operator} + ${secondOperand}`))
}

function operate(firstOperand, operator, secondOperand){
    switch(operator){
        case '+':
            return result = addition(firstOperand,secondOperand);
        break;
        case '-':
            return result = subtraction(firstOperand, secondOperand);   
        break; 
        case '×':
            return result = multiplication(firstOperand ,secondOperand);   
        break;
        case '/':
            return result = division(firstOperand,secondOperand);   
        break;
        case '%':
            return result = percentage(firstOperand);
        break;
    }
    if(firstOperand && !operator && !secondOperand){
        return result = firstOperand;
    }
    if(!operator || isNaN(result) || isNaN(secondOperand)){
        return result = 'Invalid!'
    }
}
function handleOutputDisplay(){
    evaluateInput()
    clearinputDisplay()
    outputDisplay.textContent = result;
}
function clearinputDisplay(){
    inputDisplay.textContent = '';
    inputValues= '';
    console.log('clearedddd')
}
function clearAllDisplay(){
    outputDisplay.textContent = '';
    clearinputDisplay()
}
// function deleteNumber(){
    // inputDisplay.textContent -= inputDisplay.textContent;
// }


