class Cart {

  cartItems=undefined;
  #localStorageKey= undefined

  constructor(localStorageKey) {
    this.cartItems = [];
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

   #loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    }

    addToCart(productId) {
      let matchingItem;

      this.cartItems.forEach((item) => {
        if (item.productId === productId) {
          matchingItem = item;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: 1
        });
      }

      this.saveToStorage();
    }

    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter((item) => {
        return item.productId !== productId;
      });

      this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;

      this.cartItems.forEach((item) => {
        if (item.productId === productId) {
          matchingItem = item;
        }
      });

      if (matchingItem) {
        matchingItem.deliveryOptionId = deliveryOptionId;
      }

      this.saveToStorage();
    }

    getCartQuantity() {
      let cartQuantity = 0;

      this.cartItems.forEach((item) => {
        cartQuantity += item.quantity;
      });

      return cartQuantity;
    }

    saveToStorage() {
      localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }
}



const cart= new Cart ('cart-oop') ;
const cartBusiness= new Cart ('cart-business') ;


export { cart, cartBusiness };