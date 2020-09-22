const graphQlApiUrl = 'http://localhost:3005/graphql';

export const graphQlPost = async (query) => {
    const res = await fetch(graphQlApiUrl, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    })
        .then(res => res.json())
        .then(json => {
            console.log(`response from ${query}: `, json.data)
            return json.data;
        })
        .catch((err) => { console.error(err); });
    return res;
}

export const argsJsonStringify = (argsObject) => {
    return argsObject
        ? JSON.stringify(argsObject)
            // removes quotes from keys
            .replace(/"([^"]+)":/g, '$1:')
            .replace("{", "(")
            .replace("}", ")")
        : "";
}

export const getEmojis = async (argsObject = null) => {
    const args = argsJsonStringify(argsObject);
    // {getEmojis(group: "Smileys & Emotion"){emoji}}
    const query = `
        {
            getEmojis${args}{
                emoji
            }
        } 
    `;
    const emojis = await fetch(graphQlApiUrl, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    })
        .then(res => res.json())
        .then(json => {
            console.log(`response from ${query}: `, json.data.getEmojis)
            return json.data.getEmojis;
        })
        .catch((err) => { console.error(err); });
    return emojis;
}

export const getBoards = async (query) => {
    const boards = await fetch(graphQlApiUrl, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    })
        .then(res => res.json())
        .then(json => {
            console.log(`response from ${query}: `, json.data.getBoards)
            return json.data.getBoards;
        })
        .catch((err) => { console.error(err); });
    return boards;
}

const createBoard = async (mutation) => {
    console.log("createBoard -> mutation", mutation);
    const board = await fetch(graphQlApiUrl, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: mutation }),
    })
        .then(res => res.json())
        .then(json => {
            console.log(`response from ${mutation}: `, json.data.getEmojis)
            return json.data.getEmojis;
        })
        .catch((err) => { console.error(err); });
    ;
    return board;
}

const convertEmojiObjArrayToMutation = (array) =>
    // the beginning of query
    'mutation{createBoard(emojis: ["'
    // create array of emoji strings
    + array.map(x => x.emoji)
        // take only first 40 elements
        .slice(0, 40)
        // create a string with elements
        .join('","')
    + '"]){emojis}}';