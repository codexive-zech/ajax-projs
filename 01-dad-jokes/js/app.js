// Declaring and Defining actions and effects
const btn = document.querySelector('.btn');
const result = document.querySelector('.result');

// adding an event on the button to randomly select jokes form server
btn.addEventListener('click', () => {
  // invoking dad joke
  getDadJokes();
});

// Data coming from an external server
const url = 'https://icanhazdadjoke.com/';

// the function of the data that is going to be received by the browser
const getDadJokes = async () => {
  // fetching data from a server {returns a promise}
  const response = await fetch(url, {
    //   providing more information about the request
    headers: {
      Accept: 'application/json',
      'User-Agent': 'learning application',
    },
  });
  // converting the text data received from the server into a json format so the browser can read it
  const data = await response.json();
  // dynamically merging the received data joke to result in HTML and displaying it
  result.textContent = data.joke;
};
// load fetched data once app load up
getDadJokes();
