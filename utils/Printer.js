"use strict";

/*
 * @fileOverview The Printer file contains the main Printer class. It gets created as part of the utils index, and uses information collected by it
 *
 * @module utils/printer
 * @exports Printer
 *
 * @see Utils.Utils
 *
 * @requires fs
 * @requires path
 * @requires colors
 */


/**
 * This object will hold any private information contained in the Printer class
 * @type {WeakMap}
 * @private
 */
let privateStuff = new WeakMap();

/**
 * The _args and _env symbols are used as part of the private construction of the Printer class
 * @type {Symbol}
 * @private
 */
let _args = Symbol(), _env = Symbol();

let fs = require("fs"), path = require("path"), colors = require("colors");
const MAX_LINE = 75;

class Printer {

    /**
     * The Printer constructor will be initialized using the utils information repository to store any useful information..
     * @class Utils.Printer
     * @param utils {Utils.Utils} The Utils repository
     * @classdesc The Printer class will use information provided by the utils gateway to print useful information to the user via CLI
     */
    constructor(utils) {
        privateStuff.set(_args, utils.args);
        privateStuff.set(_env, utils.env);
    }

    /**
     * Prints the version of the runtime to the client via CLI
     * @method Utils.Printer#printVersion
     */
    printVersion() {
        console.log(privateStuff.get(_env).RUNTIMEINFO.version);
    }

    /**
     * Prints the ASCII art of the name, and a short description of the system
     * @method Utils.Printer#printDescription
     */
    printDescription() {
        console.log(colors.green(fs.readFileSync(__dirname + "/../data/asciiart", "utf-8")));
        console.log(fs.readFileSync(__dirname + "/../data/description", "utf-8"));
    }

    /**
     * Prints the splash screen of the application (description + appinfo + help)
     * @method Utils.Printer#printSplash
     * @see Utils.Printer#printDescription
     * @see Utils.Printer#printInfo
     * @see Utils.Printer#printHelp
     */
    printSplash() {
        this.printDescription();
        this.printInfo();
        this.printHelp();
    }

    /**
     * Prints the application information (author, version, module name [NPM], repository URL)
     * @method Utils.Printer#printInfo
     */
    printInfo() {
        var info = privateStuff.get(_env).RUNTIMEINFO;
        console.log("\t\t" + colors.red("Author: ") + "\t" + colors.blue(info.author));
        console.log("\t\t" + colors.red("Version: ") + "\t" + colors.blue(info.version));
        console.log("\t\t" + colors.red("Module Name: ") + "\t" + colors.blue(info.name));
        console.log("\t\t" + colors.red("Repository: ") + "\t" + colors.blue(info.repository));
        console.log();
    }

    /**
     * Prints the help for the application (options, how to use them, etc
     * @method Utils.Printer#printHelp
     */
    printHelp() {
        console.log(colors.red.underline("Usage: ") + "\t\t" + colors.yellow.underline("Keep to these guidelines if you want to use YADIBS properly!") + "\n");
        var args = privateStuff.get(_args);
        for (var arg of args) {
            var string = "\t";

            if (arg.hasOwnProperty("single")) string += colors.yellow(arg.single);
            if (arg.hasOwnProperty("single") && arg.hasOwnProperty("double")) string += " / ";
            if (arg.hasOwnProperty("double")) string += colors.yellow(arg.double);

            if (arg.hasOwnProperty("brief")) string += "\t" + colors.underline.bold(arg.brief);
            if (arg.hasOwnProperty("description")) {
                var lines = [], descr = arg.description;
                while (descr.length > MAX_LINE) {
                    lines.push(descr.slice(0, MAX_LINE));
                    descr = descr.substr(MAX_LINE);
                }
                lines.push(descr);

                string += "\n\t\t" + colors.blue(lines.join("\n\t\t"));
            }

            if (arg.hasOwnProperty("usage")) {
                var uses = arg.usage, first = true;
                string += "\n\t\t" + colors.blue.underline("Usage:");
                for (var useindex in uses)
                    if (uses.hasOwnProperty(useindex)) {
                        var use = uses[useindex];

                        if (first) string += "\t";
                        else string += "\n\t\t\t";

                        string += colors.yellow(useindex) + " " + colors.red(use);
                        first = false;
                    }
            }

            console.log(string);
        }
        console.log();
    }

}

export default Printer;