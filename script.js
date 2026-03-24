
const products = document.querySelector(".products");
const list = document.querySelector(".products-list");
const select = document.querySelector("#categoryFilter")
const stock = document.querySelector("#stockOnly")
const sort = document.querySelector("#sortPrice")
const range = document.querySelector("#priceRange")
const price = document.querySelector("#priceValue")
async function getLocalProducts() {
  try {
    const getProducts = await fetch("/data/products.json");
    const data = await getProducts.json();
    return data;
  } catch (error) {
    return [];
  }
}
function renderProducts(arr) {
  list.innerHTML = arr
    .map((el) => {
      return `
        <li class="products-list-item">
        <img src="${el.image}" alt="Фото">
        <h3>${el.name}</h3>
        <p>${el.category}</p>
        <p>${el.brand}</p>
        <p>${el.price}</p>
         <p>${el.discount}</p>
          <p>${el.rating}</p>
           <p>${el.inStock}</p>
            <p>${el.description}</p>
            <button>Buy</button>
            
        </li>
        `;
    })
    .join("");
}
function renderCategory(arr) {
const categoryProducts = arr.map(el => el.category)
const unicCategory = [...new Set (categoryProducts)]
unicCategory.forEach(el => {
    const option = document.createElement("option")
    option.textContent = el
    option.value = el
    select.appendChild(option)
})
}

function filterCategory(arr) {
    const optionValue = select.value
    const filter = arr.filter(el => el.category === optionValue || optionValue === "all" ) 
    return filter
}

function filterStock(arr) {
    const checkBox = stock.checked
    if (checkBox === true) {
       return arr.filter(el => el.inStock === true)
    }else {
        return arr
    }
}

function sortingPrice(arr) {
    const value = sort.value
    if (value === "high") {
        return arr.sort((a, b)=> b.price - a.price)
    } else if (value === "low"){
        return arr.sort((a, b)=> a.price - b.price)
    }else{
        return arr
    }
}
function filterPriceProducts(arr) {
    const valuePrice = range.value
    price.textContent = valuePrice
    const filterPrice = arr.filter(el => el.price < valuePrice)
    return filterPrice
}
async function init() {
    const products = await getLocalProducts()
    renderProducts(products)
    renderCategory(products)


    select.addEventListener("change", ()=> renderProducts(filterCategory(products)))
    stock.addEventListener("change", ()=> renderProducts(filterStock(products)))
    sort.addEventListener("change", ()=> renderProducts(sortingPrice(products)))
    range.addEventListener("input", ()=> renderProducts(filterPriceProducts(products)))
}

init()
