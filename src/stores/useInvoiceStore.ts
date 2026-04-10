import { create } from "zustand";
import { LineItem, CreateInvoiceInput, InvoiceStatus } from "@/types/invoice";

type InvoiceFormState = {
  invoice_number: string;
  client_name: string;
  client_email: string;
  issue_date: string;
  due_date: string;
  tax_percent: number;
  notes: string;
  status: InvoiceStatus;
  line_items: LineItem[];
  subtotal: number;
  tax_amount: number;
  total: number;
};

type InvoiceStore = {
  form: InvoiceFormState;
  setField: <K extends keyof InvoiceFormState>(
    field: K,
    value: InvoiceFormState[K],
  ) => void;
  addLineItem: () => void;
  updateLineItem: (
    id: string,
    field: keyof LineItem,
    value: string | number,
  ) => void;
  removeLineItem: (id: string) => void;
  computeTotals: () => void;
  getCreateInput: () => CreateInvoiceInput;
  reset: () => void;
};

const defaultForm: InvoiceFormState = {
  invoice_number: "",
  client_name: "",
  client_email: "",
  issue_date: "",
  due_date: "",
  tax_percent: 0,
  notes: "",
  status: "draft",
  line_items: [],
  subtotal: 0,
  tax_amount: 0,
  total: 0,
};

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  form: { ...defaultForm },

  setField: (field, value) =>
    set((s) => ({
      form: { ...s.form, [field]: value },
    })),

  addLineItem: () =>
    set((s) => ({
      form: {
        ...s.form,
        line_items: [
          ...s.form.line_items,
          {
            id: crypto.randomUUID(),
            description: "",
            quantity: 1,
            rate: 0,
            amount: 0,
          },
        ],
      },
    })),

  updateLineItem: (id, field, value) => {
    set((s) => ({
      form: {
        ...s.form,
        line_items: s.form.line_items.map((item) => {
          if (item.id !== id) return item;
          const updated = { ...item, [field]: value };
          updated.amount = updated.quantity * updated.rate;
          return updated;
        }),
      },
    }));
    get().computeTotals();
  },

  removeLineItem: (id) => {
    set((s) => ({
      form: {
        ...s.form,
        line_items: s.form.line_items.filter((item) => item.id !== id),
      },
    }));
    get().computeTotals();
  },

  computeTotals: () => {
    const { form } = get();
    const subtotal = form.line_items.reduce(
      (sum, item) => sum + item.quantity * item.rate,
      0,
    );
    const tax_amount = subtotal * (form.tax_percent / 100);
    const total = subtotal + tax_amount;

    set((s) => ({
      form: { ...s.form, subtotal, tax_amount, total },
    }));
  },

  getCreateInput: (): CreateInvoiceInput => {
    const { form } = get();
    return {
      invoice_number: form.invoice_number,
      client_name: form.client_name,
      client_email: form.client_email,
      issue_date: form.issue_date,
      due_date: form.due_date,
      tax_percent: form.tax_percent,
      notes: form.notes,
      status: form.status,
      line_items: form.line_items,
      subtotal: form.subtotal,
      tax_amount: form.tax_amount,
      total: form.total,
    };
  },

  reset: () => set({ form: { ...defaultForm } }),
}));
