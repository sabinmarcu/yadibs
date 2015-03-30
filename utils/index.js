"use strict";

/**
 * The Utils namespace collects all utility classes (CLI, Wrappers, Bootstraps, etc)
 * @namespace Utils
 */

/*
 * @fileOverview Acts as a gateway and information repository for the utils. It will bundle all modules and store environment arguments.
 *
 * @module utils/index
 * @requires utils/args
 * @requires utils/printer
 * @requires path
 */

let privateStuff = new WeakMap();
let _env = Symbol(), _args = Symbol();

let path = require("path");

/**
 * The objectEntries method will make an object iterable by Babel / ES6 for...of loops.
 * @param obj The object to be made iterable
 */
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

    /**
     * The constructor will simply build the environment and collect any arguments to be parsed
     * @class Utils.Utils
     * @classdesc The Utils class is the main gateway for information the runtime needs. At the same time, it is the router on which other utils class are based upon.
     * @memberof Utils
     * @example
     * var utils = new Utils();
     *
     * console.log(utils.args);
     * console.log(utils.env);
     *
     * (root?root:window).utils = utils;
     */
    constructor() {
        /**
         * @member {Object} Utils.Utils#_env The Environment variables to be stored for a given runtime
         */
        privateStuff.set(_env, {
            WORKDIR: process.cwd(),
            RUNTIMEDIR: path.resolve(__dirname + "/../"),
            RUNTIMEINFO: require(__dirname + "/../package.json")
        });
        /**
         * @member {Symbol.iterable} Utils.Utils#_args The arguments object that will keep the arguments schema (descriptions, pattern to extract)
         */
        privateStuff.set(_args,require(__dirname + "/../data/arguments.json"));
    }

    /**
     * Getter to return an iterable object for the [Argument Object]{@link Utils.Utils#_args}
     * @method Utils.Utils#GET args
     * @returns {Symbol.iterable}
     * @see Utils.Utils#_args
     * @example console.log(Utils.args);
     */
    get args() {
        var iterator = function*() {
            let args = privateStuff.get(_args);
            for (var index in args)
                if (args.hasOwnProperty(index))
                    yield args[index];
        };
        return new iterator();
    }

    /**
     * Getter to return the [Environment Object]{@link Utils.Utils#_env}
     * @method Utils.Utils#GET env
     * @returns {Object}
     * @see Utils.Utils#_env
     * @example console.log(Utils.env);
     */
    get env() {
        return privateStuff.get(_env);
    }

    /**
     * Setter to update the [Environment Object]{@link Utils.Utils#_env}
     * @method Utils.Utils#SET env
     * @param values {Object} An object to be combined with the existing [Environment Object]{@link Utils.Utils#_env}
     * @see Utils.Utils#_env
     * @example Utils.env = {PORT: 8000};
     */
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