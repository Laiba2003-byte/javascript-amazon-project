import { cart } from "../cart.js";
import {deliveryOptions} from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() 
{
 let PaymentHtml = "";

 let totalItems = 0;
 let deliveryCostCents = 0;
 let productsCostCents = 0;
 cart.forEach((item) => {
  totalItems += item.quantity;

  const product = products.find((product) => {
    return product.id === item.productId;
  });

  productsCostCents += item.quantity * product.priceCents;
});

  cart.forEach((item) => {
  const deliveryOptionId = item.deliveryOptionId || 1;

  const deliveryOption = deliveryOptions.find((option) => {
    return option.id === deliveryOptionId;
  });

  deliveryCostCents += deliveryOption.priceCents;
});

  const totalBeforeTaxCents = productsCostCents + deliveryCostCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  console.log("total items:", totalItems);
  console.log("delivery cost:", deliveryCostCents);
 PaymentHtml+= `
    <div class="payment-summary">
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items: (${totalItems})</div>
        <div class="payment-summary-money">$${formatCurrency(productsCostCents)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(deliveryCostCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
    </div>
    `
      document.querySelector(".js-payment-summary").innerHTML = PaymentHtml;

}

