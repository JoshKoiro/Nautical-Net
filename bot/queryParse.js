/**
 * Removes any word that starts with -- from the discord user entered query.
 *
 * @param {string} userQuery - The user query to be processed.
 * @return {string} The processed query without words starting with --.
 */
export const getQuery = (userQuery) => {
    //write an expression that removes any word that starts with --
    let query = userQuery.replace(/--(\w+)(?:--(\d+))?/g, '');
    return query;
}

/**
 * Generates an array of flags and their associated values from a user query.
 *
 * @param {string} userQuery - the user query to extract flags from
 * @return {object} - an object containing the extracted flags and the image quantity
 */
export const getFlags = (userQuery) => {
    let flags = [];
    let regex = /--(\w+)(?:--(\d+))?/g;

    for (let flag of userQuery.matchAll(regex)) {
        flags.push(flag[1]);
        if (flag[2]) {
            matches.push(flag[2]);
        }
    }

    return {
        flags: flags,
        imgQty: getImgQty(flags)
    }
}

/**
 * Checks if the given flags array has a length greater than zero.
 *
 * @param {Array} flags - The array of flags to be checked.
 * @return {boolean} Returns true if the flags array has a length greater than zero, otherwise returns false.
 */
const checkFlags = (flags) => {
    return flags.length > 0
}

/**
 * Calculates the number of images to be returned based on the provided flags.
 *
 * @param {Array} flags - An array of flags that determine the number of images to be returned.
 * @return {number} The calculated number of images to be returned.
 */
const getImgQty = (flags) => {
    let numResults;
    if(!checkFlags(flags)) {
        return 4
    }
    flags.map((flag) => {
        if (flag.match(/\d+/)) {
          numResults = flag;
          if (numResults > 10) {
            numResults = 10;
          }

        } else {

        // defaults to 4 images returned if no numerical flags are provided
          numResults = 4;
        }
      })
      return numResults
}