(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function a(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(i){if(i.ep)return;i.ep=!0;const n=a(i);fetch(i.href,n)}})();const g=[{id:1,cat:"Waffle",name:"Waffle with Berries",price:6.5,imageSp:"images/image-waffle-mobile.jpg",imageTb:"images/image-waffle-tablet.jpg",imagePc:"images/image-waffle-desktop.jpg"},{id:2,cat:"Crème Brûlée",name:"Vanilla Bean Crème Brûlée",price:7,imageSp:"images/image-creme-brulee-mobile.jpg",imageTb:"images/image-creme-brulee-tablet.jpg",imagePc:"images/image-creme-brulee-desktop.jpg"},{id:3,cat:"Macaron",name:"Macaron Mix of Five",price:8,imageSp:"images/image-macaron-mobile.jpg",imageTb:"images/image-macaron-tablet.jpg",imagePc:"images/image-macaron-desktop.jpg"},{id:4,cat:"Tiramisu",name:"Classic Tiramisu",price:5.5,imageSp:"images/image-tiramisu-mobile.jpg",imageTb:"images/image-tiramisu-tablet.jpg",imagePc:"images/image-tiramisu-desktop.jpg"},{id:5,cat:"Baklava",name:"Pistachio Baklava",price:4,imageSp:"images/image-baklava-mobile.jpg",imageTb:"images/image-baklava-tablet.jpg",imagePc:"images/image-baklava-desktop.jpg"},{id:6,cat:"Pie",name:"Lemon Meringue Pie",price:5,imageSp:"images/image-meringue-mobile.jpg",imageTb:"images/image-meringue-tablet.jpg",imagePc:"images/image-meringue-desktop.jpg"},{id:7,cat:"Cake",name:"Red Velvet Cake",price:4.5,imageSp:"images/image-cake-mobile.jpg",imageTb:"images/image-cake-tablet.jpg",imagePc:"images/image-cake-desktop.jpg"},{id:8,cat:"Brownie",name:"Salted Caramel Brownie",price:4.5,imageSp:"images/image-brownie-mobile.jpg",imageTb:"images/image-brownie-tablet.jpg",imagePc:"images/image-brownie-desktop.jpg"},{id:9,cat:"Panna Cotta",name:"Vanilla Panna Cotta",price:6.5,imageSp:"images/image-panna-cotta-mobile.jpg",imageTb:"images/image-panna-cotta-tablet.jpg",imagePc:"images/image-panna-cotta-desktop.jpg"}],s=[];function u(){return s}function f(e){const t=s.find(a=>a.id===e.id);t?t.quantity+=1:s.push({...e,quantity:1})}function _(e){const t=s.find(a=>a.id===e.id);if(t.quantity===1){const a=s.findIndex(r=>r.id===e.id);a!==-1&&s.splice(a,1)}else t.quantity-=1}function y(e){return!!s.find(t=>t.id===e)}function C(e){const t=s.find(a=>a.id===e.id);return t?t.quantity:0}function h(e){const t=s.findIndex(a=>a.id===e.id);t!==-1&&s.splice(t,1)}function d(){const e=u(),t=e.reduce((n,c)=>n+c.quantity,0),a=e.reduce((n,c)=>n+c.quantity*c.price,0),r=document.getElementById("cart");r.innerHTML=`
  <h2>Your Cart (${t})</h2>
  <div class="p-cart__emptyPlaceholder">
    <img src="images/illustration-empty-cart.svg" >
    <p>Your added items will appear here</p>
  </div>
  <div>
    <ul id="cartItemsArea" class="p-cart__cartItemsArea" ></ul>
  </div>
  
  <p class="p-cart__totalPrice" style="display: none;">Order Total<span class="">$${a.toFixed(2)}</span></p>
  <p class="p-cart__deliveryInfo" style="display: none;"><span>This is a <span class="u-fw600">carbon-natural </span>delivery</span></p>
  <div id="confirmButtonArea" class="p-cart__confirmButtonArea"></div>
  `;const i=e.length===0;document.querySelector(".p-cart__emptyPlaceholder").style.display=i?"block":"none",document.querySelector(".p-cart__totalPrice").style.display=i?"none":"flex",document.querySelector(".p-cart__deliveryInfo").style.display=i?"none":"flex",document.querySelector("#confirmButtonArea").style.display=i?"none":"block",document.getElementById("confirmButtonArea").appendChild(E()),e.forEach(n=>{const c=document.createElement("li");c.className="p-cart__cartItem";const o=n.quantity*n.price;c.innerHTML=`
      <div class="p-cart__itemDetails">
        <p class="p-cart__itemName">${n.name}</p>
        <span class="p-cart__itemQuantity">${n.quantity}x</span>
        <span class="p-cart__itemPrice">@ $${n.price.toFixed(2)}</span>
        <span class="p-cart__itemTotal">$${o.toFixed(2)}</span>
      </div>
      <div class="p-cart__removeButtonArea"></div>      
    `,document.querySelector(".p-cart__removeButtonArea");const m=document.createElement("button");m.className="p-cart__removeButton",m.innerHTML=`
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 1.25C5.125 1.25 1.25 5.125 1.25 10C1.25 14.875 5.125 18.75 10 18.75C14.875 18.75 18.75 14.875 18.75 10C18.75 5.125 14.875 1.25 10 1.25ZM10 17.5C5.875 17.5 2.5 14.125 2.5 10C2.5 5.875 5.875 2.5 10 2.5C14.125 2.5 17.5 5.875 17.5 10C17.5 14.125 14.125 17.5 10 17.5Z" fill="currentColor"/>
      <path d="M13.375 14.375L10 11L6.625 14.375L5.625 13.375L9 10L5.625 6.625L6.625 5.625L10 9L13.375 5.625L14.375 6.625L11 10L14.375 13.375L13.375 14.375Z" fill="currentColor"/>
      </svg>
    `,m.addEventListener("click",()=>{h(n),d(),l(n.id)}),document.getElementById("cartItemsArea").appendChild(c),c.querySelector(".p-cart__removeButtonArea").appendChild(m)})}function E(){const e=document.createElement("button");return e.className="p-cart__confirmButton  c-buttonPrimary c-buttonPrimary--rev",e.textContent="Confirm Order",e.addEventListener("click",()=>{B(),document.getElementById("overlayElement").classList.add("is-active")}),e}function L(){const t=u().reduce((r,i)=>r+i.quantity*i.price,0),a=document.createElement("p");return a.className="p-confirmationModal__totalPrice",a.innerHTML=`Order Total: <span>$${t.toFixed(2)}</span>`,a}function I(){const e=u(),t=document.createElement("ul");return e.forEach(a=>{const r=a.quantity*a.price,i=document.createElement("li");i.className="c-modalItem",i.innerHTML=`
      <img class=c-modalItem__img src="${a.imageTb}" alt="${a.name}">
      <div class="c-modalItem__itemDetails">
        <p class="c-modalItem__itemName">${a.name}</p>
        <span class="c-modalItem__itemQuantity">${a.quantity}x</span>
        <span class="c-modalItem__itemPrice">@ $${a.price.toFixed(2)}</span>
      </div>
      
      <span class="c-modalItem__itemTotal">$${r.toFixed(2)}</span>
    `,t.appendChild(i)}),t}function P(){const e=document.createElement("button");return e.textContent="Start New Order",e.className="newOderButton c-buttonPrimary c-buttonPrimary--rev",e.addEventListener("click",()=>{location.reload()}),e}function B(){const e=document.getElementById("confirmationModal");e.style.display="block",document.body.style.position="fixed",e.innerHTML=`
    <div class="p-confirmationModal__messages">
      <h2>Order <br class="u-hiddenTb">Confirmed</h2>
      <p>We hope you enjoy your food!</p>
    </div>
    <div class="p-confirmationModal__itemsArea">
    </div>
    <div class=p-confirmationModal__newOderButtonArea></div>
  `,document.querySelector(".p-confirmationModal__itemsArea").append(I(),L()),document.querySelector(".p-confirmationModal__newOderButtonArea").appendChild(P())}function T(e){const t=document.createElement("li");t.className="c-card",t.dataset.id=`${e.id}`,t.innerHTML=`
    <div class="c-card__wrapper">
      <div class="c-card__productImage">
        <picture>
          <source media="(min-width: 1024px)" srcset="${e.imagePc}">
          <source media="(min-width: 768px)" srcset="${e.imageTb}">
          <img src="${e.imageSp}" alt="${e.name}">
        </picture>
      </div>
      <div class="c-card__btnArea" ></div>
    </div>
    
    <span class="c-card__productCat">${e.cat}</span>
    <h2 class="c-card__productName">${e.name}</h2>
    <span class="c-card__productPrice">$${e.price.toFixed(2)}</span>
  `;const a=t.querySelector(".c-card__btnArea");return y(e.id)?a.appendChild(v(e)):a.appendChild(b(e)),t}function b(e){const t=document.createElement("button");return t.textContent="Add to Cart",t.className="addToCartBtn c-buttonPrimary",t.addEventListener("click",()=>{f(e),l(e.id),d()}),t}function v(e){const t=document.createElement("div");t.className="quantityButton c-buttonPrimary c-buttonPrimary--rev ";const a=document.createElement("span");a.className="minusIcon",a.innerHTML='<img src="images/Subtract-Icon.svg" alt="minus icon" tabindex="0">',["mouseover","focus"].forEach(n=>{a.firstElementChild.addEventListener(n,()=>{a.firstElementChild.src="images/Subtract-Icon-hover.svg"})}),["mouseleave","blur"].forEach(n=>{a.firstElementChild.addEventListener(n,()=>{a.firstElementChild.src="images/Subtract-Icon.svg"})});const r=document.createElement("span");r.className="itemQuantity",r.textContent=C(e);const i=document.createElement("span");return i.className="plusIcon",i.innerHTML='<img src="images/Add-Icon.svg" alt="plus icon" tabindex="0">',["mouseover","focus"].forEach(n=>{i.firstElementChild.addEventListener(n,()=>{i.firstElementChild.src="images/Add-Icon-hover.svg"})}),["mouseleave","blur"].forEach(n=>{i.firstElementChild.addEventListener(n,()=>{i.firstElementChild.src="images/Add-Icon.svg"})}),["click","keydown"].forEach(n=>{t.addEventListener(n,c=>{if(n==="keydown"&&c.key!=="Enter")return;const o=document.activeElement;o.closest(".plusIcon"),o.closest(".minusIcon"),c.target.closest(".plusIcon")?(f(e),l(e.id),p(e.id,"plusIcon")):c.target.closest(".minusIcon")&&(_(e),l(e.id),p(e.id,"minusIcon")),d()})}),t.append(a,r,i),t}function l(e){const t=document.querySelector(`[data-id="${e}"]`);if(!t)return;const a=t.querySelector(".c-card__btnArea");a.innerHTML="";const r=g.find(i=>i.id===e);y(e)?(a.appendChild(v(r)),t.classList.add("js-isInCart")):(a.appendChild(b(r)),t.classList.remove("js-isInCart"))}function p(e,t){const a=document.querySelector(`[data-id="${e}"] .quantityButton`);if(!a)return;const r=a.querySelector(`.${t} img`);r&&r.focus()}d();function $(){const e=document.getElementById("product-list");e.innerHTML="",g.forEach(t=>{const a=T(t);e.appendChild(a)})}$();
