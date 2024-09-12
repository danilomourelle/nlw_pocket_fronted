import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { useQuery } from "@tanstack/react-query";
import { getPendingGoals } from "../http/getPendingGoals";

export function PendingGoals() {
  const { data } = useQuery({
    queryKey: ["pending-goals"],
    queryFn: getPendingGoals,
  });

  if (!data) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {data.map((goal) => (
        <OutlineButton
          key={goal.id}
          disabled={goal.completionsCount >= goal.desiredWeeklyFrequency}
        >
          <Plus className="size-4 text-zinc-600" />
          {goal.title}
        </OutlineButton>
      ))}
    </div>
  );
}
