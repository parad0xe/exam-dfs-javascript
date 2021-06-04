import {scripts} from "./custom_modules/scripts.js";
import {utest} from "./custom_modules/unit_test.js";

const pascalCaseTest = () => {
    utest.expect("PascalCase(sentence in pascalCase)", scripts.pascalCase, "sentence in pascalCase")
        .toBeEquals("SentenceInPascalCase")

    utest.expect("PascalCase(42)", scripts.pascalCase, 42)
        .toBeEquals("Merci de mettre une string valable")
}

const palindromeTest = () => {
    utest.expect("Palindrome(kayak)", scripts.palindrome, "kayak")
        .toBeEquals(true)

    utest.expect("Palindrome(Racecar)", scripts.palindrome, "Racecar")
        .toBeEquals(true)

    utest.expect("Palindrome(noname)", scripts.palindrome, "noname")
        .toBeEquals(false)

    utest.expect("Palindrome(42)", scripts.palindrome, 42)
        .toBeEquals("Merci de mettre une string valable")
}

const longestWordTest = () => {
    utest.expect("LongestWord", scripts.findLongestWord, "Le chemin le plus cours n'est pas toujours le meilleur")
        .toBeEquals("toujours")

    utest.expect("LongestWord(42)", scripts.findLongestWord, 42)
        .toBeEquals("Merci de mettre une string valable")
}

const mergeTest = () => {
    const wu = {
        a: [{ x: 2 }, { y: 4 }],
        b: 1
    };
    const tang = {
        a: { z: 3 },
        b: [2, 3],
        c: 'foo'
    };
    const clan = {
        a: { t: 5 },
        c: 'foo'
    };
    const expectedResult1 = {
        "a": [{ "x": 2 }, { "y": 4}, { "z": 3 }],
        "b": [1, 2, 3],
        "c": "foo"
    }
    const expectedResult2 = {
        "a": [{"z": 3}, { "t": 5 }],
        "b": [2, 3],
        "c": ["foo", "foo"]
    }

    utest.expect("Merge(wu, tang)", scripts.merge(wu, tang))
        .toBeEquals(expectedResult1)

    utest.expect("Merge(tang, clan)", scripts.merge(tang, clan))
        .toBeEquals(expectedResult2)
}

const leetSpeakTest = () => {
    utest.expect("LeetSpeak", scripts.leet, 'BADBADNOTGOOD - "In Your Eyes" (Feat. Charlotte Day Wilson)')
        .toBeEquals('B4DB4DN0TG00D - "1n 70(_)r 373s" (F34t. Ch4rl0tt3 D47 W1ls0n)')

    utest.expect("LeetSpeak(42)", scripts.leet, 42)
        .toBeEquals('Merci de mettre une string valable')
}

const propAccess = () => {
    const farm = {
        animal: {
            type: { name: 'cow' },
            color: "verte",
            bonus: {
                sparkly: true,
                3: "No at least 7"
            }
        }
    }

    utest.expect("propAccess(animal.type.name)", scripts.propAccess(farm, 'animal.type.name'))
        .toBeEquals("cow")

    utest.expect("propAccess(animal.affiliation.name)", scripts.propAccess(farm, 'animal.affiliation.name'))
        .toBeEquals("animal.affiliation does not exist")

    utest.expect("propAccess(affiliation)", scripts.propAccess(farm, 'affiliation'))
        .toBeEquals("affiliation does not exist")

    utest.expect("propAccess(animal.bonus.3)", scripts.propAccess(farm, 'animal.bonus.3'))
        .toBeEquals("No at least 7")

    utest.expect("propAccess()", scripts.propAccess(farm, ''))
        .toBeEquals({
            animal: {
                type: { name: 'cow' },
                color: "verte",
                bonus: {
                    sparkly: true,
                    3: "No at least 7"
                }
            }
        })

    utest.expect("propAccess(42)", scripts.propAccess(farm, 42))
        .toBeEquals(null)
}

// Run Tests
utest.case("PascalCase Test", pascalCaseTest)
utest.case("Palindrome Test", palindromeTest)
utest.case("LongestWord Test", longestWordTest)
utest.case("Merge Test", mergeTest)
utest.case("LeetSpeak Test", leetSpeakTest)
utest.case("PropAccess Test", propAccess)