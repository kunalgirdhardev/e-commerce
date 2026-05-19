import { create } from "zustand";



export const useWishlistStore = create((set) => ({
  wishlist: [],

  addToWishlist: (item) =>
    set((state) => {
      const exists = state.wishlist.find((i) => i.id === item.id);
      if (exists) return state;

      return { wishlist: [...state.wishlist, item] };
    }),

  removeFromWishlist: (id) =>
    set((state) => ({
      wishlist: state.wishlist.filter((item) => item.id !== id),
    })),
}));



export const useSearchStore = create((set) => ({
  searchTerm: "",

  setSearchTerm: (term) => set({ searchTerm: term }),

  clearSearch: () => set({ searchTerm: "" }),
}));



export const useCartStore = create((set) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);

      if (existing) {
        if (existing.qty >= product.quantity) return state; 

        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }

      return {
        cart: [...state.cart, { ...product, qty: 1 }],
      };
    }),

  increaseQty: (id) =>
    set((state) => ({
      cart: state.cart.map((item) => {
        if (item.id === id) {
          if (item.qty >= item.quantity) return item; // ❌ limit
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      }),
    })),

  decreaseQty: (id) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0),
    })),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
}));