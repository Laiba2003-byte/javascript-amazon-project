import { renderSummary } from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
import { loadCart } from './cart.js';
import { loadProductsFetch } from '../data/products.js';

new Promise.all([

loadProductsFetch(),
 new Promise((resolve)=>
  {
    loadCart(()=>
    {
      resolve();
    })
  })

]).then (()=>
{
  renderSummary();
  renderPaymentSummary();
})


// newPromise((resolve)=>
// {
//   loadProducts(()=>
//   {
//       resolve();

//   });
// }).then(()=>
// {
//   return new Promise((resolve)=>
//   {
//     loadCart(()=>
//     {
//       resolve();
//     })
//   })
// }).then (()=>
// {
//   renderSummary();
//   renderPaymentSummary();
// })

// without prmosie too much nesting
// loadProducts(  ()=>
// {
//   loadCart(()=>
//   {
//     renderSummary();
//     renderPaymentSummary();
//   })
// })
