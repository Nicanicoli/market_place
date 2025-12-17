let orders = document.getElementById('orders');
let xhr = new XMLHttpRequest();

xhr.open("GET", "https://marketplace-d443.restdb.io/rest/orders");
xhr.responseType = 'json';
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "6942d7f00936554b544084e8");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.onload = function(){
    xhr.response.forEach(function(order){
        let orderElement = document.createElement('div');
        orderElement.classList.add("product");
        orderElement.innerHTML += `
        <h2>Order = ${order._id}</h2>
        <p><b>Status: </b><span>${order.status}</span></p>
        <p><b>Customer Name: </b>${order.name}</p>
        <p><b>Address: </b>${order.address}</p>
        <p><b>Phone number: <b>${order.phone}</p>
        <p><b>Post office number: <b>${order.post_number}</p>

        `;
        let sum = 0;
        order.products.forEach(function(p){
            orderElement.innerHTML +=`
            <p><img src="${p.photo_url}" height="50px"> ${p.name} | ${p.price} lei</p>

            `;
            sum += +p.price;
        });
        orderElement.innerHTML +=`
        <h3>Total price: ${sum} lei</h3>
        <button onclick="completed('${order._id}')">Make a completed</button>`
        orders.append(orderElement);
    })
}
xhr.send();
function completed(id){
    let data = JSON.stringify({
        "status":"completed"
    })
    let xhr = new XMLHttpRequest()
    xhr.withCredentials = false; 
    xhr.onload = function(){
        if(xhr.status == 200){
            location.reload()
        }else{
            alert("Server error!")
        }
    }
    xhr.open("PUT", "https://marketplace-d443.restdb.io/rest/orders/"+id);
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "6942d7f00936554b544084e8");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);
}