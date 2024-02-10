const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

var num =  Math.floor(Math.random() * 101);

var question = 'Загадано число в диапазоне от 0 до 100\n'

var recursiveAsyncReadLine = function () {
    rl.question(question, (answer) => {
        switch (true) {
           case num == answer:
                console.log(`Отгадано число ${num}`)
                rl.close();
                break;
            case num > answer:
                question = `Больше\n`
                recursiveAsyncReadLine()
                break;
            case num < answer:
                question = `Меньше\n`
                recursiveAsyncReadLine()
                break;
        }
      });
  };

  recursiveAsyncReadLine()