/** Command-line tool to generate Markov text. */
// node makeText.js file eggs.txt
// node makeText.js url http://www.gutenberg.org/files/11/11-0.txt

const fs = require('fs');
const axios = require('axios');

const {MarkovMachine} = require('./markov');

function makeText(data) {
    const machine = new MarkovMachine(data);
    const text = machine.makeText();
    console.log(text);
}

function getText(path) {
    if (!(process.argv[3].includes('txt'))) {
        console.log(`can’t read file or URL`);
        return;
    }
    if (process.argv[2] == 'file') {
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) { // handle the error
                console.log(`Error reading ${path}:\n\t${err}`);
                // kill the process and tell process it errored
                process.exit(1);
            }
            console.log(`... generated text from file '${path}' ...`);
            makeText(data)
        })
    } else {
        axios.get(path).then(result => {
            content = result.data;
            console.log(`... generated text from that url ${path} ...`);
            makeText(content);
        }).catch(err => {
            `Error reading link "${path}":\n\t${err}`
        });
    }
}

getText(process.argv[3])
