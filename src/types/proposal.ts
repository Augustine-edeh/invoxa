export type Deliverable = {
  id: string;
  description: string;
};

export type ProposalStatus = "draft" | "sent" | "accepted" | "declined";

export type Proposal = {
  id: string;
  user_id: string;
  proposal_number: string;
  client_name: string;
  client_email: string;
  project_title: string;
  scope?: string;
  deliverables: Deliverable[];
  timeline?: string;
  payment_terms?: string;
  total: number;
  status: ProposalStatus;
  notes?: string;
  created_at: string;
};

export type CreateProposalInput = Omit<
  Proposal,
  "id" | "user_id" | "created_at"
>;
