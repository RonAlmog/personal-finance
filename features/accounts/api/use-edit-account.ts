import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.accounts)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.accounts)[":id"]["$patch"]
>["json"]; // 'json' will activate the validator

export const useEditAccount = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts[":id"]["$patch"]({
        json,
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Account updated");
      // this will cause a refetch of all places with query key.
      queryClient.invalidateQueries({ queryKey: ["accounts", { id }] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      // todo: invalidate summary, trans
    },
    onError: () => {
      toast.error("Failed to edit account");
    },
  });

  return mutation;
};
