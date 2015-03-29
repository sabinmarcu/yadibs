"use strict";

let privateStuff = new WeakMap();
let _env = Symbol(), _args = Symbol();

let path = require("path");

root.objectEntries = function(obj) {
    let index = 0;

    let propKeys = Reflect.ownKeys(obj);

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            if (index < propKeys.length) {
                let key = propKeys[index];
                index++;
                return { value: [key, obj[key]] };
            } else {
                return { done: true };
            }
        }
    };
};

class Utils {

    constructor() {
        privateStuff.set(_env, {
            WORKDIR: process.cwd(),
            RUNTIMEDIR: path.resolve(__dirname + "/../"),
            RUNTIMEINFO: require(__dirname + "/../package.json")
        });
        privateStuff.set(_args,require(__dirname + "/../data/arguments.json"));
    }
    get args() {
        var iterator = function*() {
            let args = privateStuff.get(_args);
            for (var index in args)
                if (args.hasOwnProperty(index))
                    yield args[index];
        };
        return new iterator();
    }

    get env() {
        return privateStuff.get(_env);
    }

    set env(values) {
        var e = this.env;
        for (let [key, value] of objectEntries(values)) {
            e[key] = value;
        }
    }

}

var utils = new Utils(), args = new (require(__dirname + "/args.js"))(utils), printer = new (require(__dirname + "/printer.js"))(utils);

export {utils as Utils, args as Args, printer as Printer};
export default utils;