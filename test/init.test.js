var assert = require("chai").assert;
var init = require("../bin/smokebot_init");

const initInstance = new init();
initInstance.readLine(true);

describe("Test INIT Method", ()=>{
    // check default options
    describe("Read Test Default Value",()=>{
        it("The default value must be build/true/true",()=>{
            assert.equal(initInstance.options.dockerfile, true);
            assert.equal(initInstance.options.pm2, true);
            assert.equal(initInstance.options.static, "build");
        })
    });
})