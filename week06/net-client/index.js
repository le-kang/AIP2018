const request = require('request');
const fetch = require('cross-fetch');


const getURI = 'http://localhost:3000/slow';
const postURI = 'http://localhost:3000/show';

// Callback Christmas trees
request.get(getURI, function (error, response, body) {
    console.log(body);
    request.post(postURI, {json: JSON.parse(body)}, function (error, response, body) {
        console.log('Sent!');
    });
});

// Promises
fetch(getURI)
    .then(response => response.json())
    .then(json => fetch(postURI, {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(json)
    }))
    .then(() => console.log('Sent!'));

// Promises using async/await syntactic sugar
async function doFetch() {
    const response = await fetch(getURI);
    const json = await response.json();
    await fetch(postURI, {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(json)
    });
    console.log('Sent!');
}
doFetch();

console.log('End of index.js reached');