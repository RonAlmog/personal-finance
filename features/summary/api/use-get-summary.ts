import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { useSearchParams } from "next/navigation";
import { convertMiliunitsToAmount } from "@/lib/utils";

export const useGetSummary = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const query = useQuery({
    queryKey: ["summary", { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: {
          from,
          to,
          accountId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }

      const { data } = await response.json();
      // before delivering, change back to real $ amounts
      return {
        ...data,
        incomeAmount: convertMiliunitsToAmount(data.incomeAmount),
        expensesAmount: convertMiliunitsToAmount(data.expensesAmount),
        remainingAmount: convertMiliunitsToAmount(data.remainingAmount),
        categories: data.categories.map((category) => ({
          ...category,
          value: convertMiliunitsToAmount(category.value),
        })),
        days: data.days.map((day) => ({
          ...day,
          income: convertMiliunitsToAmount(day.income),
          expenses: convertMiliunitsToAmount(day.expenses),
        })),
      };
    },
  });

  return query;
};
