/**
 * Test checksum of personal number
 * @param {string} personnr 
 * @returns {Boolean}
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

    accumulator = 10 - (accumulator % 10)

    if (accumulator != personnr.charAt(9)) {
        throw 'checksumException';
    }
}

/**
 * Test if personal number is null or empty string
 * @param {string} number 
 * @returns {Boolean}
 */
function notNullOrEmpty(number) {
    if (!number) {
        throw 'nullException';
    }
}

// Currently redundant function as notNullOrEmpty catches empty strings
// /**
//  * Test if personal number is empty string
//  * @param {string} personnr 
//  * @returns {Boolean}
//  */
// function notEmpty(number) {
//     if (number === '') {
//         throw 'emptyException';
//     }
// }

/**
 * Tests that shortened personal number is of correct length
 * @param {string} number 
 * @returns {Boolean}
 */
function rightLength(number) {
    if (number.length !== 10) {
        throw 'lengthException';
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
    try {
        notNullOrEmpty(inputNumber);
    } catch (error) {
        console.log(error, inputNumber);
        return false
    }

    personnr = removeNonNumerics(inputNumber);
    personnr = cropToRightSize(personnr);

    try {
        // Add more tests here
        rightLength(personnr);
        checksum(personnr);
    } catch (error) {
        console.log(error, inputNumber, personnr);
        return false;
    }
    return true;
}


// let personnr = '197802022389';
// let personnr = '197802022389a';
// let personnr;
// let personnr = null;
// let personnr = '';
// let personnr = '123'
// let personnr = '197802022388';


console.log(isPersonalNumber(personnr));
