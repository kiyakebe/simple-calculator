class Calculator{
    constructor(prevText, currentText){
        this.prevText = prevText
        this.currentText = currentText
        this.chackEqual = 0
        this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.slice(0, -1)
    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        if (this.chackEqual == 1 && this.currentOperand != 0){
            this.clear()
            this.chackEqual = 0
        }
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.prevOperand != ''){
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute(){
        let computation
        const prev = parseFloat(this.prevOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current; break;
            case '-':
                computation = prev - current; break;
            case '/':
                computation = prev/current; break;
            case '*':
                computation = prev*current; break;
            default:
                return
        }
        this.createHistory(prev, current, this.operation, computation)
        this.currentOperand = computation
        this.operation = undefined
        this.prevOperand = ''

    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigit = parseFloat(stringNumber.split('.')[0])
        const decimalDigit = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigit)){
            integerDisplay = ''
        }else{
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
        
        if(this.operation != null){
            this.prevText.innerText = this.getDisplayNumber(this.prevOperand) + this.operation.toString()
        }else{
            this.prevText.innerText = ''
        }
    }
    createHistory(prev, current, operation, computation){
        const historyTable = document.getElementById('historyTable')
        historyTable.style.width = '20em'
        toggleId = 0
        const history = document.createElement('div')
        history.classList.add('history-list')
        historyTable.appendChild(history)
        const equation = document.createElement('span')
        equation.classList.add('operation-equation')
        equation.innerText = prev.toString() + operation.toString() + current.toString()
        const value = document.createElement('span')
        value.classList.add('operation-value')
        value.innerText = computation.toString()
        history.appendChild(equation)
        history.appendChild(value)
    }
}

let toggleId = 1

const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-clear-all]")
const prevText = document.querySelector("[data-prev]")
const currentText = document.querySelector("[data-current]")




const calculator = new Calculator(prevText, currentText)

numberButton.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButton.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
        calculator.chackEqual = 0
    })
})
equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
    calculator.chackEqual = 1
})
allClearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})


function clearHistory(){
    const historyTable = document.getElementById('historyTable')
    historyTable.style.width = 0
    toggleId = 0
    const histories = document.querySelectorAll('.history-list')
    histories.forEach(history => {
        history.remove();
    });
}

function toggleHistory(){
    const historyTable = document.getElementById('historyTable')
    if(toggleId == 1){
        historyTable.style.width = '20em'
        toggleId = 0
    }else{
        historyTable.style.width = 0
        toggleId = 1
    }
}





