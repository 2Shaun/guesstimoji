export const graphQlApiUrl =
    (process.env.REACT_APP_PROTOCOL as string) +
    process.env.REACT_APP_HOST +
    ':' +
    process.env.REACT_APP_GRAPH_QL_API_PORT +
    '/graphQl';

export const graphQlPost = async (query: string) => {
    const res = await fetch(graphQlApiUrl as RequestInfo, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });
    const json = await res.json();
    return json.data;
};

export const argsJsonStringify = (argsObject: any): string =>
    argsObject
        ? JSON.stringify(argsObject)
              .replace(/"([^"]+)":/g, '$1:') // removes quotes from keys
              .replace('{', '(')
              .replace('}', ')')
        : '';

export const fetchGraphQLData = async (query: string) => {
    const res = await fetch(graphQlApiUrl as RequestInfo, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });
    const json = await res.json();
    return json.data;
};

type GetBoards = (query: string) => Promise<Board[]>;
type GetEmojis = (argsObject: ArgsObject) => Promise<Emoji[]>;

type ArgsObject = {
    group: string;
};

export const getEmojis: GetEmojis = async (argsObject: ArgsObject) => {
    const args = argsJsonStringify(argsObject);
    const query = `
        {
            getEmojis${args}{
                emoji
            }
        } 
    `;
    const promiseResult = await fetchGraphQLData(query);
    return promiseResult?.getEmojis;
};

export const getBoards: GetBoards = async (query) => {
    const boards = await fetch(graphQlApiUrl as RequestInfo, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });
    const json = await boards.json();
    return json.data.getBoards;
};

const createBoard = async (mutation: any) => {
    const board = await fetch(graphQlApiUrl as RequestInfo, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: mutation }),
    });
    const json = await board.json();
    return json.data.getEmojis;
};

export const addGetEmojiResponseAsBoard = (array: any) =>
    // the beginning of query
    'mutation{createBoard(emojis: ["' +
    // create array of emoji strings
    array
        .map((x: any) => x.emoji)
        // take only first 40 elements
        .slice(80, 120)
        // create a string with elements
        .join('","') +
    '"]){emojis}}';
