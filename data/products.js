
import { formatCurrency } from "../scripts/utils/money.js"
export let products = [];
class Product {
    id
    image
    name
    rating
    priceCents

    constructor(productData) {
        this.id = productData.id;
        this.image = productData.image;
        this.name = productData.name;
        this.rating = productData.rating;
        this.priceCents = productData.priceCents;
    }
    getstarsUrl()
    {
      return  `images/ratings/rating-${this.rating.stars * 10}.png`
    }
    getPrice()
    {
      return `$${formatCurrency(this.priceCents)}`;    
    }
    extraInfoHTML()
    {
      return '';
    }
}

class Clothing extends Product{


    constructor(productData) {
       super(productData)
        this.sizeChartLink = productData.sizeChartLink;
    }
   extraInfoHTML() 
   {
      return `
        <a href="${this.sizeChartLink}" target="_blank">
          Size Chart
        </a>
      `;
    }
}
export function loadProducts(fun)
{
  const xhr= new XMLHttpRequest();
  xhr.addEventListener('load', ()=>
  {
    products = JSON.parse(xhr.response).map( (productDetails)=>
    {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      }

      return new Product(productDetails);
    });
    fun();
  })
  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();

}
