const productsList = document.getElementById("products-list");
const allOption = document.getElementById("all");
const menOption = document.getElementById("men");
const womenOption = document.getElementById("women");
const jewelleryOption = document.getElementById("jewellery");
const electronicsOption = document.getElementById("electronics");

// wby default we ahve to fetch all the data
fetchAll();
// To fetch all when selected All option
allOption.addEventListener("click", fetchAll);

function fetchAll() {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      clearProductsList();
      render(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// function to fetch data based on selected category
function fetchDatabyCategory(category) {
  const apiURL = `https://fakestoreapi.com/products/category/${encodeURIComponent(
    category
  )}`;
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      clearProductsList();
      render(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
// when men option selected
menOption.addEventListener("click", function () {
  fetchDatabyCategory("men's clothing");
});
// when women option selected
womenOption.addEventListener("click", function () {
  fetchDatabyCategory("women's clothing");
});
// when electronics option selected
electronicsOption.addEventListener("click", function () {
  fetchDatabyCategory("electronics");
});
// when jewwellery option selected
jewelleryOption.addEventListener("click", function () {
  fetchDatabyCategory("jewelery");
});

// To render Data from API based on the option selected
function render(data) {
  data.forEach((element, index) => {
    // Creating div container
    const ProductDiv = document.createElement("div");
    ProductDiv.classList.add("product-div-class");
    // Creating image element
    const productImage = document.createElement("img");
    productImage.src = element.image;
    productImage.alt = element.title + "image";
    productImage.classList.add("product-image");
    // Creating product title element
    const productTitle = document.createElement("p");
    productTitle.textContent = element.title;
    productTitle.classList.add("title-class");
    // Creating product pric element
    const productPrice = document.createElement("p");
    productPrice.classList.add("product-price");
    productPrice.textContent = `$${element.price}`;
    // Creating product review div
    const productReviewDiv = document.createElement("div");
    productReviewDiv.classList.add("review");
    // Creating product rate element
    const productRate = document.createElement("p");
    productRate.id = "product-rate";
    productRate.textContent = element.rating.rate + " ★";
    // Creating product rating count element
    const productRatingCount = document.createElement("p");
    productRatingCount.textContent = `(${element.rating.count})`;
    // Appending elements to div
    productReviewDiv.append(productRate, productRatingCount);
    ProductDiv.append(
      productImage,
      productTitle,
      productPrice,
      productReviewDiv
    );
    // appending div to productlist
    productsList.append(ProductDiv);
  });
}

// To remove existing data when we are selecting other options
function clearProductsList() {
  while (productsList.firstChild) {
    productsList.removeChild(productsList.firstChild);
  }
}
