// store/customer.ts
import create from 'zustand';

interface CustomerState {
  selectedCustomer: { name: string; phone: string; discount?:number } | null;
  setSelectedCustomer: (customer: { name: string; phone: string,discount?:number }) => void;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  selectedCustomer: null,
  setSelectedCustomer: (customer) => set({ selectedCustomer: customer }),
}));
