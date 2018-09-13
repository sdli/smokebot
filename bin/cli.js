#!/usr/bin/env node

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Steven Leo @ lisd199001@gmail.com
*/

(
    function(){
        const argvs = [
            "init", // use -f to regenerate all files
            "build", // build docker images
            "start", // run int pm2 mode
            "run", // run in docker mode
            "config", // reinit static files and docker settings,
            "remove" // remove all files generated by smokebot
        ];
        
        // get first process argv and config arg
        const mainArgv = process.argv.find((val)=>argvs.some(v=>v===val));

        const usage = `smokebot ${require("../package.json").version}

        Usage: 
            init [options] // initiate your project
            build          // build your project
            start          // start your nodejs server
            run            // run by dockerfile
            config         // reconfig your smoke.bot.js file
            remove         // remove all files created by smokebot

        For more information, see https://github.com/sdli/smokebot`;


        if(mainArgv){

            // use `yargs` to detect arguments
            const yargs = require("yargs").usage(usage);
            yargs.parse(process.argv.slice(2), (err, argv, output) => {

                // 
                if(err && output){
                    console.error(output);
                    process.exitCode = 1;
                    return;
                }

                switch (argv._[0]){
                    case "start":
                        console.log("启动服务。");
                        break;

                    // initiate the bot options from stdin
                    // you can seach more in file `./smokebot_init.js`
                    case "init":
                        const init = require("./smokebot_init");
                        const initInstance = new init();
                        initInstance.readLine();
                        break;
                    case "default":
                        console.error(output);
                }

            });
        }else{
            console.error(usage);
            process.exitCode = 1;
            return;
        }
    }
)();

