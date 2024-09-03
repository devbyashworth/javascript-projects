document.addEventListener('DOMContentLoaded', () => {
    const model = {
        currentInput: '',
        renderString: '',
        result: null,
        operation: [],
        calcClicked: false,
    };

    const calculator = {
        init() {
            this.cacheDOM();
            this.bindEvents();
        },

        cacheDOM() {
            this.btnNums = document.querySelectorAll('.btn-num');
            this.btnClear = document.querySelector('.btn-clear');
            this.btnOperators = document.querySelectorAll('.btn-operator');
            this.btnEquals = document.querySelector('.btn-equals');

            this.secondaryDisplay = document.getElementById('secondaryDisplay');
            this.primaryDisplay = document.getElementById('primaryDisplay');
        },

        bindEvents() {
            this.btnClear.addEventListener('click', this.clear.bind(this));
            this.btnNums.forEach(btn => btn.addEventListener('click', this.handleNumber.bind(this)));
            this.btnOperators.forEach(btn => btn.addEventListener('click', this.handleOperator.bind(this)));
            this.btnEquals.addEventListener('click', this.calculate.bind(this));
        },

        clear() {
            model.currentInput = '';
            model.renderString = '';
            model.result = null;
            model.operation = [];
            model.calcClicked = false;
            view.clearScreens();
        },

        handleNumber(e) {
            if (model.calcClicked) {
                this.clear();
                model.calcClicked = false;
            }

            const number = e.target.dataset.value;
            if (number === '.' && model.currentInput.includes('.')) return;

            model.currentInput += number;
            view.updatePrimaryDisplay(model.currentInput);
            view.adjustFontSize();
        },

        handleOperator(e) {
            if (model.currentInput === '' && model.result === null) return;

            const operator = e.target.dataset.value;
            if (model.currentInput !== '') {
                model.operation.push(model.currentInput);
                model.renderString += model.currentInput + ' ' + operator + ' ';
            } else if (model.result !== null) {
                model.renderString = model.result + ' ' + operator + ' ';
            }

            model.operation.push(operator);
            model.currentInput = '';
            model.calcClicked = false;
            view.updatePrimaryDisplay(operator);
            view.updateSecondaryDisplay(model.renderString);
        },

        calculate() {
            if (model.currentInput === '') return;

            model.operation.push(model.currentInput);
            try {
                const result = this.evaluateExpression(model.operation);
                model.result = result;
                model.renderString += model.currentInput + ' = ' + result;
                view.updatePrimaryDisplay(result);
                view.updateSecondaryDisplay(model.renderString);
                model.calcClicked = true;
            } catch (error) {
                view.updatePrimaryDisplay('Error', 'error');
            }
        },

        evaluateExpression(expression) {
            const exp = expression.join(' ');
            return new Function(`return ${exp}`)();
        }
    };

    const view = {
        clearScreens() {
            calculator.secondaryDisplay.textContent = '0';
            calculator.primaryDisplay.textContent = '0';
            calculator.primaryDisplay.classList.remove('answer', 'error', 'text-small', 'text-smaller', 'text-smallest');
        },

        updatePrimaryDisplay(content, className = 'answer') {
            calculator.primaryDisplay.textContent = content;
            calculator.primaryDisplay.classList.add(className);
        },

        updateSecondaryDisplay(content) {
            calculator.secondaryDisplay.textContent = content;
        },

        adjustFontSize() {
            const length = model.currentInput.length || model.result?.toString().length || 0;
            calculator.primaryDisplay.classList.remove('text-small', 'text-smaller', 'text-smallest');

            if (length > 12) {
                calculator.primaryDisplay.classList.add('text-smallest');
            } else if (length > 10) {
                calculator.primaryDisplay.classList.add('text-smaller');
            } else if (length > 8) {
                calculator.primaryDisplay.classList.add('text-small');
            }
        }
    };

    calculator.init();
});
