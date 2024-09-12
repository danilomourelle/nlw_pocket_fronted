import { useQuery } from "@tanstack/react-query";
import { Dialog } from "./components/ui/dialog";
import { getSummaryRequest } from "./http/getSummaryRequest";
import { CreateGoalDialog } from "./pages/createGoalDialog";
import { EmptyGoals } from "./pages/emptyGoals";
import { WeekSummary } from "./pages/weekSummary";

export function App() {
  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummaryRequest,
    staleTime: 1_000 * 60,
  });

  return (
    <Dialog>
      {data && data?.total > 0 ? <WeekSummary /> : <EmptyGoals />}
      <CreateGoalDialog />
    </Dialog>
  );
}
