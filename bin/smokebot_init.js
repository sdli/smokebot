const eventEmitter = require("events");
const readline = require('readline');
require('colors');

/**
 * [to do]：template.js // PM2 and dockerfile templates
 * [to do]：write.js // merge all the options and templates
 */

/**
 * The `init` method
 * 
 */
class Init extends eventEmitter {
    constructor() {
        super();

        // record the options
        this.options = {};

        // several steps of init command
        this.tips = [
            {
                step: "static",
                tip: "STEP 1 : SELECT your static file folder [ default folder: `build`]:",
                default: "build"
            },
            {
                step: "pm2",
                tip: "STEP 2 : CHOOSE PM2 as your server moniter? [Y/N]",
                default: true
            },
            {
                step: "dockerfile",
                tip: `STEP3: Add a dockerfile on your folder? [Y/N]`,
                default: true
            }
        ];

        // manage events
        this.eventsDic = {
            initStart: "initStart",
            nextStep: "stepChange",
            initEnd: "initEnd"
        }
    }

    setOption(step, answer){
        this.options[step] = answer;
    }

    /**
     * use readline to 
     * @param {*} i the step index 
     * @param {*} rl readline instance
     */
    showTips(i, rl){
        const thisStep = this.tips[i].step
            , thisTip = this.tips[i].tip
            , thisDefault = this.tips[i].default;

        if(!rl){

            i++;
            // if no rl detected
            if(i< this.tips.length){
                this.showTips(i,null);
            }
            this.setOption(thisStep,thisDefault);
        }
        else{

            // show question on monitor and wait userinput
            rl.question(thisStep + " " + thisTip + " ", (answer) => {

                // check if the default values of each step
                if (answer) {
                    console.log(("[saved]" + thisStep + ":" + answer).green);
                    this.setOption(thisStep, answer);
                } else {
                    console.log(("[saved]" + thisStep + ":" + thisDefault).green);
                    this.setOption(thisStep, thisDefault);
                }

                i++;

                // check if read the last tip
                if (i < this.tips.length) {
                    this.emit(this.eventsDic.nextStep);
                    this.showTips(i, rl);
                } else {
                    console.log("[Finished]".green);
                    this.emit(this.eventsDic.initEnd);
                    rl.close();
                }
            })
        }
    }

    /**
     * set readline interface 
     * and apply shotip
     */
    readLine(test){
        this.emit(this.eventsDic.initStart);
        let rl;
        
        // check if test mode
        if(!test){
            rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
        }

        // start tips from index 0
        this.showTips(0, rl);
    }
}

module.exports = Init;