import { useQuery } from "@tanstack/react-query";
import { Dialog } from "./components/ui/dialog";
import { getGoalsProgress } from "./http/getGoalsProgress";
import { CreateGoalDialog } from "./pages/createGoalDialog";
import { EmptyGoals } from "./pages/emptyGoals";
import { WeekSummary } from "./pages/weekSummary";

export function App() {
  const { data } = useQuery({
    queryKey: ["pending-goals"],
    queryFn: getGoalsProgress,
    staleTime: 1_000 * 60,
  });

  return (
    <Dialog>
      {data && data?.length > 0 ? <WeekSummary /> : <EmptyGoals />}
      <CreateGoalDialog />
    </Dialog>
  );
}
