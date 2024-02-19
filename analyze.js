const events = require('events');
const readline = require('node:readline')
const fs = require('fs')

const yargs = require('yargs/yargs')

const { hideBin } = require('yargs/helpers');

var argv = yargs(hideBin(process.argv))
    .check((argv) => {
        const filePath = argv._
        if (filePath.length == 1) {
            return true
        } else {
            throw new Error("Please, provide a filepath to analize game logs");
        }
    })
    .parse()

processLineByLine(argv._[0])

async function processLineByLine(filePath) {

    const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity
    });

    var total = 0;
    var guessed = 0;

    rl.on('line', (line) => {
        const plain = JSON.parse(line);
        total += 1
        if (plain.result) guessed += 1
    });

    await events.once(rl, 'close');

    const guessedPercent = 100 * guessed / total

    console.log(`Общее количество партий: ${total}`);
    console.log(`Выиграно/проиграно: ${guessed}/${total - guessed}`);
    console.log(`Выиграно/проиграно (%): ${guessedPercent}/${100 - guessedPercent}`);
}