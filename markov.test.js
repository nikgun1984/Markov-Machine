const {MarkovMachine} = require('./markov');

describe("testing MarkovMachine class", function () {
    let content;
    let machine;
    beforeEach(function () {
        content = "the cat in the hat is in the hat";
        machine = new MarkovMachine(content);
    });

    test("test makeChains method", function () {
        expect(Object.keys(machine.makeChains())).toContain('cat');
        expect(machine.makeChains()["the"].length).toEqual(3);
    })
})
