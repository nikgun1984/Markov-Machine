/** Textual markov chain generator */

class MarkovMachine { /** build markov machine; read in text.*/

    constructor(text) {
        let words = text.split(/[ \r\n]+/);
        this.words = words.filter(c => c !== "");
        this.makeChains();
    }

    /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

    makeChains() { // TODO
        const obj = {};
        for (let i = 0; i < this.words.length; i++) {
            if (this.words[i + 1]) {
                if (this.words[i] in obj) {
                    obj[this.words[i]].push(this.words[i + 1]);
                } else {
                    const arr = [];
                    arr.push(this.words[i + 1]);
                    obj[this.words[i]] = arr;
                }
            } else {
                if (this.words[i] in obj) {
                    obj[this.words[i]].push(null);
                } else {
                    obj[this.words[i]] = [].push(null);
                }
            }
        }
        return obj;
    }


    /** return random text from chains */

    makeText(numWords = 100) {
        // STEPS
        // Get object with all values and respectful arrays
        const obj = this.makeChains();
        // convert keys of obj into array to get an access to its strings
        const keysObj = Object.keys(obj);

        // gen random index to extract for our keysObj array
        const genNum = Math.floor(Math.random() * (keysObj.length));
        // get the value from array
        let startingVal = keysObj[genNum];
        const res = [];
        res.push(startingVal);

        for (let i = 0; i < numWords - 1; i++) {
            const arr = obj[startingVal];
            const randInd = Math.floor(Math.random() * (arr.length));
            startingVal = arr[randInd];

            if (startingVal === null) {
                break;
            }
            res.push(startingVal);
        }
        return res.join(' ')
    }
}

module.exports = {
    MarkovMachine: MarkovMachine
};
