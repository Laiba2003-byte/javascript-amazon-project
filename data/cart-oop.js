export function createCart() {
  return {
    cartItems: JSON.parse(localStorage.getItem("cart-oop")) || [],

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
    },

    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter((item) => {
        return item.productId !== productId;
      });

      this.saveToStorage();
    },

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
    },

    getCartQuantity() {
      let cartQuantity = 0;

      this.cartItems.forEach((item) => {
        cartQuantity += item.quantity;
      });

      return cartQuantity;
    },

    saveToStorage() {
      localStorage.setItem("cart-oop", JSON.stringify(this.cartItems));
    }
  };
}

export const cart = createCart();
export const cartbusiness = createCart();
