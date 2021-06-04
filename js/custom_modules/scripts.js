
export const scripts = {
    pascalCase: (sentence) => {
        if(typeof sentence !== "string") return "Merci de mettre une string valable"
        return sentence
            .replace(/^([a-z])| ([a-z])/g, (c) => c.toUpperCase())
            .replace(/\s/g, "")
    },

    palindrome: (word) => {
        if(typeof word !== "string" || word.length === 0) return "Merci de mettre une string valable"
        word = word.toLowerCase()
        const middle = Math.ceil(word.length / 2)
        const start = word.substr(0, middle - 1)
        const end = word.substr(middle)
        return start === end.split("").reverse().join('')
    },

    findLongestWord: (sentence) => {
        if(typeof sentence !== "string") return "Merci de mettre une string valable"
        let longest = ''
        for(let word of sentence.split(' ').values()) {
            if(word.length > longest.length)
                longest = word
        }
        return longest
    },

    merge: (a, b) => {
        if(typeof a !== "object" || typeof b !== 'object') return "Type de l'entrée invalide"

        let res = {}

        for(let key in a) {
            if(key in b) {
                a[key] = (!Array.isArray(a[key])) ? [a[key]] : a[key]
                b[key] = (!Array.isArray(b[key])) ? [b[key]] : b[key]
                res[key] = [...a[key], ...b[key]]
            } else res[key] = a[key]
        }

        for(let key in b) {
            if(!(key in a)) res[key] = b[key]
        }

        return res
    },

    leet: (word, translator = {"a": "4", "e": "3", "i": "1", "o": "0", "u": "(_)", "y": "7"}) => {
        if(typeof word !== "string") return "Merci de mettre une string valable"
        return word.split('').reduce((a, c) => {
            a += translator[c.toLowerCase()] ?? c
            return a
        }, "")
    },

    propAccess: (object, path) => {
        if(typeof object != 'object' || typeof path !== "string") return null
        if(path.length === 0) return object

        let props = path.split('.')
        let tmp_o = object

        for(let prop of props.values()) {
            if(!tmp_o.hasOwnProperty(prop)) return `${path.split(prop)[0] + `${prop}`} does not exist`
            tmp_o = tmp_o[prop]
        }

        return tmp_o
    }
}