const fs = require('fs');
const yargs = require('yargs/yargs');

const { hideBin } = require('yargs/helpers');

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

var argv = yargs(hideBin(process.argv))
    .check((argv) => {
        const filePath = argv._
        if (filePath.length == 1) {
            return true
        } else {
            throw new Error("Please, provide a filename to save game logs")
        }
    })
    .parse();

startGame(fileName = argv._[0]);

function startGame(fileName) {

    const writerSrt = fs.createWriteStream(`${fileName}.txt`);

    var question = 'Орёл (1) или решка (2)?\n';

    var recursiveAsyncReadLine = function () {

        var num = Math.floor(Math.random() * 2) + 1

        rl.question(question, (answer) => {
            if (answer == 1 || answer == 2) {
                var result = num == answer ? 'Верно' : 'Неверно';

                console.log(`${result}`);

                var obj = { result: num == answer, hidden: num };

                writerSrt.write(JSON.stringify(obj) + "\n", 'UTF8');

                recursiveAsyncReadLine();
            } else {
                console.log('Выход из игры...');
                rl.close();
            }
        });
    };

    recursiveAsyncReadLine();
}