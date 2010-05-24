// Exercise 1
// ----------
// 
// Create an object with a method `hello` that returns the string "Hello, world".

helloObject = {
    hello: function() {
        return "Hello, world";
    }
};

// Exercise 2
// ----------
// 
// Write a function `detectType` which accepts one argument and prints the type of
// that argument if it is a primitive or, if it is an object, which of
// JavaScript's built-in objects it is an instance of.

function detectType(value) {
    var builtIns = [Date, Function, RegExp, Number, String, Boolean, Object],
        i, len;
    
    if (typeof value === "object" || typeof value === "function") {
        for (i = 0, len = builtIns.length; i < len; i++) {
            if (value instanceof builtIns[i]) {
                return builtIns[i];
            }
        }
    }
    
    return typeof value;
}

// Exercise 3
// ----------
// 
// Define a function `buildObject` that accepts a constructor, creates a new
// instance of that constructor, and passes any additional arguments to the
// constructor as an array.

function buildObject(constructor) {
    var args = Array.prototype.slice.apply(arguments, 1);
    
    return new constructor(args);
}

// Exercise 4
// ----------
// 
// Create a function `extendObject` that extends one object with another---that
// is, copies the properties of the second object onto the first---and then
// returns the extended object.

function extendObject(subject, extension) {
    var prop;
    
    for (prop in extension) {
        if (!subject[prop]) {
            subject[prop] = extension[prop];
        }
    }
    
    return subject;
}

// Exercise 5
// ----------
// 
// Make a constructor `Stack` that creates objects with two methods, `push` and
// `pop`. The `push` method should add an object to end of the stack, the `pop`
// method should remove the last object on the stack. Calling `pop` on an empty
// stack should return `null`. The stack should be initially empty.

function Stack() {
    this._store = [];
}

Stack.prototype.push = function(elem) {
    this._store.push(elem);
};

Stack.prototype.pop = function() {
    return this._store.length < 1 ? null : this._store.pop();
};

// Exercise 6
// ----------
// 
// Modify the `Stack` constructor so that it can accept an array of initial
// elements.

function Stack2(initial) {
    var i, len;
    
    this._store = [];
    
    if (typeof initial === "object" && initial instanceof Array) {
        for (i = 0, len = initial.length; i < len; i++) {
            this._store[i] = initial[i];
        }
    }
}

Stack2.prototype.push = function(elem) {
    this._store.push(elem);
};

Stack2.prototype.pop = function() {
    return this._store.length < 1 ? null : this._store.pop();
};

// Exercise 7
// ----------
// 
// Create a `Queue` object that functions similarly to `Stack`: it should have a
// `shift` method that removes the first object in the queue, and a `push` method
// that adds an object to the end of the queue. Like `Stack` the constructor
// should accept an array to define its initial state.

function Queue(initial) {
    var i, len;
    
    this._store = [];
    
    if (typeof initial === "object" && initial instanceof Array) {
        for (i = 0, len = initial.length; i < len; i++) {
            this._store.push(initial[i]);
        }
    }
}

Queue.prototype.push = function(elem) {
    this._store.push(elem);
};

Queue.prototype.shift = function() {
    return this._store.length < 1 ? null : this._store.shift();
};

// Alternative implementation of a queue that doesn't use an array as an
// internal store, but instead adds elements of the queue directly as
// properties with numeric indices.

function Queue2(initial) {
    var i, len;
    
    this.end = -1;
    
    if (typeof initial === "object" && initial instanceof Array) {
        for (i = 0, len = initial.length; i < len; i++) {
            this.push(initial[i]);
        }
    }
}

Queue2.prototype.push = function(elem) {
    this.end += 1;
    this[this.end] = elem;
};

Queue2.prototype.shift = function() {
    if (this.end < 0) return null;
    
    var shifted = this[0];
    this._shiftLeft(1);
    return shifted;
};

Queue2.prototype._shiftLeft = function(n) {
    var i;
    
    if (this.end < 0) return;
    
    for (i = 0; i <= this.end; i++) {
        if (i <= this.end - n) {
            this[i] = this[i + n];
        } else {
            delete this[i];
        }
    }
    
    this.end -= n;
};
