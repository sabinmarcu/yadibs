/**
 * @overview The Runtime simply bootstraps the whole application, making use of the [Utils]{@link Utils} classes,
 * and many others.
 *
 * @module Runtime
 */

import {Utils, Args, Printer} from "./index";

if (Args.args.hasOwnProperty("version")) {
    Printer.printVersion();
} else if (Args.args.hasOwnProperty("help")) {
    Printer.printHelp();
} else {
    Printer.printSplash();
}