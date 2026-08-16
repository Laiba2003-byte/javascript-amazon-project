import { paymentSummary } from "../data/paymentSummary.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((item) => {
    if (item.productId === productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: 1
    });
  }


  saveToStorage();
}

export function removeFromCart(productId) {
  cart = cart.filter((item) => item.productId !== productId);

  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((item) => {
    if (item.productId === productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.deliveryOptionId = deliveryOptionId;
  }

  saveToStorage();
}

export function loadCart(fun)
{
  const xhr= new XMLHttpRequest();
  xhr.addEventListener('load', ()=>
  {
    console.log(xhr.response);
    fun();
  })
  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();

}