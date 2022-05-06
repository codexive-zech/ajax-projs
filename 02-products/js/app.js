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
    // returned converted list of array data from the server
    return data;
  } catch (e) {
    // display the loading while data are been fetched from the server
    productCenterDOM.innerHTML = `<p class="error">There Was an Error</p>`;
  }
};

// a function displaying the product
const displayProduct = (products) => {
  // creating a product list func expression that will iterate over the products data on the server
  const productList = products
    .map((product) => {
      // Destructuring the iterated property from the server in other to be able to access it.
      const { id } = product;
      const { name: title, price } = product.fields;
      const { url: img } = product.fields.image[0];
      // formatting the price because it's straight number on the server and not decimal points
      const formatPrice = price / 100;
      // dynamically displaying each single product property retrieved from the server and inserting it into the product container
      return `
          <a href="product.html" class="single-product">
            <img src="${img}" class="single-product-img img" alt="${title}" />
            <footer>
              <h5 class="name">${title}</h5>
              <span class="price">${formatPrice}</span>
            </footer>
          </a>
          `;
    })
    .join('');
  // dynamically displaying the {return dynamic value} all products into the product center section which house both product container which holds the returned product information
  productCenterDOM.innerHTML = `<div class="products-container">
      ${productList}
    </div>`;
};

// a function that fetch product and display product return a promise
const start = async () => {
  // fetch a product func that is going to be running async in the browser background without refreshing the page
  const data = await fetchProduct();
  // display the product data
  displayProduct(data);
};

// invoking the start function
start();
