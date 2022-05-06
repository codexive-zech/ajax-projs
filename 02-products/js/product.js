const productContainer = document.querySelector('.product');
const url = 'https://course-api.com/javascript-store-single-product';

// url of the data been fetched from the server
const fetchProduct = async () => {
  // display the loading while data are been fetched from the server
  productContainer.innerHTML = `<h4 class="product-loading">Loading ...</h4>`;
  // a try/catch block to make effective use of the url or to reject it
  try {
    //   used to get a particular id parameter clicked (get value of the id)
    const param = new URLSearchParams(window.location.search);
    // get the id property from the data in the server
    const id = param.get('id');
    // fetching a specific product based on it id as the unique parameter data from a server {returns a promise}
    const response = await fetch(`${url}?id=${id}`);
    // checking the fetch promise data to see if the response type is ok or not
    if (!response.ok) {
      // throw the error message when the browser was unable to fetch any data from the server
      throw new Error();
    }
    // convert the fetched text data into a json format
    const data = await response.json();
    // returned converted list of array data from the server
    return data;
  } catch (error) {
    // display the loading while data are been fetched from the server
    productContainer.innerHTML = `<p class="error">There Was an Error</p>`;
  }
};

// the function of the data that is going to be received by the browser from the server
const displayProduct = (product) => {
  // Destructuring the iterated property from the server in other to be able to access it.
  // Note: the exact property name in the server need to be the key for the destructed object if necessary
  const {
    company,
    colors,
    name: title,
    image,
    description,
    price,
  } = product.fields;
  const { url: img } = image[0];
  //   dynamically displaying the Product name
  document.title = `${title.toUpperCase()} - Product`;
  // dynamically displaying single product property retrieved from the server and inserting it into the product container

  //   iterate over the colors from the destructured product property
  const colorList = colors
    .map((color) => {
      // dynamically displaying the colors in the color property from the server
      return `<span class="product-color" style="background-color: ${color}"></span>`;
    })
    .join('');
  productContainer.innerHTML = `<div class="product-wrapper">
        <img src="${img}" class="img" alt="" />
        <div class="product-info">
          <h3>${title}</h3>
          <h5>${company}</h5>
          <span>$${price / 100}</span>
          <div class="colors">
            ${colorList}
          </div>
          <p>
            ${description}
          </p>
          <button class="btn">Add To Cart</button>
        </div>
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
