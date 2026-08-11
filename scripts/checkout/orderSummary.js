import { products } from "../../data/products.js";
import {
  cart,
  addToCart,
  removeFromCart,
  updateDeliveryOption,
} from "../cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
const checkoutContainer = document.querySelector(".js-order-summary");
import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1/+esm";
import {renderPaymentSummary} from "./paymentSummary.js";
export function renderSummary() {
  let checkoutHtml = "";
  cart.forEach((cartItem) => {
    const product = products.find(
      (product) => product.id === cartItem.productId,
    );

    let deliveryOptionId = cartItem.deliveryOptionId || 1;

    let deliveryOption = deliveryOptions.find(
      (option) => option.id === deliveryOptionId,
    );

    const today = dayjs();

    const estimatedDeliveryDate = today.add(
      deliveryOption.estimatedDays,
      "day",
    );

    const formattedDate = estimatedDeliveryDate.format("dddd, MMMM D");
    checkoutHtml += `
            <div class="cart-item-container js-cart-item-container-${product.id}">
                <div class="delivery-date">
                  Delivery date: ${formattedDate}
                </div>

                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${product.image}">

                  <div class="cart-item-details">
                    <div class="product-name">
                      ${product.name}
                    </div>
                    <div class="product-price">
                      $${(product.priceCents / 100).toFixed(2)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary">
                        Update
                      </span>
                      <span class="delete-quantity-link link-primary js-deleteFromCart" data-product-id="${product.id}">
                        Delete
                      </span>
                    </div>
                  </div>

                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                  
                      ${getDeliveryOptions(product, cartItem)}
                  </div>
                </div>
              </div>
            
            `;
  });

  function getDeliveryOptions(product, cartItem) {
    let deliveryOptionsHtml = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const estimatedDeliveryDate = today.add(
        deliveryOption.estimatedDays,
        "day",
      );
      const formattedDate = estimatedDeliveryDate.format("dddd, MMMM D");
      const ischecked = deliveryOption.id == cartItem.deliveryOptionId;

      deliveryOptionsHtml += `
      <div class="delivery-option">
          <input
            type="radio"
            ${ischecked ? "checked" : ""}
            value="${deliveryOption.id}"
            class="delivery-option-input js-delivery-option-input"
            data-product-id="${product.id}"
            name="delivery-option-${product.id}"
          >
          <div>
            <div class="delivery-option-date">
              ${formattedDate}
            </div>
            <div class="delivery-option-price">
              $${(deliveryOption.priceCents / 100).toFixed(2)} - Shipping
            </div>
          </div>
      </div>
              `;
    });
    return deliveryOptionsHtml;
  }

  checkoutContainer.innerHTML = checkoutHtml;

  document.querySelectorAll(".js-delivery-option-input").forEach((input) => {
    input.addEventListener("click", () => {
      const productId = input.dataset.productId;
      const deliveryOptionId = parseInt(input.value);
      updateDeliveryOption(productId, deliveryOptionId);
      renderPaymentSummary() ;
      renderSummary();
    });
  });
  document.querySelectorAll(".js-deleteFromCart").forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      const productId = deleteButton.dataset.productId;

      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`,
      );

      container.remove();
      renderPaymentSummary() ;
    });
  });
}

