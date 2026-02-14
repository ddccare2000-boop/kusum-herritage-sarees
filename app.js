const categories=["Banarasi","Silk","Georgette","Bridal"];
let products=[];

for(let i=1;i<=24;i++){
products.push({
id:i,
name:categories[i%4]+" Saree "+i,
price:Math.floor(Math.random()*20000)+5000,
category:categories[i%4],
img:`https://source.unsplash.com/400x500/?saree,${i}`
});
}

let cart=JSON.parse(localStorage.getItem("cart"))||[];
let wishlist=JSON.parse(localStorage.getItem("wishlist"))||[];

/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(filter="All"){
const grid=document.getElementById("productGrid");
grid.innerHTML="";

products
.filter(p=>filter==="All"||p.category===filter)
.forEach(p=>{

grid.innerHTML+=`
<div class="product-card">

<div class="wishlist-heart ${wishlist.includes(p.id) ? 'active' : ''}"
onclick="toggleWishlistItem(${p.id})">
<i class="fas fa-heart"></i>
</div>

<img src="${p.img}">
<div class="product-info">
<h4>${p.name}</h4>
<p>₹${p.price}</p>
<button onclick="addToCart(${p.id})">Add to Cart</button>
</div>
</div>
`;
});
}

/* ================= FILTER ================= */

function filterProducts(cat){
displayProducts(cat);
}

/* ================= CART ================= */

function addToCart(id){
let item=cart.find(p=>p.id===id);
if(item){item.qty+=1}
else{
let product=products.find(p=>p.id===id);
cart.push({...product,qty:1})
}
saveCart();
}

function saveCart(){
localStorage.setItem("cart",JSON.stringify(cart));
updateCart();
}

function updateCart(){
document.getElementById("cartCount").innerText=
cart.reduce((sum,i)=>sum+i.qty,0);

let items="";
let total=0;

cart.forEach(p=>{
total+=p.price*p.qty;
items+=`
<div>
<p>${p.name}</p>
<p>₹${p.price} x ${p.qty}</p>
<button onclick="changeQty(${p.id},1)">+</button>
<button onclick="changeQty(${p.id},-1)">-</button>
<button onclick="removeItem(${p.id})">Remove</button>
</div>`;
});

document.getElementById("cartItems").innerHTML=items;
document.getElementById("cartTotal").innerText="Total: ₹"+total;
}

function changeQty(id,val){
let item=cart.find(p=>p.id===id);
item.qty+=val;
if(item.qty<=0) cart=cart.filter(p=>p.id!==id);
saveCart();
}

function removeItem(id){
cart=cart.filter(p=>p.id!==id);
saveCart();
}

function toggleCart(){
document.getElementById("cartSidebar").classList.toggle("active");
updateCart();
}

/* ================= WISHLIST ================= */

function toggleWishlistItem(id){
if(wishlist.includes(id)){
wishlist = wishlist.filter(item => item !== id);
}else{
wishlist.push(id);
}
localStorage.setItem("wishlist",JSON.stringify(wishlist));
updateWishlist();
displayProducts();
}

function toggleWishlist(){
document.getElementById("wishlistSidebar").classList.toggle("active");
updateWishlist();
}

function updateWishlist(){
let items="";
wishlist.forEach(id=>{
let p=products.find(x=>x.id===id);
if(!p) return;

items+=`
<div style="margin-bottom:15px">
<img src="${p.img}" width="60"><br>
<b>${p.name}</b><br>
₹${p.price}<br>
<button onclick="toggleWishlistItem(${p.id})">Remove</button>
</div>`;
});
document.getElementById("wishlistItems").innerHTML=items;
updateWishlistCount();
}

function updateWishlistCount(){
document.getElementById("wishlistCount").innerText = wishlist.length;
}

/* ================= WHATSAPP CHECKOUT ================= */

function checkoutWhatsApp(){
let msg="Hello, I want to order:%0A";
cart.forEach(p=>{
msg+=`${p.name} x ${p.qty} = ₹${p.price*p.qty}%0A`;
});
window.open("https://wa.me/919784620776?text="+msg);
}

/* ================= INIT ================= */

updateCart();
updateWishlist();
displayProducts();
document.addEventListener("click", function(event) {
    const wishlist = document.getElementById("wishlistSidebar");
    const wishlistIcon = document.querySelector(".wishlist-icon");

    if (
        wishlist.classList.contains("active") &&
        !wishlist.contains(event.target) &&
        !wishlistIcon.contains(event.target)
    ) {
        wishlist.classList.remove("active");
    }
});
document.addEventListener("keydown", function(e){
if(e.key === "Escape"){
document.getElementById("wishlistSidebar").classList.remove("active");
}
});
document.addEventListener("click",function(e){
if(e.target.tagName==="IMG" && e.target.closest(".product-card")){
e.target.classList.toggle("zoomed");
}
});
let startX=0;

document.addEventListener("touchstart",function(e){
startX=e.touches[0].clientX;
});

document.addEventListener("touchend",function(e){
let endX=e.changedTouches[0].clientX;
let diff=endX-startX;

let cart=document.getElementById("cartSidebar");
let wishlist=document.getElementById("wishlistSidebar");

if(wishlist.classList.contains("active") && diff>80){
wishlist.classList.remove("active");
}

if(cart.classList.contains("active") && diff<-80){
cart.classList.remove("active");
}
});
