import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OrderDetail } from '#/invoice';

interface CartItem {
  customerName: string;
  userName: string;
  warranty: string;
  orderDetails: OrderDetail[];
}

interface OrderStore {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  addCartItem: (newItem: OrderDetail) => void;
  removeCartItem: (itemToRemove: CartItem) => void;
  removeCartDetail: (detailToRemove: OrderDetail) => void;
  clearCart: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      cartItems: [],
      setCartItems: (items: CartItem[]) => set({ cartItems: items }),
      addCartItem: (orderDetail: OrderDetail) => set((state) => {
        const updatedCartItems = [...state.cartItems];
        if (updatedCartItems.length > 0) {
          updatedCartItems[0].orderDetails.push(orderDetail);
        } else {
          updatedCartItems.push({
            customerName: "okla",
            userName: "someUser", // Update with actual user data
            warranty: "this is warranty",
            orderDetails: [orderDetail],
          });
        }
        return { cartItems: updatedCartItems };
      }),
      removeCartItem: (itemToRemove: CartItem) => set((state) => ({
        cartItems: state.cartItems.filter(item => item !== itemToRemove)
      })),
      removeCartDetail: (detailToRemove: OrderDetail) => set((state) => ({
        cartItems: state.cartItems.map(item => ({
          ...item,
          orderDetails: item.orderDetails.filter(detail => detail !== detailToRemove)
        }))
      })),
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: 'cart-storage', // name of the item in the storage
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);
