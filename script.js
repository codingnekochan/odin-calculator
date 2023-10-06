 const inputDisplay = document.getElementById('problem');
 const outputDisplay = document.getElementById('answer');
 const buttons = document.querySelectorAll('.button')
 const numButtons = document.querySelectorAll('.digit_button');
 const operatorButtons = document.querySelectorAll('.operator_button');
 const percentageButton = document.getElementById('percentage')
 const equalToButton = document.getElementById('equal-to');
 const clearButton = document.getElementById('clear');
 const signButton = document.getElementById('negate');
// event listeners
buttons.forEach(button => button.addEventListener('click', getInput)) ;
numButtons.forEach( button => button.addEventListener('click', handleInputDisplay));
percentageButton.addEventListener('click',getPercentage);
operatorButtons.forEach( button => button.addEventListener('click', handleInputDisplay));
clearButton.addEventListener('click',clearAllDisplay);
equalToButton.addEventListener('click',handleOutputDisplay);
signButton.addEventListener('click', toggleSign);
document.addEventListener('keypress', handleKeyboardPress);
// variables
let firstOperand, operator, secondOperand, result;
let inputValues = '';
let toggleEvent = false;
// functions to handle operations
function handleInputDisplay(e){ 
    const clickedButton = e.target
    inputDisplay.textContent += (clickedButton.textContent+ ' ');
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
    return a / b;
}
function percentage(a){
    return a / 100;
}
//functions to handle input and math evaluation
function getPercentage(){
    result = percentage(firstOperand);
    firstOperand = result;
    outputDisplay.textContent= firstOperand;
    inputValues='';
    return firstOperand;
 }
function getInput(e){
    const clickedButton = e.target;
    inputValues += (clickedButton.textContent + '');
    evaluateInput();
}
function evaluateInput(){
    // ensure input values are taken as strings
    let expression = inputValues.toString();
    // Replace characters shown on ui with standard operators to make sure it works
    expression = expression.replace(/÷/g, '/').replace(/×/g, '*');
    // Split the input into an array for evaluation
    let tokens = expression.split(/([+\-*/%])/); // Use standard operators in the regex
    firstOperand = parseFloat(tokens[0]);
    // to evaluate negative values
    if(toggleEvent){
        firstOperand = -firstOperand
    };
    // input evaluation;
    for (let i=1; i < tokens.length; i += 2){
        operator= `${tokens[i]}`;
        secondOperand = parseFloat(tokens[i+1]);
        operate(firstOperand,operator,secondOperand);
        roundupResult();
        firstOperand = result;
        outputDisplay.textContent = result;
   }
   if (isNaN(result)){
        outputDisplay.textContent = '';
   }
   console.log(tokens);
   return firstOperand;
}
function operate(firstOperand, operator, secondOperand){
    switch(operator){
        case '+':
            return result = addition(firstOperand,secondOperand);
        break;
        case '-':
            return result = subtraction(firstOperand, secondOperand);   
        break; 
        case '*':
            return result = multiplication(firstOperand ,secondOperand);   
        break;
        case '/':
            if( secondOperand === 0){
                // error validation for division
                return  result = "Math Error!"
             }else{
                return result = division(firstOperand,secondOperand); 
            } 
        break;
    }
    // error validation of incorrectly entered expressions
    if(!operator || !(firstOperand) || !(secondOperand)){
        return result = 'Invalid!'
    }
}
function roundupResult(){
    let precison = result.toString().length;
    // round answer to five figures
    if (precison >= 10){
       return result = parseFloat(result.toFixed(5)); 
    }else{
        return result;
    }
}
// function to handle output 
function handleOutputDisplay(){
    clearinputDisplay();
    outputDisplay.textContent = result;
    inputDisplay.textContent += result;
    inputValues += result;
}
   
// function to clear displays and array
function clearinputDisplay(){
    inputDisplay.textContent = '';
    inputValues= '';
    console.log('clearedddd')
}
function clearAllDisplay(){
    outputDisplay.textContent = '';
    clearinputDisplay()
}
// function to handle keyboard events
function handleKeyboardPress(e) {
    // Get buttons by data-key attribute for keys
    const keys = document.querySelectorAll(`button[data-key="${e.key}"]`);
    // Handle the equal to using space bar (if needed)
    if (e.key === " ") {
        handleOutputDisplay();
    }
    //handle clear using delete key
    if (e.key === "Delete") {
        clearAllDisplay();
    }  
    // Check if any operator key matches the pressed key
        keys.forEach((key) => {
            if (e.key === "%"){
             return getPercentage()
            }
            inputDisplay.textContent += key.textContent;
            inputValues += key.textContent;
            evaluateInput();
            console.log(inputValues)
        });
        
    }
// function to handle toggling signs on inputvalues
function toggleSign() {
    // Check if the firstOperand has a value
    if (typeof firstOperand === "number") {
        firstOperand = -firstOperand;
    }
    toggleEvent = true;
    inputDisplay.textContent = firstOperand;
}
clearAllDisplay()
