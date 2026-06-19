let cart = [];

function addToCart(name, price){

const existingItem =
cart.find(item => item.name === name);

if(existingItem){

existingItem.qty++;

}else{

cart.push({
name,
price,
qty:1
});

}

renderCart();
updateCartCount();

}

function renderCart(){

const cartContainer =
document.getElementById("cartItems");

cartContainer.innerHTML = "";

let total = 0;

cart.forEach((item,index)=>{

const itemTotal =
item.price * item.qty;

total += itemTotal;

cartContainer.innerHTML += `

<div class="cart-item">

<div class="cart-item-info">

<h4>${item.name}</h4>

<p>
₹${item.price}
</p>

</div>

<div class="qty-controls">

<button
class="qty-btn"
onclick="changeQty(${index},-1)">
---------------------------------

</button>

<span>
${item.qty}
</span>

<button
class="qty-btn"
onclick="changeQty(${index},1)">
+ </button>

</div>

<button
class="remove-btn"
onclick="removeItem(${index})">

Remove

</button>

</div>

`;

});

document.getElementById("total")
.innerText = total;

}

function updateCartCount(){

let count = 0;

cart.forEach(item=>{

count += item.qty;

});

document.getElementById("cart-count")
.innerText = count;

}

function changeQty(index,value){

cart[index].qty += value;

if(cart[index].qty <= 0){

cart.splice(index,1);

}

renderCart();
updateCartCount();

}

function removeItem(index){

cart.splice(index,1);

renderCart();
updateCartCount();

}

function openCheckout(){

if(cart.length === 0){

alert("Your cart is empty!");

return;

}

document.getElementById("checkoutModal")
.style.display = "flex";

}

window.onclick = function(event){

const modal =
document.getElementById("checkoutModal");

if(event.target === modal){

modal.style.display = "none";

}

};

function placeOrder(){

const name =
document.getElementById("customerName").value;

const phone =
document.getElementById("customerPhone").value;

const email =
document.getElementById("customerEmail").value;

const address =
document.getElementById("customerAddress").value;

const paymentMethod =
document.getElementById("paymentMethod").value;

if(
!name ||
!phone ||
!email ||
!address
){

alert("Please fill all details.");

return;

}

const orderId =
"EA" +
Math.floor(
100000 + Math.random() * 900000
);

const orderDate =
new Date().toLocaleString();

let total = 0;

let receiptItems = "";

let whatsappItems = "";

cart.forEach(item=>{

const itemTotal =
item.price * item.qty;

total += itemTotal;

receiptItems += `

<li>
${item.name}
x ${item.qty}
= ₹${itemTotal}
</li>

`;

whatsappItems +=
`${item.name} x ${item.qty} = ₹${itemTotal}\n`;

});

const paymentStatus =
paymentMethod ===
"Cash on Delivery"
?
"Pending"
:
"Awaiting Confirmation";

const deliveryTime =
"30 - 45 Minutes";

document.getElementById("receipt")
.innerHTML = `

<h2>
🎉 Order Successfully Placed
</h2>

<hr>

<p>
<strong>Restaurant:</strong>
Ember & Ash
</p>

<p>
<strong>Order ID:</strong>
${orderId}
</p>

<p>
<strong>Date:</strong>
${orderDate}
</p>

<br>

<p>
<strong>Name:</strong>
${name}
</p>

<p>
<strong>Phone:</strong>
${phone}
</p>

<p>
<strong>Email:</strong>
${email}
</p>

<p>
<strong>Address:</strong>
${address}
</p>

<br>

<h3>Items Ordered</h3>

<ul>

${receiptItems}

</ul>

<br>

<h3>
Total Amount:
₹${total}
</h3>

<p>
<strong>Payment Method:</strong>
${paymentMethod}
</p>

<p>
<strong>Payment Status:</strong>
${paymentStatus}
</p>

<p>
<strong>Estimated Delivery:</strong>
${deliveryTime}
</p>

`;

document.getElementById("receipt")
.style.display = "block";

document.getElementById("checkoutModal")
.style.display = "none";

const restaurantPhone =
"917870384845";

const whatsappMessage = `

🍽 EMBER & ASH

NEW ORDER RECEIVED

Order ID:
${orderId}

Date:
${orderDate}

---

Customer:
${name}

Phone:
${phone}

Email:
${email}

Address:
${address}

---

ORDER ITEMS

${whatsappItems}

---

Total:
₹${total}

Payment Method:
${paymentMethod}

Payment Status:
${paymentStatus}

Estimated Delivery:
${deliveryTime}

`;

const whatsappURL =
`https://wa.me/${restaurantPhone}?text=${encodeURIComponent(whatsappMessage)}`;

window.open(
whatsappURL,
"_blank"
);

cart = [];

renderCart();
updateCartCount();

document.getElementById("customerName").value = "";
document.getElementById("customerPhone").value = "";
document.getElementById("customerEmail").value = "";
document.getElementById("customerAddress").value = "";

window.scrollTo({

top:
document.body.scrollHeight,

behavior:"smooth"

});

}

renderCart();
updateCartCount();
