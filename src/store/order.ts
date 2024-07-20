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
  updateCartItemQuantity: (id: number, quantity: number) => void;
  updateCartItemPrice: (id: number, price: number) => void; // Thêm hàm để cập nhật giá nếu cần
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
              item.id === newItem.id 
                ? { ...item, quantity: item.quantity + newItem.quantity,price:item.price+newItem.price} 
                : item
            )
          : [...state.cartItems, { ...newItem }];
        return { cartItems: updatedCartItems };
      }),
      updateCartItemQuantity: (id: number, quantity: number) => set((state) => ({
        cartItems: state.cartItems.map(item =>
          item.id === id ? { ...item, quantity: quantity } : item
        )
      })),
      updateCartItemPrice: (id: number, price: number) => set((state) => ({
        cartItems: state.cartItems.map(item =>
          item.id === id ? { ...item, price: price } : item
        )
      })),
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
