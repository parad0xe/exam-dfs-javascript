import {List} from "./dom_components/list.js";
import {scripts} from "./custom_modules/scripts.js";
import {Calculator} from "./dom_components/calculator.js";

const createList = () => {
    const dataset = []
    for (const script in scripts)
        dataset.push(script.toString())

    const list = new List('#list-container', dataset)
    list.options.dbclick.nextColor = 'blue'
}

const createCalculator = () => {
    const calculator = new Calculator("#calculator-container")
    calculator.event.onProcessResult = (res) => {
        if(res && res >= 100) {
            const cid = Math.floor(Math.random() * 33 + 1)

            fetch(`https://rickandmortyapi.com/api/character/${cid}`).then(res => res.json()).then((character) => {
                const image$ = document.createElement('img')
                image$.src = character.image
                document.querySelector(".res-greater-than-100").appendChild(image$)

                setTimeout(() => {
                    document.querySelector(".res-greater-than-100").innerHTML = ""
                }, 3000)
            })
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    createList()
    createCalculator()
})