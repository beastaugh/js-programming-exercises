// Exercise 1
// ----------
// 
// Write a function `keys` that returns the property names of an object as an
// array.

function keys(object) {
    var __keys__ = [], prop;
    for (prop in object) __keys__.push(prop);
    return __keys__;
}

// Exercise 2
// ----------
// 
// Write a function `charFreq` that takes a string and returns an object where the
// property names are characters and the values are how often that character
// appears in the string.

function charFreq(input) {
    var frequencies = {}, i, len, c;
    
    for (i = 0, len = input.length; i < len; i++) {
        c = input[i];
        
        if (typeof frequencies[c] === "number") {
            frequencies[c] += 1;
        } else {
            frequencies[c] = 1;
        }
    }
    
    return frequencies;
}

// Exercise 3
// ----------
// Write a `dangerousDelete` function that accepts an object and a property name
// as arguments. It should delete the property with that name from the object. If
// the property is also defined on that object's prototype, it should delete it
// from there as well.

function dangerousDelete(obj, prop) {
    delete obj[prop];
    
    if (typeof obj[prop] !== undefined) {
        delete obj.constructor.prototype[prop];
    }
}

// Exercise 4
// ----------
// 
// Create a double-ended queue with the following methods: `push`, `pop`, `shift`
// and `unshift`. Implement it _without_ using the built-in array type as a store.
// One possible implementation would be using a linked list as the store.

function Cons(value, prev, next) {
    this.prev = typeof prev === "object" ? prev : null;
    this.next = typeof next === "object" ? next : null;
}

function DEQueue() {
    this._start = new Cons(null, null, null);
    this._end   = this._start;
}

DEQueue.prototype.push = function(value) {
    var last = new Cons(value, this._end, null);
    
    this._end.next = last;
    this._end      = last;
};

DEQueue.prototype.pop = function() {
    var end  = this._end,
        last = end.prev;
    
    last.next = null;
    this._end = last;
    
    return end || null;
};

DEQueue.prototype.unshift = function(value) {
    var first = new Cons(value, null, this._start);
    
    this._start.prev = first;
    this._start      = first;
};

DEQueue.prototype.shift = function() {
    var start = this._start,
        first = start.next;
    
    first.prev  = null;
    this._start = first;
    
    return start || null;
};

// Exercise 5
// ----------
// 
// Write a function `zip` that accepts two arrays as arguments and returns a
// single array where each element is a two-element array consisting of the
// element at that index in the first array, and the element at that index in the
// second array.

function zip(a, b) {
    var zipped = [],
        length = a.length < b.length ? a.length : b.length,
        i;
    
    for (i = 0; i < length; i++) {
        zipped[i] = [a[i], b[i]];
    }
    
    return zipped;
}

// Exercise 6
// ----------
// 
// Write a function `zipWith` that accepts a function and two arrays, and returns
// a single array whose element at any index is the result of passing the element
// at that index in the first array and the element at that index in the second to
// the function as arguments.

function zipWith(fn, a, b) {
    var zipped = [],
        length = a.length < b.length ? a.length : b.length,
        i;
    
    for (i = 0; i < length; i++) {
        zipped[i] = fn(a[i], b[i]);
    }
    
    return zipped;
}

// Exercise 7
// ----------
// 
// Write a function `zip2` that re-implements `zip` in terms of `zipWith`.

function zip2(a, b) {
    return zipWith(function(x, y) {
        return [x, y];
    }, a, b);
}

// Exercise 8
// ----------
// 
// Reimplement the `forEach` method on arrays as `forEach2`. It should iterate
// over every element of an array and pass that element as an argument to the
// provided function. The current array index and the array object should be
// passed in as supplementary arguments. Extra credit: add a second (optional)
// scope argument to the method, allowing the value of `this` inside the function
// to be modified.

Array.prototype.forEach2 = function(fn, scope) {
    var length = this.length, i;
    
    for (i = 0; i < length; i++) {
        fn.call(scope || null, this[i], i, this);
    }
};

// Exercise 9
// ----------
// 
// Add a `bind` method to all functions which accepts an object, and returns a new
// function within which `this` is bound to the object. For example, if we have a
// function `f` and an object `o` with a `name` property:
// 
//     function f() {
//         return this.name;
//     };
//     
//     o = {name: "Objekt"};
//     
//     g = f.bind(o);
// 
// Calling `g` should return the string `"Objekt"`.

Function.prototype.bind = function(object) {
    var fn = this;
    
    return function() {
        var args = Array.prototype.slice.call(arguments, 0);
        
        return fn.apply(object, args);
    };
};

// Exercise 10
// -----------
// 
// Write a function to generate currency-converting functions. It should accept
// the current exchange rate between two currencies as a number, and return a new
// function which, when provided with an amount in one currency, returns the value
// in another.
// 
//     poundsToEuros = currencyConversionGenerator(1.17851);
//     poundsToEuros(200); // Should return 235.702

function currencyConversionGenerator(exchangeRate) {
    return function(amount) {
        return amount * exchangeRate;
    };
}

// Exercise 11
// -----------
// 
// Create a function `morseCharToLatinChar` which accepts a string representing a
// character in Morse code and returns the Latin character it represents.
// Dashes should be given as dashes (`-`) and dots as stops (`.`). E.g,
// 
//     morseCharToLatinChar("-·-·"); // Should return "c"

MORSE_CHARACTER_TABLE = {
    ".-"  : "A",
    "-...": "B",
    "-.-.": "C",
    "-.." : "D",
    "."   : "E",
    "..-.": "F",
    "--." : "G",
    "....": "H",
    ".."  : "I",
    ".---": "J",
    "-.-" : "K",
    ".-..": "L",
    "--"  : "M",
    "-."  : "N",
    "---" : "O",
    ".--.": "P",
    "--.-": "Q",
    ".-." : "R",
    "..." : "S",
    "_"   : "T",
    "..-" : "U",
    "...-": "V",
    ".--" : "W",
    "-..-": "X",
    "-.--": "Y",
    "--..": "Z"
};

function morseCharToLatinChar(morseChar) {
    return MORSE_CHARACTER_TABLE[morseChar];
}

// Exercise 12
// -----------
// 
// Write a function `morseWordToMorseChars` which takes a string consisting only
// of dots, dashes and spaces and converts it to an array of strings by splitting
// on single spaces.
// 
//     morseWordToMorseChars("-·-· --- -·· ·");
//     // Should return ["-·-·", "---", "-··", "·"]

function morseWordToMorseChars(morseWord) {
    return morseWord.split(/\s/);
}

// Exercise 13
// -----------
// 
// Write a function `morseSentenceToMorseWords` that takes a string of dots,
// dashes and spaces and converts it to an array of strings by splitting on triple
// spaces.
// 
//     morseSentenceToMorseWords("-- --- ·-· ··· ·   -·-· --- -·· ·");
//     // Should return ["-- --- ·-· ··· ·", "-·-· --- -·· ·"]

function morseSentenceToMorseWords(morseSentence) {
    return morseSentence.split(/\s{3}/);
}

// Exercise 14
// -----------
// 
// Wire the functions created in the preceding exercises together to create a
// function which takes a string like that passed to `morseSentenceToMorseWords`,
// converts it to a sentence in Latin characters, and returns it as a string.

function morseToLatin(morse) {
    var words = morseSentenceToMorseWords(morse),
        chars = words.map(morseWordToMorseChars),
        latin = chars.map(function(word) {
            return word.map(morseCharToLatinChar).join("");
        });
    
    return latin.join(" ");
}

// E.g.
// print(morseToLatin("-- --- .-. ... .   -.-. --- -.. ."));
