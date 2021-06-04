
// -- Main Object
const List = function (container_selector, data) {
    if (container_selector === undefined) {
        new Error("Undefined container")
        return
    }

    this.__container$ = document.querySelector(container_selector)

    this.__pos = null
    this.__elements = []
    this.__data = Array.from(data)

    this.__displayUlLiList()
    this.__displayPrevControlButton()
    this.__displayNextControlButton()
}

// -- Public Helper Functions
List.prototype.getElementAt = function(pos) {
    if(this.__elements.length === 0) return null
    return this.__elements[this.__getValidPositionOf(pos)]
}
List.prototype.moveTo = function(pos, options = {}) {
    options.lastColor = options.lastColor ?? 'black'
    options.nextColor = options.nextColor ?? 'red'

    if(this.__pos !== null)
        this.getElementAt(this.__pos).style.color = options.lastColor

    this.__pos = this.__getValidPositionOf(pos)
    this.getElementAt(this.__pos).style.color = options.nextColor
}

// -- Options
List.prototype.options = {
    click: {
        lastColor: 'black',
        nextColor: 'red',
    },
    dbclick: {
        latency: 300,
        lastColor: 'black',
        nextColor: 'green',
    }
}

// -- Private Helper Functions
List.prototype.__getValidPositionOf = function(pos) {
    return (pos < 0) ? ((pos % this.__elements.length) + this.__elements.length) : pos % this.__elements.length
}

// -- Initialisation Functions
List.prototype.__displayUlLiList = function() {
    const ul$ = document.createElement("ul")
    for (const value of this.__data) {
        const li$ = document.createElement("li")
        li$.textContent = value.toString()
        ul$.appendChild(li$)

        this.__elements.push(li$)
    }
    this.__container$.appendChild(ul$)
}
List.prototype.__displayPrevControlButton = function() {
    let nb_click = 0

    const button_prev$ = document.createElement('button')
    button_prev$.textContent = 'Previous'
    button_prev$.addEventListener('click', (e) => {
        nb_click++
        if(nb_click === 1) {
            setTimeout(() => {
                if(nb_click === 1) {
                    this.moveTo((this.__pos === null) ? 0 : this.__pos - 1, {
                        lastColor: this.options.click.lastColor,
                        nextColor: this.options.click.nextColor
                    })
                } else {
                    this.moveTo((this.__pos === null) ? 0 : this.__pos - 3,{
                        lastColor: this.options.dbclick.lastColor,
                        nextColor: this.options.dbclick.nextColor
                    })
                }

                nb_click = 0
            }, this.options.dbclick.latency)
        }
    })
    this.__container$.appendChild(button_prev$)
}
List.prototype.__displayNextControlButton = function() {
    let nb_click = 0

    const button_next$ = document.createElement('button')
    button_next$.textContent = 'Next'
    button_next$.addEventListener('click', (e) => {
        nb_click++
        if(nb_click === 1) {
            setTimeout(() => {
                if(nb_click === 1) {
                    this.moveTo((this.__pos === null) ? 0 : this.__pos + 1, {
                        lastColor: this.options.click.lastColor,
                        nextColor: this.options.click.nextColor
                    })
                } else {
                    this.moveTo((this.__pos === null) ? 0 : this.__pos + 3,{
                        lastColor: this.options.dbclick.lastColor,
                        nextColor: this.options.dbclick.nextColor
                    })
                }

                nb_click = 0
            }, this.options.dbclick.latency)
        }
    })
    this.__container$.appendChild(button_next$)
}

export {List}