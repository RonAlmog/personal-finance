import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.categories)[":id"]["$delete"]
>;

export const useDeleteCategory = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      const response = await client.api.categories[":id"]["$delete"]({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Category deleted");
      // this will cause a refetch of all places with query key.
      queryClient.invalidateQueries({ queryKey: ["categories", { id }] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      // todo: invalidate summary, trans
    },
    onError: () => {
      toast.error("Failed to delete category");
    },
  });

  return mutation;
};
