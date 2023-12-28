import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    listCart: [] as any,
    cartQuantity: 0
  }),

  actions: {
    setCartList (list: any) {
      this.listCart = [...list];
      this.cartQuantity = 0;
      this.listCart.forEach((item: any) => {
        this.cartQuantity += item.quantily;
      })
      if (process.browser) {
        localStorage.setItem('listCart', JSON.stringify(list));
      }
    },
    addToCart (productItem: any) {
      // In case cartItem does not exist yet
      if (!this.listCart.some((item: any) => item.slug === productItem.slug)) {
        this.listCart.push(productItem);
        productItem.quantily = 1;
        this.listCart.map((item: any) => {
          return {
            ...item,
            quantily: 1
          }
        })
      } else {
        // In case cartItem already exists
        this.listCart = this.listCart.map((item: any) => {
          if (item.slug === productItem.slug) {
            return {
              ...item,
              quantily: item.quantily + 1
            }
          }
          return item;
        })
      }
      this.setCartList(this.listCart);
    }
  }
});
