import {Utils, Args, Printer} from "./utils/index";

if (Args.args.hasOwnProperty("version")) {
    Printer.printVersion();
} else if (Args.args.hasOwnProperty("help")) {
    Printer.printHelp();
} else {
    Printer.printSplash();
}