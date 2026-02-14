const products=[
{
id:1,
name:"Pure Banarasi Zari Dola Lehenga",
price:1500,
category:"Bridal",
description:"Heavy Meena Banarasi | Waist 44 | Length 42 | Dupatta 2.5m | Cotton Lining | 5 Inch Bukram | Weight 1kg",
images:[
"images/lehnga1.jpg",
"images/lehnga2.jpg",
"images/lehnga3.jpg",
"images/lehnga4.jpg",
"images/lehnga5.jpg",
"images/lehnga6.jpg",
"images/lehnga7.jpg"
]
}
];

let cart=JSON.parse(localStorage.getItem("cart"))||[];
let wishlist=JSON.parse(localStorage.getItem("wishlist"))||[];

function displayProducts(){
const grid=document.getElementById("productGrid");
grid.innerHTML="";

products.forEach(p=>{

let slides=p.images.map((img,i)=>
`<img src="${img}" class="${i===0?'active':''}">`
).join("");

grid.innerHTML+=`
<div class="product-card">

<div class="slider" id="slider-${p.id}">
${slides}
<button class="prev" onclick="prevSlide(${p.id})">&#10094;</button>
<button class="next" onclick="nextSlide(${p.id})">&#10095;</button>
</div>

<div class="product-info">
<h4>${p.name}</h4>
<p>₹${p.price}</p>
<p>${p.description}</p>
<button onclick="addToCart(${p.id})">Add to Cart</button>
</div>

</div>
`;
});
}

/* SLIDER */
function nextSlide(id){
const slider=document.querySelectorAll(`#slider-${id} img`);
let active=[...slider].findIndex(img=>img.classList.contains("active"));
slider[active].classList.remove("active");
slider[(active+1)%slider.length].classList.add("active");
}

function prevSlide(id){
const slider=document.querySelectorAll(`#slider-${id} img`);
let active=[...slider].findIndex(img=>img.classList.contains("active"));
slider[active].classList.remove("active");
slider[(active-1+slider.length)%slider.length].classList.add("active");
}

/* CART */
function addToCart(id){
let item=cart.find(p=>p.id===id);
if(item){item.qty+=1}
else{
let product=products.find(p=>p.id===id);
cart.push({...product,qty:1});
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
}

function toggleCart(){
document.getElementById("cartSidebar").classList.toggle("active");
}

/* INIT */
displayProducts();
updateCart();
