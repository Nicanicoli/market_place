let productsGrid = document.getElementById('products-grid')
let productsArray = []
let xhr = new XMLHttpRequest()
let url = 'https://my-json-server.typicode.com/Nicanicoli/market_place'

xhr.open('GET',url+'/products')
xhr.responseType = 'json'
xhr.onload = function(){
    let products = xhr.response;
    productsGrid.innerHTML = null;
    products.forEach(p => {
        productsArray.push(p)
        let pElem = document.createElement('div')
        pElem.classList.add('product')
        pElem.innerHTML= `
        <h2 class"product-name">${p.name}</h2>
        <img src="${p.photo_url}" class= "product-photo"
        <p class="product-price">Price: ${p.price}lei</p>
        <p class="product-description" > Description: ${p.description}</p>
        <button class="buy" onclick='addProductToCart(${p.id})'>Buy</button>
        `
        productsGrid.append(pElem)
    });
}
xhr.send()
let cartProd = document.getElementById('cart-products')
let cart = []
if(localStorage.getItem('cart')){
    cart = JSON.parse(localStorage.getItem('cart'))
    drawCartProducts()
}
function addProductToCart(id){
    let product = productsArray.find(function(p){
        return p.id == id
    })
    cart.push(product)
    drawCartProducts()
    localStorage.setItem("cart",JSON.stringify(cart))
}
function drawCartProducts(){
    if(cart.length === 0)return cartProd.innerHTML = 'cart is empty'
    cartProd.innerHTML = null 
    let sum = 0
    cart.forEach(function(p){
        cartProd.innerHTML +=`
        <p><img src="${p.photo_url}">${p.name} | <b>${p.price} lei</b></p>
        <hr>
        `
           sum += p.price
    })
 
        cartProd.innerHTML +=`
        <p class="total">Total price = ${sum} lei</p>
        <button id="buy" onclick = "BuyAll()">Buy all</button>
        `
}
function openCart(){
    cartProd.classList.toggle('hide')
}
let modal = document.getElementById("myModal")
let span = document.getElementsByClassName('close')[0]
let orderBlock = document.getElementById('order-block')
span.onclick = function(){
    modal.style.display = "none"
}
function BuyAll(){
    modal.style.display = "block"
orderBlock.innerHTML = null
cart.forEach(function(p){
    orderBlock.innerHTML +=`
    <div class="item">
    <img src="${p.photo_url}">
    <h3>${p.name} | ${p.price} lei</h3>
    </div>
    `
})
    //cart =[]
    //cartProd.innerHTML = "Money was withdrawn from your credit card"

}
let orderForm = document.getElementById("order-form")


orderForm.addEventListener("submit", function(event){
    event.preventDefault()
    let xhr = new XMLHttpRequest();
    let data = JSON.stringify({
        "name":event.target['name'].value,
        "address":event.target['address'].value,
        "phone":event.target['phone'].value,
        "post_number":event.target['post_number'].value,
        "status":"new",
        "products":localStorage.getItem('cart')
    })
    xhr.open("POST", "https://marketplace-d443.restdb.io/rest/orders");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "6942d7f00936554b544084e8");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
    modal.style.display = 'none'

    cart =[]
    cartProd.innerHTML = "Money was withdrawn from your credit card"
    localStorage.setItem("cart","[]")

})
