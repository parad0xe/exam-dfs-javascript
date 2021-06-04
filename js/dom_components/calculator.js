
let ID = 0

// -- Main Object
const Calculator = function(container_selector) {
    if (container_selector === undefined) {
        new Error("Undefined container")
        return
    }

    this.__container$ = document.querySelector(container_selector)
    this.__calculator$ = null

    this.id = ID++
    this.__symbol = {
        "+": "+",
        "-": "-",
        "*": "*",
        "/": "/",
        "Mod": "%",
        "=": "="
    }
    this.__operation_data = []

    this.__displayCalculator()
}

// -- Public Helper Functions
Calculator.prototype.add = function(v) {
    const last_value = this.__operation_data[this.__operation_data.length - 1]

    if(last_value in this.__symbol && v in this.__symbol) {
        console.error("Illegal entry.")
        return
    }

    if(this.__lastIsNumber() && this.__isNumber(v)) {
        v = last_value.toString() + v.toString()
        this.__operation_data[this.__operation_data.length - 1] = v
    } else this.__operation_data.push(v.toString())

    this.event.onAdd(v)
    this.__updateResultView()
}
Calculator.prototype.removeLast = function() {
    if(this.__operation_data.length === 0) return

    if(this.__lastIsNumber()) {
        let last_value = this.__operation_data[this.__operation_data.length - 1]
        last_value = last_value.substr(0, last_value.length - 1)
        if(last_value.length > 0)
            this.__operation_data[this.__operation_data.length - 1] = last_value
        else
            this.__operation_data = this.__operation_data.slice(0, -1)
    } else this.__operation_data = this.__operation_data.slice(0, -1)

    this.__updateResultView()
}
Calculator.prototype.clear = function() {
    this.__operation_data = []
    this.__updateResultView()
    this.event.onClear()
}
Calculator.prototype.getResult = function() {
    let res = null

    try {
        const operation = this.__operation_data
            .map(op => op.replace(op, this.__symbol[op] ?? op))
            .join('')

        res = Function('return (' + operation + ')')();
    } catch (e) {
        console.error(e)}

    this.event.onProcessResult(res)

    return res
}

// -- Event
Calculator.prototype.event = {
    onProcessResult: (res) => {},
    onBeforeUpdate: (res) => {},
    onAfterUpdate: (res) => {},
    onClear: () => {},
    onAdd: (v) => {},
}

// -- Private Helper Functions
Calculator.prototype.__isNumber = function(v) {
    return !Number.isNaN(parseInt(v))
}
Calculator.prototype.__lastIsNumber = function() {
    if(this.__operation_data.length > 0)
        return this.__isNumber(this.__operation_data[this.__operation_data.length - 1])
    return false
}
Calculator.prototype.__updateResultView = function() {
    this.event.onBeforeUpdate(this.__calculator$.querySelector('.calculator-result-view').textContent)
    this.__calculator$.querySelector('.calculator-result-view').textContent = this.__operation_data.join(' ')
    this.event.onAfterUpdate(this.__calculator$.querySelector('.calculator-result-view').textContent)
}

// -- Initialisation Functions
Calculator.prototype.__displayCalculator = function() {
    const calculator$ = document.createRange().createContextualFragment(
        "<div id='calculator-id-" + this.id + "' class=\"calculator\">\n" +
        "           <h2>Calculator</h2>\n" +
        "           <div class=\"calculator-result-view\"></div>\n" +
        "           <div class=\"calculator-buttons\">\n" +
        "               <div class=\"calculator-row\">\n" +
        "                   <div class=\"calculator-button\">7</div>\n" +
        "                   <div class=\"calculator-button\">8</div>\n" +
        "                   <div class=\"calculator-button\">9</div>\n" +
        "                   <div class=\"calculator-button\">*</div>\n" +
        "               </div>\n" +
        "\n" +
        "               <div class=\"calculator-row\">\n" +
        "                   <div class=\"calculator-button\">4</div>\n" +
        "                   <div class=\"calculator-button\">5</div>\n" +
        "                   <div class=\"calculator-button\">6</div>\n" +
        "                   <div class=\"calculator-button\">/</div>\n" +
        "               </div>\n" +
        "\n" +
        "               <div class=\"calculator-row\">\n" +
        "                   <div class=\"calculator-button\">1</div>\n" +
        "                   <div class=\"calculator-button\">2</div>\n" +
        "                   <div class=\"calculator-button\">3</div>\n" +
        "                   <div class=\"calculator-button\">-</div>\n" +
        "               </div>\n" +
        "\n" +
        "               <div class=\"calculator-row\">\n" +
        "                   <div class=\"calculator-button\">0</div>\n" +
        "                   <div class=\"calculator-button\">(</div>\n" +
        "                   <div class=\"calculator-button\">)</div>\n" +
        "                   <div class=\"calculator-button\">+</div>\n" +
        "               </div>\n" +
        "\n" +
        "               <div class=\"calculator-row\">\n" +
        "                   <div class=\"calculator-button calculator-button-clear\">C</div>\n" +
        "                   <div class=\"calculator-button\">Del</div>\n" +
        "                   <div class=\"calculator-button\">mod</div>\n" +
        "                   <div class=\"calculator-button\">e</div>\n" +
        "               </div>\n" +
        "\n" +
        "               <div class=\"calculator-row\">\n" +
        "                   <div class=\"calculator-button calculator-full-row calculator-button-equal\">=</div>\n" +
        "               </div>\n" +
        "           </div>\n" +
        "       </div>"
    )

    this.__container$.appendChild(calculator$)
    this.__calculator$ = this.__container$.querySelector('#calculator-id-' + this.id)

    this.__addListeners()
}
Calculator.prototype.__addListeners = function() {
    Array.from(this.__calculator$.querySelectorAll(".calculator-button")).map((button) => {
        button.addEventListener('click', (e) => {
            const value = e.target.textContent

            switch (value) {
                case 'C':
                    this.clear()
                    break
                case 'Del':
                    this.removeLast()
                    break
                case 'mod':
                    this.add("Mod")
                    break
                case '=':
                    const res = this.getResult()
                    if(res !== null) {
                        this.__operation_data = [res.toString()]
                        this.__updateResultView()
                    }
                    break
                default:
                    this.add(value)
                    break
            }
        })
    })
}

export {Calculator}
