import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPendingGoals } from "../http/getPendingGoals";
import { completeGoal } from "../http/completeGoal";

export function PendingGoals() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["pending-goals"],
    queryFn: getPendingGoals,
  });

  if (!data) return null;

  async function handleCompleteGoal(goalId: string) {
    await completeGoal(goalId);
    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
    queryClient.invalidateQueries({ queryKey: ["summary"] });
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map((goal) => (
        <OutlineButton
          key={goal.id}
          disabled={goal.completionsCount >= goal.desiredWeeklyFrequency}
          onClick={() => handleCompleteGoal(goal.id)}
        >
          <Plus className="size-4 text-zinc-600" />
          {goal.title}
        </OutlineButton>
      ))}
    </div>
  );
}
