const graphQlApiUrl = 'http://localhost:3005/graphql';

const getEmojis = async (query) =>
    await fetch(graphQlApiUrl, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    })
        .then(res => res.json())
        .then(json => console.log(json.data))
        .catch((err) => { console.error(err); });

module.exports = {
    getEmojis,
}