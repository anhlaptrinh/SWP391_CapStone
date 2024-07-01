import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image?: string | undefined;
  quantity: number;
}

interface OrderStore {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  addCartItem: (newItem: CartItem) => void;
  removeCartItem: (itemToRemove: CartItem) => void;
  clearCart: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      cartItems: [],
      setCartItems: (items: CartItem[]) => set({ cartItems: items }),
      addCartItem: (newItem: CartItem) => set((state) => {
        const existingItem = state.cartItems.find(item => item.id === newItem.id);
        const updatedCartItems = existingItem
          ? state.cartItems.map(item =>
              item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          : [...state.cartItems, { ...newItem, quantity: 1 }];
        return { cartItems: updatedCartItems };
      }),
      removeCartItem: (itemToRemove: CartItem) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.id !== itemToRemove.id)
      })),
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: 'cart-storage',
      getStorage: () => localStorage,
    }
  )
);
