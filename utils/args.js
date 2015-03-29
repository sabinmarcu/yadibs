"use strict";

let privateStuff = new WeakMap();
let _args = Symbol();

class Args {
    constructor(utils) {
        let args = (new (require("cliparser"))(process.argv));

        if (typeof(utils.args) !== "undefined" && utils.args !== null) {
            let linkedSet = {};
            for (var arg of utils.args) {
                if (arg.hasOwnProperty("single") && arg.hasOwnProperty("double")) {
                    linkedSet[arg.single] = arg.double;
                }
            }
            args.link(linkedSet);
        }

        privateStuff.set(_args, args);
    }

    get args() {
        return privateStuff.get(_args).booleanify().doubleDashArgs;
    }
}

export default Args;