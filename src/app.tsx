import { CreateGoalDialog } from "./components/createGoalDialog";
// import { EmptyGoals } from "./components/emptyGoals";
import { Dialog } from "./components/ui/dialog";
import { WeekSummary } from "./components/weekSummary";

export function App() {
  return (
    <Dialog>
      {/* <EmptyGoals /> */}
      <WeekSummary />
      <CreateGoalDialog />
    </Dialog>
  );
}
