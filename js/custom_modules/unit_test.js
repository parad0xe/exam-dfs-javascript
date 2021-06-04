
// Custom Automate

/**
 * @type {{toBeEquals: ((function(*=): (*))|*)}}
 */
export const Case = {
    data: null,
    test_name: "",

    toBeEquals: function(expected) {
        if(Array.isArray(this.data))
            return this.__arrayToBeEqual(expected)
        else if(typeof this.data === "object")
            return this.__objectToBeEqual(expected)

        if(expected !== this.data)
            return this.__failed(expected, this.data, `expected(${expected} [${typeof expected}]) not equals got(${this.data} [${typeof this.data}])`)

        return this.__success()
    },

    __arrayToBeEqual: function(expected) {
        for (let i of this.data.keys()) {
            if(expected[i] !== this.data[i])
                return this.__failed(expected[i], this.data[i], `expected(${expected[i]} [${typeof expected[i]}]) not equals got(${this.data[i]} [${typeof this.data[i]}])`)
        }

        return this.__success()
    },

    __objectToBeEqual: function(expected) {
        if(JSON.stringify(expected) !== JSON.stringify(this.data))
            return this.__failed(expected, this.data, "Objects are not equals")

        return this.__success()
    },

    __failed: function(expected, got, error = null) {
        console.error(`\n  Failed(${this.test_name})`)
        console.error("    [EXPECTED] => ", `<${expected}>`)
        console.error("    [  GOT   ] => ", `<${this.data}>`)

        if(error !== null)
            console.error(`    [ERROR] => ${error}`)

        console.error("")
    },

    __success: function() {
        console.log(`  Success(${this.test_name})`)
    }
}

/**
 * @type {{expect: (function(*, *=, *=): {toBeEquals: ((function(*=): *)|*)}), case: utest.case}}
 */
export const utest = {
    case: (case_name, callback) => {
        console.log(`\nCase(${case_name}):`)
        callback()
    },

    expect: (test_name, callback, data = null) => {
        if(data === null) {
            data = callback
            callback = (data) => data
        }

        if(Array.isArray(data))
            data = utest.__expectArray(callback, data)
        else
            data = callback(data)

        const new_case = Object.create(Case)
        new_case.data = data
        new_case.test_name = test_name
        return new_case
    },

    __expectArray: (callback, data) => {
        return data.map((item) => {
            return callback(item)
        })
    }
}