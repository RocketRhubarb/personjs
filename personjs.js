/**
 * Test checksum of personal number
 * @param {string} personnr 
 */
function checksum(personnr) {
    var mult;
    var tmp;
    var accumulator = 0;

    for (index = 0; index < personnr.length - 1; index++) {
        mult = 2 - index % 2;
        tmp = personnr.charAt(index) * mult;
        tmp = Math.floor(tmp / 10) + tmp % 10;
        accumulator = accumulator + tmp;
    }

    accumulator = 10 - (accumulator % 10);

    if (accumulator != personnr.charAt(9)) {
        throw 'checksumException: checksum does not match last digit.';
    }
}

/**
 * Test if personal number is null or empty string
 * @param {string} number 
 */
function notNullOrEmpty(number) {
    if (!number) {
        throw 'nullException: number is undefined, null, or empty.';
    }
}

// Currently redundant function as notNullOrEmpty catches empty strings
// /**
//  * Test if personal number is empty string
//  * @param {string} personnr 
//  */
// function notEmpty(number) {
//     if (number === '') {
//         throw 'emptyException';
//     }
// }

/**
 * Tests that shortened personal number is of correct length
 * @param {string} number 
 */
function rightLength(number) {
    if (number.length !== 10) {
        throw 'lengthException: number is not of correct length.';
    }
}

/**
 * Crop personal numbers of length 12 to 10 digits
 * @param {string} number 
 * @returns {string}
 */
function cropToRightSize(number) {
    if (number.length === 12) {
        return number.substring(2, 12);
    } else {
        return number;
    }
}

/**
 * Input santitation
 * @param {string} personnr 
 * @returns {string}
 */
function removeNonNumerics(personnr) {

    return personnr.replace(/\D/g, '');
}

/**
 * Validates personal numbers
 * @param {string} personnr 
 * @returns {Boolean}
 */
function isPersonalNumber(inputNumber) {
    // error logger
    var fs = require('fs');
    const util = require('util');
    var log_file_err = fs.createWriteStream(__dirname + '/error.log', { flags: 'a' });

    // test if undefined, null, or empty
    try {
        notNullOrEmpty(inputNumber);
    } catch (error) {
        let date = new Date(Date.now());
        log_file_err.write(util.format(`${date.toGMTString()} - ${error} - Raw input: ${inputNumber}`) + '\n');
        return false;
    }

    // input sanitation
    personnr = removeNonNumerics(inputNumber);
    personnr = cropToRightSize(personnr);

    // logical error tests
    try {
        // Add more tests here
        rightLength(personnr);
        checksum(personnr);
    } catch (error) {
        let date = new Date(Date.now());
        log_file_err.write(util.format(`${date.toGMTString()} - ${error} - Raw input: ${inputNumber}. - Interprated as: ${personnr}`) + '\n');
        return false;
    }
    return true;
}

if (require.main === module) {
    let number = process.argv[2];
    if (isPersonalNumber(process.argv[2])) {
        console.log(`${number} is valid.`);
    } else {
        console.log(`${number} is invalid.`);
    }
}