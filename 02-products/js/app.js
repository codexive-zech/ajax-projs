const productCenterDOM = document.querySelector('.products-center');

// url of the data been fetched from the server
const url = 'https://course-api.com/javascript-store-products';

// the function of the data that is going to be received by the browser from the server
const fetchProduct = async () => {
  // display the loading while data are been fetched from the server
  productCenterDOM.innerHTML = `<div class="loading"></div>`;
  // a try/catch block to make effective use of the url or to reject it
  try {
    // fetching data from a server {returns a promise}
    const response = await fetch(url);
    // checking the fetch promise data to see if the response type is ok or not
    if (!response.ok) {
      // throw the error message when the browser was unable to fetch any data from the server
      throw new Error();
    }
    // convert the fetched text data into a json format
    const data = response.json();
    console.log(data);
  } catch (e) {
    // display the loading while data are been fetched from the server
    productCenterDOM.innerHTML = `<p class="error">There Was an Error</p>`;
  }
};

// invoking the function that is going to be running async in the browser background without refreshing the page
fetchProduct();
