export const getQuery = (userQuery) => {
    //write an expression that removes any word that starts with --
    let query = userQuery.replace(/--(\w+)(?:--(\d+))?/g, '');
    return query;
}

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

const checkFlags = (flags) => {
    return flags.length > 0
}

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