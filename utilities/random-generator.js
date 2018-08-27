const DEFAULT_MINIMUM = 1;
const DEFAULT_MAXIMUM = 1000000;

class RandomGenerator {
    static generate(min = DEFAULT_MINIMUM, max = DEFAULT_MAXIMUM) {
        const number = Math.floor(Math.random() * (max - min) + min);
        return number;
    }
}

module.exports = RandomGenerator;
