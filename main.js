/*
 - SIMPLE JAVASCRIPT CALCULATOR -
  By: kiya kebe
  Date: Sep 6/ 2022
  This calculator build using HTML, CSS and JS
  It is capable of calculating simple operation
  Features # Addition   # Subtraction   # Multiplication    # Division 
           # Modulus    # Square Root   # Exponential       # Logarith
  
  To use 1. (+, -, /, *, ^, %) use the operator at the middle of the two inpute
         2. (Log & Square Root) click on the button after the inpute
*/

class Calculator{ // 
    constructor(prevText, currentText){ // constructor of the Calculator class
        /* 
         - this constructor takes prevText and currentText as argument 
            to give the object access to the previous and current display of the calculator
        */
        this.prevText = prevText
        this.currentText = currentText
         // - chackEqual -to chack weather the user want new computation or continue on the first computed value
        this.chackEqual = 0 // tell the program the user have choosen weather new computation or continue 
        this.clear() // make sure the screen when new object is created
    }
    clear(){ // Clears the screen every time it is called
        this.currentOperand = ''
        this.prevOperand = ''
        this.operation = undefined
        this.updateDisplay()
    }
    delete(){ // Delete the last number in the current display
        this.currentOperand = this.currentOperand.slice(0, -1)
        this.updateDisplay()
    }
    appendNumber(number){  // used to append number the user enters to the current value
        if(number === '.' && this.currentOperand.includes('.')) return 
        // prevent double entry of '.' in the number the user enter
        if (this.chackEqual == 1 && this.currentOperand != 0){
            // clear the screen when the user need new computation
            this.clear()
            this.chackEqual = 0
            // tell the program the user have choosen weather new computation or continue
        }
        // converted to string so that we can append the nuber to the previous number in teh display
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation){ // choose the operation wanted to compute
        if(this.currentOperand === '' && this.prevOperand != ''){ // condition to change operation
            this.operation = operation
            return
        }else if(this.currentOperand === ''){ // cancel if there is nothing to operate on
            return
        }
        if(this.prevOperand != ''){ // call compute if the condition is enougn to undergo computation
            this.compute()
        }
        // if only the currentOperand is not enpty is 
        this.operation = operation // assign new operation if there is nothing before
        this.prevOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute(){ // the the maths if the condition is fulfilled
        let computation // variable to store the computed value
        const prev = parseFloat(this.prevOperand) // convert the string to float number
        const current = parseFloat(this.currentOperand) // convert the string to float number
        if(isNaN(prev) || isNaN(current)) return // calcel the operation if either of them are empty
        // this condition if must for the calculation to get computed
        switch(this.operation){ // condition to compute the basic math calculation
            case '+':
                computation = prev + current; break;
            case '-':
                computation = prev - current; break;
            case '/':
                computation = prev/current; break;
            case '*':
                computation = prev*current; break;
            case '^':
                computation = Math.pow(prev, current); break;
            case '%':
                computation = prev%current; break;
            default:
                return
        }
        this.createHistory(prev, current, this.operation, computation) 
        // create a history of each computation
        this.currentOperand = computation
        this.operation = undefined
        this.prevOperand = ''

    }
    getDisplayNumber(number){ // to format the inpute so that we can see the right decimal places in the input
        const stringNumber = number.toString()
        // split the number in to two parts if it containes decimal places
        const integerDigit = parseFloat(stringNumber.split('.')[0]) 
        const decimalDigit = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigit)){
            integerDisplay = ''
        }else{
            // format the integer digits in the more readable manner
            integerDisplay = integerDigit.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(decimalDigit != null){
            return integerDisplay.toString() +'.'+ decimalDigit.toString()
        }else{
            return integerDisplay.toString()
        }
    }
    updateDisplay(){
        this.currentText.innerText = this.getDisplayNumber(this.currentOperand)
        // format the input to the right format with getDisplayNumber
        if(this.operation != null && this.prevOperand != ''){
            this.prevText.innerText = this.getDisplayNumber(this.prevOperand) + this.operation.toString()
        }else{
            this.prevText.innerText = ''
        }
    }
    createHistory(prev, current, operation, computation){
        // create a record of each computation ever time cumpute is called and calculate the result
        const historyTable = document.getElementById('historyTable') // get the history table in the HTML file
        const togglerButton = document.getElementById('togglerButton') // get the history table toggler button
        // change the style of the HTML element acces through the above variables
        togglerButton.style.display = 'block'
        historyTable.style.width = '20em'
        toggleId = 0 // lett the program the table is off of the screen
        const history = document.createElement('div') // create new 'dev' element
        history.classList.add('history-list')
        historyTable.appendChild(history)
        const equation = document.createElement('span') // create a 'span' element of the the equation entered
        equation.classList.add('operation-equation')
        equation.innerText = prev.toString() + operation.toString() + current.toString()
        const value = document.createElement('span') // create a 'span' element of the computed value
        value.classList.add('operation-value')
        value.innerText = computation.toString()
        // append the two element created to the element created to display them in the right format
        history.appendChild(equation)
        history.appendChild(value)
    }
}
// variable to check weather the history tabel is on or off
let toggleId = 1 

