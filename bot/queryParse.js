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

    return flags;
}