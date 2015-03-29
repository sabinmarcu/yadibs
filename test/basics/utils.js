"use strict";
const expect = require("chai").expect, path = require("path");

import {Utils} from "../../utils/index";
describe("Utils", function() {
    describe("#printEnvironment()", function() {
        it("should print a nice list of computed things", function() {
            //Utils.printEnvironment();
        });
    });
    describe("#printArguments()", function() {
        it("should print a nice list of pre-defined arguments", function() {
            //Utils.printArguments();
        });
    });
    describe("#getEnvironment()", function() {
        var env = Utils.env;
        it("should have the proper Work Directory", function() {
            expect(env.WORKDIR).to.equal(process.cwd());
        });
        it("should have the proper Runtime Directory", function() {
            expect(env.RUNTIMEDIR).to.equal(path.resolve(__dirname + "/../../"));
        });
    });
});