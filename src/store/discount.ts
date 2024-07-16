import create from 'zustand';

interface CustomerState {
  selectedCustomer: { name: string; phone: string; discount?: number;InvoiceId?:number;status?:string } | null;
  setSelectedCustomer: (customer: { name: string; phone: string; discount?: number;InvoiceId?:number;status?:string }) => void;
  clearCustomer: () => void;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  selectedCustomer: null,
  setSelectedCustomer: (customer) => set({ selectedCustomer: customer }),
  clearCustomer: () => set({ selectedCustomer: null }),
}));