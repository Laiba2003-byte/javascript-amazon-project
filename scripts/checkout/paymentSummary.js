import { paymentSummary } from "../../data/paymentSummary.js";
import {
  cart,
  addToCart,
  removeFromCart,
  updateDeliveryOption,
} from "../cart.js";
import {deliveryOptions} from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";

export function renderPaymentSummary() 
{
 let PaymentHtml = "";

 let totalItems = 0;
 let deliveryCost = 0;
 let productsCost = 0;
 let totalCost = 0;
 cart.forEach((item) => {
  totalItems += item.quantity;

  const product = products.find((product) => {
    return product.id === item.productId;
  });

  productsCost += item.quantity * product.priceCents / 100;
});

  cart.forEach((item) => {
  const deliveryOptionId = item.deliveryOptionId || 1;

  const deliveryOption = deliveryOptions.find((option) => {
    return option.id === deliveryOptionId;
  });

  deliveryCost += deliveryOption.priceCents / 100;
});

  console.log("total items:", totalItems);
  console.log("delivery cost:", deliveryCost);
 PaymentHtml+= `
    <div class="payment-summary">
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items: (${totalItems})</div>
        <div class="payment-summary-money">$${productsCost.toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${deliveryCost.toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${(productsCost + deliveryCost).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${((productsCost + deliveryCost) * 0.1).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${(productsCost + deliveryCost + (productsCost + deliveryCost) * 0.1).toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
    </div>
    `
      document.querySelector(".js-payment-summary").innerHTML = PaymentHtml;

}

renderPaymentSummary() ;

