import { create } from "zustand";
import {
  Deliverable,
  CreateProposalInput,
  ProposalStatus,
} from "@/types/proposal";

type ProposalFormState = {
  proposal_number: string;
  client_name: string;
  client_email: string;
  project_title: string;
  scope: string;
  deliverables: Deliverable[];
  timeline: string;
  payment_terms: string;
  total: number;
  status: ProposalStatus;
  notes: string;
};

type ProposalStore = {
  form: ProposalFormState;
  setField: <K extends keyof ProposalFormState>(
    field: K,
    value: ProposalFormState[K],
  ) => void;
  addDeliverable: () => void;
  updateDeliverable: (id: string, description: string) => void;
  removeDeliverable: (id: string) => void;
  getCreateInput: () => CreateProposalInput;
  reset: () => void;
};

const defaultForm: ProposalFormState = {
  proposal_number: "",
  client_name: "",
  client_email: "",
  project_title: "",
  scope: "",
  deliverables: [],
  timeline: "",
  payment_terms: "",
  total: 0,
  status: "draft",
  notes: "",
};

export const useProposalStore = create<ProposalStore>((set, get) => ({
  form: { ...defaultForm },

  setField: (field, value) =>
    set((s) => ({
      form: { ...s.form, [field]: value },
    })),

  addDeliverable: () =>
    set((s) => ({
      form: {
        ...s.form,
        deliverables: [
          ...s.form.deliverables,
          {
            id: crypto.randomUUID(),
            description: "",
          },
        ],
      },
    })),

  updateDeliverable: (id, description) =>
    set((s) => ({
      form: {
        ...s.form,
        deliverables: s.form.deliverables.map((d) =>
          d.id === id ? { ...d, description } : d,
        ),
      },
    })),

  removeDeliverable: (id) =>
    set((s) => ({
      form: {
        ...s.form,
        deliverables: s.form.deliverables.filter((d) => d.id !== id),
      },
    })),

  getCreateInput: (): CreateProposalInput => {
    const { form } = get();
    return {
      proposal_number: form.proposal_number,
      client_name: form.client_name,
      client_email: form.client_email,
      project_title: form.project_title,
      scope: form.scope,
      deliverables: form.deliverables,
      timeline: form.timeline,
      payment_terms: form.payment_terms,
      total: form.total,
      status: form.status,
      notes: form.notes,
    };
  },

  reset: () => set({ form: { ...defaultForm } }),
}));
