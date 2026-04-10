import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { proposalService } from "@/services/proposalService";
import { CreateProposalInput, Proposal } from "@/types/proposal";

export const proposalKeys = {
  all: ["proposals"] as const,
  detail: (id: string) => ["proposals", id] as const,
};

export const useProposals = () => {
  return useQuery({
    queryKey: proposalKeys.all,
    queryFn: proposalService.getAll,
  });
};

export const useProposal = (id: string) => {
  return useQuery({
    queryKey: proposalKeys.detail(id),
    queryFn: () => proposalService.getById(id),
    enabled: !!id,
  });
};

export const useCreateProposal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateProposalInput) => proposalService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: proposalKeys.all });
    },
  });
};

export const useUpdateProposal = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: Partial<CreateProposalInput>) =>
      proposalService.update(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: proposalKeys.all });
      queryClient.invalidateQueries({ queryKey: proposalKeys.detail(id) });
    },
  });
};

export const useUpdateProposalStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Proposal["status"] }) =>
      proposalService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: proposalKeys.all });
    },
  });
};

export const useDeleteProposal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => proposalService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: proposalKeys.all });
    },
  });
};
