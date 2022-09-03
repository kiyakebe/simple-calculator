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
        if (this.chackEqual == 1){
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
    clickSound(audio){
        var audio = audio; 
        audio. play();
    }
}


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
        calculator.clickSound()
    })
})
operationButton.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
        calculator.clickSound()
        calculator.chackEqual = 0
    })
})
equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
    var audio = new Audio("compute.mp3");
    calculator.clickSound(audio)
    calculator.chackEqual = 1
})
allClearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
    calculator.clickSound()
})
deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
    calculator.clickSound()
})













