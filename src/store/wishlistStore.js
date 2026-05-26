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
