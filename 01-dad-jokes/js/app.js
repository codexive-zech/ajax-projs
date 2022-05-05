// Declaring and Defining actions and effects
const btn = document.querySelector('.btn');
const result = document.querySelector('.result');
const get = document.querySelector('.you');

// adding an event on the button to randomly select jokes form server
btn.addEventListener('click', () => {
  // invoking dad joke
  getDadJokes();
});

// Data coming from an external server
const url = 'https://icanhazdadjoke.com/';

// the function of the data that is going to be received by the browser
const getDadJokes = async () => {
  result.textContent = 'Loading ...';
  // implementing try/catch block to escape errors
  try {
    // fetching data from a server {returns a promise}
    const response = await fetch(url, {
      //   providing more information about the request
      headers: {
        Accept: 'application/json',
        'User-Agent': 'learning application',
      },
    });
    // checking to see if the response is not ok, then this error kicks in
    // if (!response.ok) {
    //   throw new Error('There was an Error on the Server.');
    // }
    // converting the text data received from the server into a json format so the browser can read it
    const data = await response.json();
    // dynamically merging the received data joke to result in HTML and displaying it
    result.textContent = data.joke;
  } catch (error) {
    result.textContent = 'There was an Error on the Server';
  }
};
// load fetched data once app load up
getDadJokes();
