import { useQuery } from "@tanstack/react-query";
import { CreateGoalDialog } from "./components/createGoalDialog";
import { EmptyGoals } from "./components/emptyGoals";
import { Dialog } from "./components/ui/dialog";
import { WeekSummary } from "./components/weekSummary";
import { getSummaryRequest } from "./http/getSummaryRequest";


export function App() {
  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummaryRequest,
    staleTime: 1_000 * 60
  });

  return (
    <Dialog>
      {data && data?.total > 17 ? <WeekSummary /> : <EmptyGoals />}
      <CreateGoalDialog />
    </Dialog>
  );
}
