
// Custom Automate

/**
 * @type {{toBeEquals: ((function(*=): (*))|*)}}
 */
export const Case = {
    data: null,
    test_name: "",

    toBeEquals: function(expected) {
        let res = this.__deepEquals(expected, this.data)

        if(!res.ok)
            return this.__failed(expected, this.data, res.error)

        return this.__success()
    },

    __deepEquals: function(expected, got, key = "") {
        let res = {ok: true, error: null}

        if(typeof expected !== 'object' || typeof got !== 'object' || expected === null || got === null) {
            if(expected !== got) {
                res.ok = false
                res.error = `expected("${expected}" [${typeof expected}]) not equal to got("${got}" [${typeof got}])`
            }

            return res
        }

        for (const k of Object.keys(expected)) {
            let current_key = ""

            if(Array.isArray(expected)) {
                current_key = (key === "") ? k : key + `[${k}]`
            } else {
                current_key = (key === "") ? k : key + `.${k}`
            }

            if (typeof expected[k] !== "object") {
                if(got.hasOwnProperty(k) && expected[k] === got[k]) {
                    res.ok &= true
                } else {
                    res.ok = false
                    res.error = `expected("${current_key} = ${expected[k]}" [${typeof expected[k]}]) not equal to got("${current_key} = ${got[k]}" [${typeof got[k]}])`
                }
            } else res = this.__deepEquals(expected[k], got[k], current_key)

            if(!res.ok) break
        }

        return res
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