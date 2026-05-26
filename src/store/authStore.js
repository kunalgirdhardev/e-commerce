import { create } from "zustand";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getUserProfile, ROLES } from "../services/authService";

export const useAuthStore = create((set, get) => ({
  user: null,
  profile: null,
  role: null,
  loading: true,
  initialized: false,

  setAuth: (user, profile) =>
    set({
      user,
      profile,
      role: profile?.role ?? (user ? ROLES.USER : null),
      loading: false,
      initialized: true,
    }),

  clearAuth: () =>
    set({
      user: null,
      profile: null,
      role: null,
      loading: false,
      initialized: true,
    }),

  initAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        get().clearAuth();
        return;
      }

      set({ loading: true });
      try {
        const profile = await getUserProfile(firebaseUser.uid);
        get().setAuth(firebaseUser, profile);
      } catch {
        get().setAuth(firebaseUser, {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || "",
          role: ROLES.USER,
        });
      }
    });

    return unsubscribe;
  },

  isSuperAdmin: () => get().role === ROLES.SUPERADMIN,
  isAuthenticated: () => Boolean(get().user),
}));
