const http = require('http');
const yargs = require('yargs/yargs');

const { hideBin } = require('yargs/helpers');

var argv = yargs(hideBin(process.argv))
    .check((argv) => {
        const args = argv._
        if (args.length == 1) {
            return true
        } else {
            throw new Error("Пожалуйста, укажите название города, для которого требуется вывести прогноз.")
        }
    })
    .parse();

const q = argv._[0]

const key = process.env.weatherAPIkey;

const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${q}&aqi=no`;

http.get(url, (res) => {
    const {statusCode, statusMessage} = res
    
    if (statusCode !== 200) {
        console.log(`statusCode: ${statusCode}: ${statusMessage}`)
        // https://stackoverflow.com/questions/23068327/node-js-after-get-request-script-does-not-return-to-console
        return
    }

    res.setEncoding('utf8')
    let rawData = ''
    res.on('data', (chunk) => rawData += chunk)
    res.on('end', () => {
        let parseData = JSON.parse(rawData)
        console.log(parseData)
    })
}).on('error', (err) => {
    console.error(err)
})