// variables that give access to the buttons in the HTML file
const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-clear-all]")
const prevText = document.querySelector("[data-prev]")
const currentText = document.querySelector("[data-current]")
const logarithmFunction = document.querySelector("[data-logarithm]")
const squareroot = document.querySelector("[data-sqrt]")

const calculator = new Calculator(prevText, currentText) // create object of the class

numberButton.forEach(button => { // access the value of the number button being clicked
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText) // access the value
        calculator.updateDisplay() // update the display afetr the value is changed
    })
})
operationButton.forEach(button => { // access the value of operation button being clicked
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText) // access the value
        calculator.updateDisplay() // update the display after the operation is choosed
        calculator.chackEqual = 0 
        // tell the program the user have choosen weather new computation or continue
    })
})
equalsButton.addEventListener('click', button =>{ // access the equals button
    calculator.compute() // compute when the equals button is clicked
    calculator.updateDisplay() // update the display after computation
    calculator.chackEqual = 1 // let the user choose to continue or start new computation
})
logarithmFunction.addEventListener('click', button =>{ // operate when the logarithm button is clicked
    if(calculator.currentOperand != ''){
        calculator.computation = Math.log(parseFloat(calculator.currentOperand)) // compute the logarithm
        calculator.currentOperand = calculator.computation
    } 
    calculator.updateDisplay() // update the display after the logarithm cmoputation
    calculator.chackEqual = 1
})
squareroot.addEventListener('click', button =>{ // operate when the squareroot button is clicked
    if(calculator.currentOperand != ''){
        calculator.computation = Math.sqrt(parseFloat(calculator.currentOperand)) // compute the squareroot
        calculator.currentOperand = calculator.computation
    } 
    calculator.updateDisplay() // update the display
    calculator.chackEqual = 1
})
allClearButton.addEventListener('click', button =>{ // operate when the all clear button is clicked
    calculator.clear() // clear and update the display
})
deleteButton.addEventListener('click', button =>{ // operate when the delete button is clicked
    calculator.delete() // delete the end value in teh current display and update the dispaly
})
function clearHistory(){ // clear all history in the history table
    const historyTable = document.getElementById('historyTable')
    historyTable.style.width = 0
    toggleId = 0
    const histories = document.querySelectorAll('.history-list')
    histories.forEach(history => {
        history.remove();
    });
}
function toggleHistory(){ // turn the history table on and off when the toggler button is clicked
    const historyTable = document.getElementById('historyTable')
    if(toggleId == 1){
        historyTable.style.width = '20em'
        toggleId = 0
    }else{
        historyTable.style.width = 0
        toggleId = 1
    }
}



